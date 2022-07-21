import React from 'react'
import { zionRender, screen } from '@fs/zion-testing-library'
import Candy from './Candy'

test('Candy exists', async () => {
  expect(Candy).toBeInstanceOf(Function)
})

test('renders personalized greeting', async () => {
  // Render new instance in every test to prevent leaking state
  await zionRender(<Candy />)

  const component = screen.getByText(/I want Candy!/i)
  expect(component).toBeInTheDocument()
})
