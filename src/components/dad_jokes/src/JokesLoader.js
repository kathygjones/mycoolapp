import React, { useCallback, useReducer } from 'react'
import { css } from '@emotion/core'
import JokeContainer from './JokeContainer'
import useHandleGetTenJokes, { jokesLoadingReducer } from './jokesListHooks'

const jokesListCss = css`
  display: flex;
  justify-content: center;
  height: 80%;
`

const headerCss = css`
  padding: 80px 50px;
  border: 10px solid green;
  background: white;
  align-self: center;
`

const buttonCss = css`
  background: green;
  color: white;
  border-radius: 5px;
  border: none;
  padding: 10px 30px;
`

const leftCss = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-image: url(laughing_emoji.png);
  background-color: purple;
  background-repeat: space;
  background-size: 50px 50px;
  width: 30%;
`

export default function JokesLoader() {
  const [state, dispatch] = useReducer(jokesLoadingReducer, {
    loading: true,
    currentJokes: window.localStorage.getItem('jokes') || [],
    error: null,
  })

  const { loading, currentJokes, error } = state
  const handleGetTenJokes = useHandleGetTenJokes(currentJokes)

  const handleClickNewJokes = useCallback(() => {
    const [newJokes, jokesError] = handleGetTenJokes()
    if (!jokesError) {
      dispatch({ type: 'loaded', currentJokes: currentJokes.concat(newJokes) })
    } else dispatch({ type: 'error', error })
  }, [currentJokes, handleGetTenJokes, error])

  const handleVoteClick = useCallback(() => {
    dispatch({ type: 'loading' })
    const sortedJokes = currentJokes.sort((a, b) => b.numVotes - a.numVotes)
    dispatch({ type: 'loaded', currentJokes: sortedJokes })
  }, [currentJokes])

  const dadJokesList = currentJokes.map((joke) => (
    <JokeContainer key={joke.id} id={joke.id} joke={joke.joke} numVotes={joke.numVotes} onClick={handleVoteClick} />
  ))

  return (
    <div css={jokesListCss}>
      <div css={leftCss}>
        <h1 css={headerCss}>Dad Jokes</h1>
        <button onClick={handleClickNewJokes} type="button" disabled={loading} css={buttonCss}>
          Load more jokes
        </button>
      </div>
      <div right>{loading ? 'Loading . . . ' : dadJokesList}</div>
    </div>
  )
}
