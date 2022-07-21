import React from 'react'
import { css } from '@emotion/core'

const helloCss = css`
  color: red;
`

export default function Chips() {
  return (
    <div>
      <h1 css={helloCss}>Chippies!</h1>
    </div>
  )
}
