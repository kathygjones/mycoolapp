import { useReducer, useCallback } from 'react'
import axios from '@fs/zion-axios'

export function jokesLoadingReducer(state, action) {
  switch (action.type) {
    case 'loading':
      return {
        loading: true,
        currentJokes: state.currentJokes,
        error: action.error,
      }
    case 'loaded':
      return {
        loading: false,
        currentJokes: action.currentJokes,
        error: null,
      }
    case 'error':
      return {
        loading: false,
        currentJokes: state.currentJokes,
        error: action.error,
      }
    default:
      throw new Error(`No match for action type ${action && action.type}`)
  }
}

function newJokesReducer(state, action) {
  switch (action.type) {
    case 'complete':
      return {
        newJokes: action.newJokes,
        error: null,
      }
    case 'error':
      return {
        newJokes: [],
        error: action.message,
      }
    default:
      throw new Error(`No match for action type ${action && action.type}`)
  }
}

export default function useHandleGetTenJokes(currentJokes = null) {
  const [state, dispatch] = useReducer(newJokesReducer, {
    newJokes: [],
    error: null,
  })
  const { newJokes, error } = state

  const handleGetTenJokes = useCallback(() => {
    while (newJokes.length < 10) {
      if (error) break
      axios
        .get('https://icanhazdadjoke.com/', {
          headers: {
            Accept: 'application/json',
          },
        })
        .then((response) => {
          if (!currentJokes.find((joke) => joke.id === response.data.id)) {
            newJokes.push({ ...response.data, numVotes: 0 })
          }
        })
        .catch((err) => {
          dispatch({ type: 'error', message: err.message })
        })
    }
    if (!error) {
      dispatch({ type: 'complete', newJokes })
    }
    return [newJokes, error]
  }, [currentJokes, error, newJokes])
  return handleGetTenJokes
}
