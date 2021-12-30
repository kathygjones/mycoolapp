import React from 'react'
import PropTypes from 'prop-types'

export default function GeoLocation({ position }) {
  return <div>{position ? `${position.latitude}, ${position.longitude}` : 'Finding Location'}</div>
}

GeoLocation.propTypes = {
  /** Location object */
  position: PropTypes.shape({
    latitude: PropTypes.number.isRequired,
    longitude: PropTypes.number.isRequired,
  }),
}
