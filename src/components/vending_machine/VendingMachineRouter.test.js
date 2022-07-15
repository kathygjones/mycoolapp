import React from 'react'
import { zionRender, screen } from '@fs/zion-testing-library'
import VendingMachine from './VendingMachineRouter'

test('VendingMachine exists', async () => {
  expect(VendingMachine).toBeInstanceOf(Function)
})

test('renders personalized greeting', async () => {
  // Render new instance in every test to prevent leaking state
  await zionRender(<VendingMachine name="Component" />)

  const component = screen.getByText(/Hello, Component/i)
  expect(component).toBeInTheDocument()
})
