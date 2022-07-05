import React, { useCallback, useRef } from 'react'
import { Switch, Route, Link, useRouteMatch } from '@fs/zion-router'
// import { css } from '@emotion/core'
import ComponentWrapper from './ComponentWrapper'

export default function MyProfile() {
  const { path, url } = useRouteMatch()
  const hexString = useRef('#')

  const generateHexString = useCallback(() => {
    while (hexString.current.length <= 7) {
      hexString.current += Math.floor(Math.random() * 256).toString(16)
    }
  }, [hexString])

  return (
    <div>
      <ul>
        <li>
          <Link to={`${url}/my-family`}>My Family</Link>
        </li>
        <li>
          <Link to={`${url}/favorite-movies`} onClick={generateHexString}>
            My Favorite Movies
          </Link>
        </li>
        <li>
          <Link to={`${url}/dad-jokes`}>Dad Jokes</Link>
        </li>
      </ul>
      <Switch>
        <Route exact path={path}>
          <h1>Please select something</h1>
        </Route>
        <Route path={`${path}/:selectionId`}>
          <ComponentWrapper hexString={hexString.current} />
        </Route>
      </Switch>
    </div>
  )
}
