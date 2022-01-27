import React from 'react'
import { Skeleton, Grid, Cell, Card, Bleed } from '@fs/zion-ui'
import { css } from '@emotion/core'

const divCss = css`
  width: 400px;
  height: 300px;
  border-radius: 5px;
  margin-right: auto;
  margin-left: auto;
`

const imageCss = css`
  width: 100%;
  height: 'auto';
  padding: 0px;
  margin: 0px;
`

export default function MovieLoadingSkeleton() {
  return (
    <div css={divCss}>
      <Card>
        <Bleed left bottom>
          <Grid>
            <Cell columns={5}>
              <div css={imageCss}>
                <Skeleton.Image />
              </div>
            </Cell>
            <Cell columns={7}>
              <Skeleton.HeaderBlock centered />
              <Skeleton.Body2 lines={7} centered />
              <Skeleton.Button />
            </Cell>
          </Grid>
        </Bleed>
      </Card>
    </div>
  )
}
