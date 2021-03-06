import { useEffect, useReducer } from 'react'
import { useAxios } from '@fs/zion-axios'

// found  method for storing API key here: https://stackoverflow.com/a/50457996
const api_key = '0dfd119204a5482b09c1cbfbadaaa7c8'

function favoriteMovieReducer(state, action) {
  switch (action.type) {
    case 'response':
      return {
        movieData: action.movieData,
        status: 'loaded',
        loadingError: null,
      }
    case 'error':
      return {
        movieData: null,
        status: 'error',
        loadingError: action.error,
      }
    default:
      throw new Error(`No match for action type ${action && action.type}`)
  }
}

function genreReducer(state, action) {
  switch (action.type) {
    case 'response':
      return {
        movieGenres: action.movieGenres,
        status: 'loaded',
        loadingError: null,
      }
    case 'error':
      return {
        movieGenres: null,
        status: 'error',
        loadingError: action.error,
      }
    default:
      throw new Error(`No match for action type ${action && action.type}`)
  }
}

export default function useFavoriteMovie(movieName) {
  const [state, dispatch] = useReducer(favoriteMovieReducer, {
    movieData: null,
    status: 'loading',
    loadingError: null,
  })

  const { movieData, status, loadingError } = state

  const formattedName = movieName.split(' ').join('+')

  const { data, error } = useAxios({
    url: `https://api.themoviedb.org/3/search/movie?api_key=${api_key}&query=${formattedName}`,
  })

  useEffect(() => {
    // regex for movies that start with "the/a(n)", but is missing from movieName input
    const titleRegex = new RegExp(`^(an?|the)?\\s*${movieName}`, 'i')

    if (data?.results) {
      const result = data.results?.find((res) => titleRegex.test(res.title))
      dispatch({ type: 'response', movieData: result })
    }
    if (error) {
      dispatch({ type: 'error', error })
    }
  }, [movieName, data, error])

  return [movieData, status, loadingError]
}

export function useGenres() {
  const [state, dispatch] = useReducer(genreReducer, {
    movieGenres: null,
    status: 'loading',
    loadingError: null,
  })

  const { movieGenres, status, loadingError } = state

  const { data, error } = useAxios({
    url: `https://api.themoviedb.org/3/genre/movie/list?api_key=${api_key}&language=en-US`,
  })

  useEffect(() => {
    if (data?.genres) {
      dispatch({ type: 'response', movieGenres: data.genres })
    }
    if (error) {
      dispatch({ type: 'error', error })
    }
  }, [data, error, movieGenres])
  return [movieGenres, status, loadingError]
}
