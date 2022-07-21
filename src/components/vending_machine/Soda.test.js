import React from 'react'
import { zionRender, screen } from '@fs/zion-testing-library'
import Soda from './Soda'

test('Soda exists', async () => {
  expect(Soda).toBeInstanceOf(Function)
})

test('renders personalized greeting', async () => {
  // Render new instance in every test to prevent leaking state
  await zionRender(<Soda />)

  const component = screen.getByText(/Fizz. . . Buzz . . ./i)
  expect(component).toBeInTheDocument()
})
