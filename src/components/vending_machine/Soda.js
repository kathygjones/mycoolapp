import React, { useState } from 'react'
import { css } from '@emotion/core'
import { Redirect } from '@fs/zion-router'
import { FlowGrid, LayoutBand, Card, Button, Separator } from '@fs/zion-ui'
import ColaCan from './assets/sodas/cola.svg'
import LemonLime from './assets/sodas/lemon-lime-soda.svg'
import CreamSoda from './assets/sodas/cream-soda.svg'
import RootBeer from './assets/sodas/root-beer.svg'
import OrangeSoda from './assets/sodas/orange-soda.svg'
import GrapeSoda from './assets/sodas/grape-soda.svg'

const buttonCss = css`
  display: flex;
  justify-content: center;
`
const sodas = [
  {
    imageSource: ColaCan,
    title: 'Cola',
  },
  {
    imageSource: LemonLime,
    title: 'Lemon Lime',
  },
  {
    imageSource: CreamSoda,
    title: 'Cream Soda',
  },
  {
    imageSource: RootBeer,
    title: 'Root Beer',
  },
  {
    imageSource: OrangeSoda,
    title: 'Orange Soda',
  },
  {
    imageSource: GrapeSoda,
    title: 'Grape Soda',
  },
]
export default function Soda() {
  const [vended, setVended] = useState(false)

  const handleClick = () => setVended(true)

  if (vended) {
    return <Redirect to="/profile/vending-machine" />
  }
  return (
    <LayoutBand>
      <FlowGrid columnCount={4}>
        {sodas.map((soda) => {
          return (
            <Card key={soda.title}>
              <Separator size="sm" />
              <img src={soda.imageSource} style={{ height: '200px' }} alt={`${soda.title} Can`} />
              <Separator size="xs" />
              <div css={buttonCss}>
                <Button emphasis="high" onClick={handleClick}>
                  {soda.title}
                </Button>
              </div>
            </Card>
          )
        })}
      </FlowGrid>
    </LayoutBand>
  )
}
