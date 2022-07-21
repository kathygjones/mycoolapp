import React from 'react'
import { css } from '@emotion/core'
import { Link, useRouteMatch } from '@fs/zion-router'
import { usePermission } from '@fs/zion-permissions'
import Background from './Background'

export default function VendingMachineHomepage() {
  const { url } = useRouteMatch()
  const [isMember] = usePermission('FtMemberUiPermission')
  if (!isMember) {
    return <div>You must be a member to view this content</div>
  }
  return (
    <div>
      <Link to={`${url}/soda`}>Soda</Link>
      <Link to={`${url}/chips`}>Chips</Link>
      <Link to={`${url}/candy`}>Candy</Link>

      <Background />
    </div>
  )
}
