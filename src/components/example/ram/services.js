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
