import React from 'react'
import { zionRender, screen } from '@fs/zion-testing-library'
import VendingMachineHomepage from './VendingMachineHomepage'

test('VendingMachineHomepage exists', async () => {
  expect(VendingMachineHomepage).toBeInstanceOf(Function)
})

test('renders personalized greeting', async () => {
  // Render new instance in every test to prevent leaking state
  await zionRender(<VendingMachineHomepage name="Component" />)

  const component = screen.getByText(/Hello, Component/i)
  expect(component).toBeInTheDocument()
})
