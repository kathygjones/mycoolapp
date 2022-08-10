import React, { useContext, createContext, useState } from 'react'

const VendingMachineContext = createContext()
const VendingMachineStateUpdateContext = createContext()

export default function VendingMachineProvider({ children }) {
  const [itemVended, setItemVended] = useState(false)
  return (
    <VendingMachineStateUpdateContext.Provider value={{ setItemVended }}>
      <VendingMachineContext.Provider value={{ itemVended }}>{children}</VendingMachineContext.Provider>
    </VendingMachineStateUpdateContext.Provider>
  )
}
