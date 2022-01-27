import React from 'react'
import { css } from '@emotion/core'
import { Card, Grid, Cell, Bleed, colors } from '@fs/zion-ui'
import MovieRating from './MovieRating'
import useFavoriteMovie from './favoriteMovieHooks'
import MovieLoadingSkeleton from './MovieLoadingSkeleton'

const cardCss = css`
  width: 400px;
  border-radius: 5px;
  margin-right: auto;
  margin-left: auto;
`

const imageCss = css`
  width: 100%;
  height: 'auto';
  padding: 0px;
  margin: 0px;
`

const overviewCss = css`
  font-size: small;
  margin: 5px 0px;
  padding: 0px;
  line-height: 100%;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 7;
  -webkit-box-orient: vertical;
`

const titleCss = css`
  padding-top: 10px;
  font-size: large;
  font-weight: bolder;
  color: ${colors.billboard.blue30};
`
function FavoriteMovieCard({ data }) {
  const { id, overview, poster_path, title, vote_average } = data
  const imageUrl = `https://image.tmdb.org/t/p/original/${poster_path}`
  const movieUrl = `https://themoviedb.org/movie/${id}-${title.split(' ').join('-')}`

  return (
    <div css={cardCss}>
      <Card billboard to={movieUrl} external>
        <Bleed left bottom>
          <Grid>
            <Cell columns={5}>
              <img src={imageUrl} alt="Movie poster" css={imageCss} />
            </Cell>
            <Cell columns={7}>
              <Bleed left>
                <h1 css={titleCss}>{title}</h1>
                <p css={overviewCss}>{overview}</p>
                <MovieRating voteAverage={vote_average} />
              </Bleed>
            </Cell>
          </Grid>
        </Bleed>
      </Card>
    </div>
  )
}

export default function FavoriteMovie({ name }) {
  const [movieData, status, loadingError] = useFavoriteMovie(name)

  return (
    <>
      {status === 'loading' && <MovieLoadingSkeleton />}
      {status === 'error' && <div>{loadingError.message}</div>}
      {movieData?.id && <FavoriteMovieCard data={movieData} />}
    </>
  )
}
