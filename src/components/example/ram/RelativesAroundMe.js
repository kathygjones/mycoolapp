import React from 'react'
// import { getCurrentUser } from './services'
import { useTranslation, Trans } from 'react-i18next'
import Link from '@fs/zion-router/dist/cjs/Link'
import Person from './Person'
import { useLocation, useScanForRelatives } from './hooks'
import Geolocation from './GeoLocation'

function Gender({ gender }) {
  switch (gender) {
    case 'MALE':
      return '🕺'
    case 'FEMALE':
      return '💃'
    default:
      return '🧑'
  }
}

export default function RelativesAroundMe() {
  const location = useLocation()
  // const token = useDeviceId()
  // console.log(`Token: ${token}`)
  const [state] = useScanForRelatives({ ...location, token: 'TESTING' })
  const [t] = useTranslation()

  const { scanning, relatives } = state

  return (
    <>
      <Geolocation position={location} />
      <div>
        {scanning
          ? t('scanning', 'Scanning for relatives')
          : t('relatives.count', 'We have found {count} relatives around you', { count: relatives.length })}
      </div>
      {relatives.map((relative) => (
        <React.Fragment key={relative.token}>
          <Person {...relative} />
          <Trans i18nKey="person.description">
            <div>
              Their gender is <Gender gender={relative.gender} /> and they are{}
              {{ distance: Math.round(relative.distance) }} meters away.
              <Link to="profile">View their profile</Link>
            </div>
          </Trans>
        </React.Fragment>
      ))}
    </>
  )
}
