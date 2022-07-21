import React from 'react'
import { css } from '@emotion/core'

const helloCss = css`
  color: red;
`

export default function Candy() {
  return (
    <div>
      <h1 css={helloCss}>I want Candy!</h1>
    </div>
  )
}
