import React from 'react'
import PropTypes from 'prop-types'
//  import { i18n } from '@fs/zion-locale'

/** This is a really cool component that renders a person */
export default function Person({ name, photoUrl, relationshipDescription, handleClick }) {
  return (
    <div>
      <h1>{name}</h1>
      <img src={photoUrl} alt="person" />
      <a  onClick={handleClick}>{relationshipDescription} </a>
    </div>
  )
}

Person.propTypes = {
  /** This is the name of the person */
  name: PropTypes.string.isRequired,
  /** url of person's photo */
  photoUrl: PropTypes.string.isRequired,
  /** person's relationship to user */
  relationshipDescription: PropTypes.string,
}
