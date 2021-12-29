import React from 'react'
import PropTypes from 'prop-types'

/** This is a really cool component that renders a person */
export default function Person({ name, photoUrl, relationshipDescription }) {
  return (
    <div>
      <h1>{name}</h1>
      <img src={photoUrl} alt="person" />
      <p>{relationshipDescription} </p>
    </div>
  )
}

Person.propTypes = {
  /** This is the name of the person */
  name: PropTypes.string.isRequired,
  photoUrl: PropTypes.string.isRequired,
  relationshipDescription: PropTypes.string,
}
