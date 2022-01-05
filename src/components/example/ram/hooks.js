import React from 'react'
import { getCurrentUser, getPortrait, scanForRelatives } from './services'

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

export function useScanForRelatives({ latitude, longitude, token }) {
  function reducer(state, action) {
    switch (action.type) {
      case "SCANNING":
        return {
          ...state,
          scanning: true
        };
      case "RESULTS":
        return {
          ...state,
          scanning: false,
          relatives: action.results
        };
      default:
        throw new Error(`unexpected action.type in reducer: ${action.type}`);
    }
  }

  const [state, dispatch] = React.useReducer(reducer, {
    scanning: false,
    relatives: []
  });

  React.useEffect(() => {
    if (!latitude || !longitude) return () => null;

    function scan() {
      dispatch({ type: "SCANNING" });
      scanForRelatives({ latitude, longitude, token }).then(results => {
        dispatch({ type: "RESULTS", results });
      });
    }

    scan();
    const interval = setInterval(scan, 5000);
    return () => clearInterval(interval);
  }, [latitude, longitude, token]);

  return [state, dispatch];
}

function useLocalStorageState (
    {
        key,
        initialValue,
        serialize = v => v,
        deserialize = v => Number(v),
    }
) {
    const [state, setState] = React.useState(() => 
        deserialize(window.localStorage.getItem(key) || initialValue)
    )
    React.useEffect(() => {
        window.localStorage.setItem(key, serialize(state))
    }, [key, serialize, state])

    return [state, setState]
}

export function useDeviceId () {
    const [deviceId, setDeviceId] = useLocalStorageState({ key: 'device-id' })
    if (!deviceId || Number.isNaN(Number(deviceId))) setDeviceId('TESTING')
    console.log(`Token: ${deviceId}`)
    return deviceId
}
