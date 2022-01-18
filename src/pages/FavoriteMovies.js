import React from 'react'
import { FlowGrid } from '@fs/zion-ui'
import FavoriteMovieWrapper from './FavoriteMovieWrapper'

const faveMovies = ['Sing 2']

export default function FavoriteMovies() {
  return (
    <FlowGrid>
      {faveMovies.map((name) => (
        <FavoriteMovieWrapper key={name} name={name} />
      ))}
    </FlowGrid>
  )
}
