import React from 'react'
import { getCurrentUser, getPortrait } from './services'

export function useUser() {
  const [currentUser, setCurrentUser] = React.useState()

  React.useEffect(() => {
    getCurrentUser().then((results) => {
      setCurrentUser(results)
    })
  }, [])
  return currentUser
}

export function usePortrait(currentUser) {
  const [portrait, setPortrait] = React.useState()
  // eslint-disable-next-line
  React.useEffect(()  => {
    if (!currentUser) return () => null
    const { personId } = currentUser
    getPortrait({ personId }).then((results) => {
      setPortrait(results)
    })
  }, [currentUser])

  return portrait
}

export function useLocation() {
  const [currentPosition, setCurrentPosition] = React.useState()
  React.useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setCurrentPosition({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      })
    })
  }, [])

  return currentPosition
}
