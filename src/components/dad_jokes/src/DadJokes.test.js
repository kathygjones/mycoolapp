import React from 'react'
import { zionRender, screen } from '@fs/zion-testing-library'
import DadJokes from './DadJokes'

test('DadJokes exists', async () => {
  expect(DadJokes).toBeInstanceOf(Function)
})

test('renders personalized greeting', async () => {
  // Render new instance in every test to prevent leaking state
  await zionRender(<DadJokes name="Component" />)

  const component = screen.getByText(/Hello, Component/i)
  expect(component).toBeInTheDocument()
})
