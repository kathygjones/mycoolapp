import React from 'react'
import { Switch, Route, Link, useRouteMatch } from '@fs/zion-router'
import { css } from '@emotion/core'
import { Cell, Grid, LayoutBand, Button } from '@fs/zion-ui'
import { useTranslation, Trans } from 'react-i18next'
import ComponentWrapper from './ComponentWrapper'

const navLinksCss = css`
  list-style: none;
  li {
    padding: 30px;
    border: 1px solid black;
    border-radius: 10px;
  }
`
export default function MyProfile() {
  const { path, url } = useRouteMatch()
  const { t } = useTranslation()

  return (
    <Grid>
      <Cell columns={3}>
        <ul css={navLinksCss}>
          <li>
            <Link to={`${url}`}>{t('about.me', 'About Me')}</Link>
          </li>
          <li>
            <Link to={`${url}/my-family`}>{t('my.family', 'My Family')}</Link>
          </li>
          <li>
            <Link to={`${url}/favorite-movies`}>{t('my.favorite.movies', 'My Favorite Movies')}</Link>
          </li>
          <li>
            <Link to={`${url}/dad-jokes`}>{t('dad.jokes', 'Dad Jokes')}</Link>
          </li>
          <li>
            <Link to={`${url}/vending-machine`}>{t('vending.machine', 'Vending machine')}</Link>
          </li>
        </ul>
      </Cell>
      <Cell columns={9}>
        <Switch>
          <Route exact path={path}>
            <AboutMe />
          </Route>
          <Route path={`${path}/:selectionId`}>
            <ComponentWrapper />
          </Route>
        </Switch>
      </Cell>
    </Grid>
  )
}

function AboutMe() {
  const link1 = 'https://kathy-jones.com/'
  const link2 = 'https://github.com/katherinegjones'
  return (
    <LayoutBand>
      <div>
        <Trans
          i18nKey="about.me.message"
          defaults="Hello there! I am Kathy Jones, an avid musician, web developer, and mom. See my work on <link1>my personal webpage</link1> and <link2>my github repo</link2>."
          components={{
            link1: <Button emphasis="low" to={link1} external target="_blank" />,
            link2: <Button emphasis="low" to={link2} external target="_blank" />,
          }}
        />
      </div>
    </LayoutBand>
  )
}
