import React from 'react'
import { css } from '@emotion/core'

const votingAreaCss = css`
  display: flex;
  justify-content: space-evenly;
  &* {
    padding: 5px;
  }
`

export default function VotingArea({ onClick, id, numVotes }) {
  const handleVote = (amount) => {
    onClick(id, amount)
  }

  return (
    <div css={votingAreaCss}>
      <button type="button" onClick={() => handleVote(1)}>
        +
      </button>
      <div>{numVotes}</div>
      <button type="button" onClick={() => handleVote(-1)}>
        -
      </button>
    </div>
  )
}
