import React from 'react'
import { zionRender, screen, waitFor, fireEvent, userEvent } from '@fs/zion-testing-library'
import axios from '@fs/zion-axios'
import FavoriteMoviesResults from './FavoriteMoviesResults'
import FavoriteMovieProvider from './FavoriteMovieProvider'
import getMockMovieData, { mockMovieGenres } from './__fixtures__/mockMovieData'

beforeEach(() => {
  axios.get = jest.fn((url) => Promise.resolve(getMockMovieData({ url })))
})

afterEach(() => {
  axios.get.mockClear()
})

test('FavoriteMoviesResults component exists', () => {
  expect(FavoriteMoviesResults).toBeInstanceOf(Function)
})

test('renders with heading', async () => {
  await zionRender(
    <FavoriteMovieProvider>
      <FavoriteMoviesResults movieGenres={mockMovieGenres} />
    </FavoriteMovieProvider>
  )

  const header = screen.getByText(/No movies yet!/i)
  expect(header).toBeInTheDocument()
})

test('Add movie functionality works', async () => {
  await zionRender(
    <FavoriteMovieProvider>
      <FavoriteMoviesResults movieGenres={mockMovieGenres} />
    </FavoriteMovieProvider>
  )
  const addMovie = screen.getByText(/Add your favorite movie!/i)
  expect(addMovie).toBeInTheDocument()

  fireEvent.click(addMovie)

  await waitFor(() => {
    expect(addMovie).not.toBeInTheDocument()
  })

  const movieInput = screen.getByLabelText(/Movie Title/i)
  expect(movieInput).toBeInTheDocument()

  userEvent.type(movieInput, 'Sing')
  expect(movieInput.value).toBe('Sing')

  const submitButton = screen.getByText(/Submit/i)
  expect(submitButton).toBeInTheDocument()

  fireEvent.click(submitButton)

  await waitFor(() => {}) // wait one tick

  const ratingText = await screen.findAllByText(/Average user rating:/i)

  expect(ratingText[0]).toBeInTheDocument()
})
