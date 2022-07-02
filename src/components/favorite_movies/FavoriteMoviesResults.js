import React, { useContext, useCallback, useState, useEffect, useMemo, useRef } from 'react'
import PropTypes from 'prop-types'
import { FlowGrid, Separator, TextField, Button, BillboardActionChip, colors, useAtSize } from '@fs/zion-ui'
import ContentAdd from '@fs/zion-icon/dist/cjs/icons/ContentAdd'
import { css } from '@emotion/core'
import { FavoriteMovieContext } from './FavoriteMovieProvider'
import useFavoriteMovie from './favoriteMovieHooks'
import FavoriteMovie from './FavoriteMovie'
import MovieLoadingSkeleton from './MovieLoadingSkeleton'

const billboardButtonCss = css`
  display: flex;
  justify-content: center;
  &[hidden] {
    display: none;
  }
`

const formCss = css`
  display: none;
  &[shown='true'] {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    padding-bottom: 0px;
  }
`

const headerCss = css`
  font-size: x-large;
  font-weight: bold;
  margin-bottom: 10px;
  color: ${colors.billboard.blue40};
  text-shadow: 0px 0px 2px ${colors.billboard.yellow00};
  &[nomovies='true'] {
    text-align: center;
  }
`

const movieListCss = css`
  margin-bottom: 20px;
  margin-left: auto;
  margin-right: auto;
  &[isMobile='true'] {
    text-align: center;
  }
  &[isMobile='false'] {
    width: 500px;
  }
`

export default function FavoriteMoviesResults({ movieGenres }) {
  const [showForm, setShowForm] = useState(false)
  const [movieInput, setMovieInput] = useState('')
  const [currentMovie, setCurrentMovie] = useState(null)
  const { faveMovies } = useContext(FavoriteMovieContext)
  const focusRef = useRef()

  const toggle = useCallback(() => setShowForm((val) => !val), [])

  const handleSubmit = (evt) => {
    evt.preventDefault()
    toggle()
    setCurrentMovie(movieInput)
    setMovieInput('')
  }

  const handleCancel = (e) => {
    e.preventDefault()
    toggle()
  }

  useEffect(() => {
    focusRef?.current?.focus()
  })

  return (
    <>
      {faveMovies.length === 0 && (
        <h1 css={headerCss} nomovies="true">
          No movies yet!
        </h1>
      )}
      {currentMovie && <MoviesListLoader currentMovie={currentMovie} movieGenres={movieGenres} />}
      <Separator />
      {!showForm && (
        <div css={billboardButtonCss} hidden={showForm}>
          <BillboardActionChip color="green" label="Add your favorite movie!" Icon={ContentAdd} onClick={toggle} />
        </div>
      )}
      {showForm && (
        <div css={formCss} shown={showForm.toString()}>
          <div style={{ marginBottom: '-17px' }}>
            <TextField
              clearable
              label="Movie Title"
              ref={focusRef}
              onChange={(evt) => setMovieInput(evt.target.value)}
              onClear={() => setMovieInput('')}
              value={movieInput}
              placeholder="Type in the title of your favorite movie"
            />
          </div>
          <Button emphasis="high" onClick={(event) => handleSubmit(event)}>
            Submit
          </Button>
          <Button emphasis="low" onClick={(event) => handleCancel(event)}>
            Cancel
          </Button>
        </div>
      )}
    </>
  )
}

FavoriteMoviesResults.propTypes = {
  /* Object containing id and name for each genre */
  movieGenres: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
    })
  ).isRequired,
}

function MoviesListLoader({ currentMovie, movieGenres }) {
  const { faveMovies, setFaveMovies } = useContext(FavoriteMovieContext)

  const [movieData, status, loadingError] = useFavoriteMovie(currentMovie)

  useEffect(() => {
    if (movieData?.id) {
      const { id, overview, poster_path, title, vote_average, genre_ids } = movieData
      const currentGenre = movieGenres.find((genre) => genre.id === genre_ids[0])
      const stringified = JSON.stringify({ id, overview, poster_path, title, vote_average, genre: currentGenre })
      if (!faveMovies.includes(stringified)) {
        setFaveMovies([...faveMovies, stringified])
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [movieData])

  return (
    <>
      {status === 'loading' && <MovieLoadingSkeleton />}
      {status === 'error' && <div>{loadingError.message}</div>}
      {movieData?.id && <MoviesList />}
    </>
  )
}

MoviesListLoader.propTypes = {
  /* title of movie, passed in by parent component */
  currentMovie: PropTypes.string.isRequired,
  /* movie genres object passed in by parent component */
  movieGenres: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
  }).isRequired,
}

function MoviesList() {
  const { faveMovies, shownGenres, setShownGenres } = useContext(FavoriteMovieContext)

  const atSize = useAtSize()

  const isMobile = atSize({ default: true, md: false })

  useEffect(() => {
    if (faveMovies?.length > 0) {
      faveMovies?.forEach((movie) => {
        const movieObject = JSON.parse(movie)
        const { genre } = movieObject
        if (!shownGenres.includes(genre.name)) setShownGenres([...shownGenres, genre.name])
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [faveMovies])

  const moviesList = useMemo(
    () =>
      shownGenres?.map((elem) => (
        <div key={elem} css={movieListCss} isMobile={isMobile.toString()}>
          <h1 css={headerCss}>{elem}</h1>
          <FlowGrid>
            {faveMovies
              .filter((faveMovie) => {
                const movieObject = JSON.parse(faveMovie)
                if (movieObject.genre.name === elem) {
                  return movieObject
                }
                return null
              })
              .map((movie) => (
                <FavoriteMovie key={JSON.parse(movie).id} movieString={movie} />
              ))}
          </FlowGrid>
        </div>
      )),
    [shownGenres, faveMovies, isMobile]
  )

  return <FlowGrid>{moviesList}</FlowGrid>
}
