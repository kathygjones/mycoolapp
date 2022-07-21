import React from 'react'
import { Switch, Route, useRouteMatch } from '@fs/zion-router'
import VendingMachineHomepage from './VendingMachineHomepage'
import Candy from './Candy'
import Chips from './Chips'
import Soda from './Soda'

export default function VendingMachineRouter() {
  const { path } = useRouteMatch()
  return (
    <Switch>
      <Route exact path={path} component={VendingMachineHomepage} />
      <Route path={`${path}/candy`} component={Candy} />
      <Route path={`${path}/soda`} component={Soda} />
      <Route path={`${path}/chips`} component={Chips} />
    </Switch>
  )
}
