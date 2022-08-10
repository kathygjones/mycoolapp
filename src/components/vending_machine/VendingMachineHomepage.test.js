import React from 'react'
import { zionRender, screen } from '@fs/zion-testing-library'
import { usePermission } from '@fs/zion-permissions'
import VendingMachineHomepage from './VendingMachineHomepage'

jest.mock('@fs/zion-permissions', () => ({
  usePermission: jest.fn(() => {
    return [true]
  }),
}))

test('VendingMachineHomepage exists', async () => {
  expect(VendingMachineHomepage).toBeInstanceOf(Function)
})

test('renders personalized greeting', async () => {
  usePermission.mockImplementation(() => {
    return [true]
  })
  // Render new instance in every test to prevent leaking state
  await zionRender(<VendingMachineHomepage />)

  const component = screen.getByText(/Soda/i)
  expect(component).toBeInTheDocument()
  usePermission.mockReset()
})

test('renders error message for user without correct permissions', async () => {
  usePermission.mockImplementation(() => {
    return [false]
  })

  await zionRender(<VendingMachineHomepage />)

  const component = screen.getByText(/You must be a member to view this content/i)

  expect(component).toBeInTheDocument()
  usePermission.mockReset()
})
