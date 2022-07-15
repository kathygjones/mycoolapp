import React from 'react'
import PropTypes from 'prop-types'
import { css } from '@emotion/core'
import Background from './Background'

export default function VendingMachineHomepage() {
  return <Background />
}

VendingMachineHomepage.propTypes = {
  name: PropTypes.string,
}
