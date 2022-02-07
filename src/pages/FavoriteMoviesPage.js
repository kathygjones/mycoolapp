import React from 'react'
import { LayoutBand, Separator, useAtSize, colors, Grid, Cell } from '@fs/zion-ui'
import { ThingMovie } from '@fs/zion-icon'
import { css } from '@emotion/core'
// import { boolAttr } from '@fs/zion-frontend-friends'
import { useGenres } from './favoriteMovieHooks'
import FavoriteMovieProvider from './FavoriteMovieProvider'
import FavoriteMoviesResults from './FavoriteMoviesResults'

const sharedLayoutCss = css`
  padding: 20px;
  background-image: linear-gradient(to bottom right, ${colors.billboard.blue20}, white);
  box-shadow: inset 0px 0px 5px 5px white;
`

const desktopLayoutCss = css`
  margin: 0px 350px;
  border-radius: 50px;
`

const tabletLayoutCss = css`
  margin: 0px 100px;
  border-radius: 20px;
`

const mobileLayoutCss = css`
  margin: 0px;
  border-radius: 10px;
`

const headerCss = css`
  font-size: xx-large;
  font-weight: bolder;
  color: ${colors.billboard.gray00};
  text-align: center;
  text-shadow: 0px 0px 2px ${colors.billboard.blue40};
`

const cameraCss = css`
  display: flex;
  justify-content: flex-end;
  &[position='left'] {
    justify-content: flex-start;
  }
`

export default function FavoriteMoviesPage() {
  const atSize = useAtSize()
  const desktopOnly = atSize({ default: false, xxl: true })
  const tabletDesktop = atSize({ default: false, lg: true })

  let layoutCss = tabletDesktop ? tabletLayoutCss : mobileLayoutCss

  if (desktopOnly) {
    layoutCss = desktopLayoutCss
  }

  const [movieGenres, status, loadingError] = useGenres()

  return (
    <LayoutBand css={[layoutCss, sharedLayoutCss]}>
      <Grid>
        <Cell columns={atSize({ default: 1, lg: 3 })} verticalAlign="middle">
          <div css={cameraCss} position="right">
            <ThingMovie />
          </div>
        </Cell>
        <Cell columns={atSize({ default: 10, lg: 6 })}>
          <h1 css={headerCss}>My Favorite movies</h1>
        </Cell>
        <Cell columns={atSize({ default: 1, lg: 3 })} verticalAlign="middle">
          <div css={cameraCss} position="left">
            <ThingMovie />
          </div>
        </Cell>
      </Grid>
      <Separator />
      {status === 'loading' && <div>loading . . . </div>}
      {movieGenres && (
        <FavoriteMovieProvider>
          <FavoriteMoviesResults movieGenres={movieGenres} />
        </FavoriteMovieProvider>
      )}
      {status === 'error' && <div>{loadingError}</div>}
    </LayoutBand>
  )
}
