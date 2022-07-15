import React from 'react'
import { Grid, Cell, Skeleton, LayoutBand, Separator } from '@fs/zion-ui'

export default function UserInfoLoadingSkeleton() {
  return (
    <LayoutBand>
      <Separator size="sm" />
      <Grid>
        <Cell>
          <Skeleton.HeaderBlock size="lg" />
        </Cell>
        <Cell>
          <Grid>
            <Cell>
              <Skeleton.PersonBlock size="lg" />
            </Cell>
            <Cell>
              <Skeleton.ListItem />
              <Skeleton.ListItem />
              <Skeleton.ListItem />
            </Cell>
          </Grid>
        </Cell>
      </Grid>
    </LayoutBand>
  )
}
