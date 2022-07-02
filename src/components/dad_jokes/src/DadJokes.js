import React from 'react'
import PropTypes from 'prop-types'
import { css } from '@emotion/core'
import JokesLoader from './JokesLoader'

const helloCss = css`
  color: red;
`

export default function DadJokes({ name }) {
  return (
    <div>
      <h1 css={helloCss}>Hello, {name}</h1>
      <JokesLoader />
    </div>
  )
}

DadJokes.propTypes = {
  name: PropTypes.string,
}
