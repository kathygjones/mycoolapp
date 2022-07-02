import React from 'react'
import PropTypes from 'prop-types'
import { css } from '@emotion/core'
import Background from './Background'

const helloCss = css`
  color: red;
`

export default function VendingMachine({ name }) {
  return (
    <div>
      <Background />
      <h1 css={helloCss}>Hello, {name}</h1>
    </div>
  )
}

VendingMachine.propTypes = {
  name: PropTypes.string,
}
