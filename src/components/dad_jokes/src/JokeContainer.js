import React from 'react'
import { css } from '@emotion/core'
import VotingArea from './VotingArea'

const jokeContainerCss = css`
  height: 75px;
  margin: 5px 5px;
  padding: 0px 10px;
  background: white;
  border-radius: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0px 0px 10px 5px green inset;
`

const jokeTextCss = css`
  width: 600px;
  padding-right: 10px;
  text-align: left;
  font-size: small;
  font-weight: bold;
`

const jokeEmojiCss = css`
  padding: 10px;
  font-size: 50px;
  text-shadow: 3px 3px 5px #888;
`

export default function JokeContainer({ id, joke, onClick, numVotes }) {
  let emoji = '😐'

  if (numVotes < -12) {
    emoji = '🤬'
  } else if (numVotes < -9) {
    emoji = '😡'
  } else if (numVotes < -6) {
    emoji = '😠'
  } else if (numVotes < -3) {
    emoji = '😩'
  } else if (numVotes < 0) {
    emoji = '🙄'
  } else if (numVotes === 0) {
    emoji = '😐'
  } else if (numVotes < 4) {
    emoji = '🙂'
  } else if (numVotes < 7) {
    emoji = '😄'
  } else if (numVotes < 10) {
    emoji = '😆'
  } else if (numVotes < 13) {
    emoji = '😂'
  } else emoji = '🤣'

  return (
    <div css={jokeContainerCss}>
      <VotingArea id={id} onClick={onClick} numVotes={numVotes} />
      <div css={jokeTextCss}>{joke}</div>
      <div css={jokeEmojiCss}>{emoji}</div>
    </div>
  )
}
