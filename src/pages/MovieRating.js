import React from 'react'
import { Grid, Cell, colors } from '@fs/zion-ui'
import { SocialStar } from '@fs/zion-icon/dist/cjs/icons'
import { css } from '@emotion/core'

const ratingCss = css`
  position: absolute;
  bottom: 10px;
  margin-right: 10px;
  line-height: 100%;
  color: ${colors.billboard.blue40};
  font-weight: bolder;
  border-radius: 5px;
  background-image: linear-gradient(to bottom right, ${colors.billboard.red10}, white);
`

export default function MovieRating({ voteAverage }) {
  return (
    <div css={ratingCss}>
      <Grid columns={7} density="tight">
        <Cell columns={1} verticalAlign="middle">
          <SocialStar color={colors.billboard.yellow00} size="sm" />
        </Cell>
        <Cell columns={4}>
          <p css={{ fontSize: 'medium' }}>Average user rating:</p>
        </Cell>
        <Cell columns={2} verticalAlign="middle">
          <p style={{ fontSize: 'small' }}>{voteAverage * 10}%</p>
        </Cell>
      </Grid>
    </div>
  )
}
