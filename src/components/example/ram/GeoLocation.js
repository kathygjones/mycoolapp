import React from 'react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'

export default function GeoLocation({ position }) {
  const [t] = useTranslation()
  return (
    <div>{position ? `${position.latitude}, ${position.longitude}` : t('finding.location', 'Finding Location')}</div>
  )
}

GeoLocation.propTypes = {
  /** Location object */
  position: PropTypes.shape({
    latitude: PropTypes.number.isRequired,
    longitude: PropTypes.number.isRequired,
  }),
}
