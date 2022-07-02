import React from 'react'
import FavoriteMovie from './FavoriteMovie'
import { mockMovieQueryResponse } from '../../assets/__fixtures__/mockMovieData'

const movieString = JSON.stringify(mockMovieQueryResponse.results[0])

export function Movie1() {
  return <FavoriteMovie movieString={movieString} />
}

export default {
  title: 'FavoriteMovie',
}
