import React from 'react'
import { css } from '@emotion/core'

const helloCss = css`
  color: red;
`

export default function Soda() {
  return (
    <div>
      <h1 css={helloCss}>Fizz. . . Buzz . . . </h1>
    </div>
  )
}
