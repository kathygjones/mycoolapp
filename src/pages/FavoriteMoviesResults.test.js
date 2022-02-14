import React from 'react'
import { zionRender, screen } from '@fs/zion-testing-library'
import FavoriteMoviesResults from './FavoriteMoviesResults'
import FavoriteMovieProvider from './FavoriteMovieProvider'

test('FavoriteMoviesResults component exists', () => {
  expect(FavoriteMoviesResults).toBeInstanceOf(Function)
})

test('renders with heading', async () => {
  await zionRender(
    <FavoriteMovieProvider>
      <FavoriteMoviesResults />
    </FavoriteMovieProvider>
  )

  const header = screen.getByText(/No movies yet!/i)
  expect(header).toBeInTheDocument()
})
