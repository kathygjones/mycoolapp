// import React from 'react';
import axios from '@fs/zion-axios'

export async function getCurrentUser() {
  const response = await axios.get('/service/tree/ftuser/users/CURRENT')
  return response.data
}

export async function getPortrait({ personId }) {
  const response = await axios.get(`/service/memories/tps/persons/${personId}/portrait`)
  return response.data
}

export async function scanForRelatives({ latitude, longitude, token }) {
  const { gender, personId, displayName: name } = await getCurrentUser()
  const { thumbIconUrl: photoUrl } = await getPortrait({ personId })
  const response = await axios.post('/mobile/api/v1/peers/inproximity', {
    latitude,
    longitude,
    token,
    gender,
    name,
    photoUrl,
  })
  return response.data.map((result) => ({ ...result, loggedInPersonId: personId }))
}
