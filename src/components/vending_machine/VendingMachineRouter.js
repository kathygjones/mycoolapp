import React from 'react'
import { Switch, Route, useRouteMatch } from '@fs/zion-router'
import { css } from '@emotion/core'
import VendingMachineHomepage from './VendingMachineHomepage'

export default function VendingMachineRouter() {
  const { path } = useRouteMatch()
  return (
    <Switch>
      <Route exact path={path} component={VendingMachineHomepage} />
      <Route path={`${path}/candy`} />
      <Route path={`${path}/soda`} />
      <Route path={`${path}/chips`} />
    </Switch>
  )
}
