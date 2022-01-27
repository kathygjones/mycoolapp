import { useEffect, useReducer } from 'react'
import { useAxios } from '@fs/zion-axios'

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

export default function useFavoriteMovie(movieName) {
  const [state, dispatch] = useReducer(favoriteMovieReducer, {
    movieData: null,
    status: 'loading',
    loadingError: null,
  })

  const { movieData, status, loadingError } = state
  const api_key = process.env.REACT_APP_MOVIE_API_KEY

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
