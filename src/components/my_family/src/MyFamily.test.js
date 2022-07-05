import React from 'react'
import { zionRender, screen } from '@fs/zion-testing-library'
import MyFamily from './MyFamily'

test('MyFamily exists', async () => {
  expect(MyFamily).toBeInstanceOf(Function)
})

test('renders personalized greeting', async () => {
  // Render new instance in every test to prevent leaking state
  await zionRender(<MyFamily name="Component" />)

  const component = screen.getByText(/Hello, Component/i)
  expect(component).toBeInTheDocument()
})
