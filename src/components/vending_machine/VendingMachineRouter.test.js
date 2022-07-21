import React from 'react'
import { zionRender, screen } from '@fs/zion-testing-library'
import VendingMachineRouter from './VendingMachineRouter'

test('VendingMachineRouter exists', async () => {
  expect(VendingMachineRouter).toBeInstanceOf(Function)
})

test('renders personalized greeting', async () => {
  // Render new instance in every test to prevent leaking state
  await zionRender(<VendingMachineRouter name="Component" />)

  const component = screen.getByText(/Hello, Component/i)
  expect(component).toBeInTheDocument()
})
