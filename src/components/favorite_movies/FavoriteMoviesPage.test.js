// import React from 'react'
// import { zionRender, screen } from '@fs/zion-testing-library'
import FavoriteMoviesPage from './FavoriteMoviesPage'
// import FavoriteMovieProvider from './FavoriteMovieProvider'

test('FavoriteMoviesPage component exists', async () => {
  expect(FavoriteMoviesPage).toBeInstanceOf(Function)
})

// test('renders with heading', async () => {
//   await zionRender(
//     <FavoriteMovieProvider>
//       <FavoriteMoviesPage />
//     </FavoriteMovieProvider>
//   )

//   const header = screen.getByText(/My Favorite Movies/i)
//   expect(header).toBeInTheDocument()
// })
