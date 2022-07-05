import React from 'react'
import { LayoutBand, Separator, useAtSize, colors, Grid, Cell } from '@fs/zion-ui'
import { ThingMovie } from '@fs/zion-icon'
import { css } from '@emotion/core'
// import { boolAttr } from '@fs/zion-frontend-friends'
import { useGenres } from './favoriteMovieHooks'
import FavoriteMovieProvider from './FavoriteMovieProvider'
import FavoriteMoviesResults from './FavoriteMoviesResults'
import MovieLoadingSkeleton from './MovieLoadingSkeleton'

const sharedLayoutCss = css`
  margin-top: 50px;
  box-shadow: 0px 0px 10px white inset;
`

const desktopLayoutCss = css`
  padding: 20px;
  margin: 0px 350px;
  border-radius: 50px;
`

const tabletLayoutCss = css`
  padding: 20px;
  margin: 0px 100px;
  border-radius: 20px;
`

const mobileLayoutCss = css`
  padding: 20px 0px;
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

export default function FavoriteMoviesPage({ randomColor }) {
  const atSize = useAtSize()
  const desktopOnly = atSize({ default: false, xxl: true })
  const tabletDesktop = atSize({ default: false, lg: true })

  let layoutCss = tabletDesktop ? tabletLayoutCss : mobileLayoutCss

  if (desktopOnly) {
    layoutCss = desktopLayoutCss
  }

  const [movieGenres, status, loadingError] = useGenres()

  return (
    <div
      css={[layoutCss, sharedLayoutCss]}
      style={{ backgroundImage: `linear-gradient(to bottom right, ${randomColor.current}, white)` }}
    >
      <LayoutBand>
        <Grid>
          <Cell columns={atSize({ default: 1, lg: 3 })} verticalAlign="middle">
            <div css={cameraCss} position="right">
              <ThingMovie />
            </div>
          </Cell>
          <Cell columns={atSize({ default: 10, lg: 6 })}>
            <h1 css={headerCss}>My Favorite Movies</h1>
          </Cell>
          <Cell columns={atSize({ default: 1, lg: 3 })} verticalAlign="middle">
            <div css={cameraCss} position="left">
              <ThingMovie />
            </div>
          </Cell>
        </Grid>
        <Separator />
        {status === 'loading' && <MovieLoadingSkeleton />}
        {status === 'loaded' && (
          <FavoriteMovieProvider>
            <FavoriteMoviesResults movieGenres={movieGenres} />
          </FavoriteMovieProvider>
        )}
        {status === 'error' && <div>{loadingError.message}</div>}
      </LayoutBand>
    </div>
  )
}
