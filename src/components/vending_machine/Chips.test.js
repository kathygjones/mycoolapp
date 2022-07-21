import React from 'react'
import { zionRender, screen } from '@fs/zion-testing-library'
import Chips from './Chips'

test('Chips exists', async () => {
  expect(Chips).toBeInstanceOf(Function)
})

test('renders personalized greeting', async () => {
  // Render new instance in every test to prevent leaking state
  await zionRender(<Chips />)

  const component = screen.getByText(/Chippies!/i)
  expect(component).toBeInTheDocument()
})
