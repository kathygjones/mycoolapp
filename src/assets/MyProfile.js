import React from 'react'
import { Switch, Route, Link, useRouteMatch } from '@fs/zion-router'
import { css } from '@emotion/core'
import { Cell, Grid } from '@fs/zion-ui'
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

  return (
    <Grid>
      <Cell columns={3}>
        <ul css={navLinksCss}>
          <li>
            <Link to={`${url}`}>About Me</Link>
          </li>
          <li>
            <Link to={`${url}/my-family`}>My Family</Link>
          </li>
          <li>
            <Link to={`${url}/favorite-movies`}>My Favorite Movies</Link>
          </li>
          <li>
            <Link to={`${url}/dad-jokes`}>Dad Jokes</Link>
          </li>
          <li>
            <Link to={`${url}/vending-machine`}>Vending machine</Link>
          </li>
        </ul>
      </Cell>
      <Cell columns={9}>
        <Switch>
          <Route exact path={path}>
            <h1>Please select something</h1>
          </Route>
          <Route path={`${path}/:selectionId`}>
            <ComponentWrapper />
          </Route>
        </Switch>
      </Cell>
    </Grid>
  )
}
