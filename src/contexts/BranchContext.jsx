// hosting/src/contexts/BranchContext.jsx
import { createContext, useContext, useState } from 'react'

const BranchContext = createContext()

export const BranchProvider = ({ children }) => {
  const [currentBranch, setCurrentBranch] = useState(
    () => localStorage.getItem('branch') || ''
  )

  const switchBranch = (id) => {
    setCurrentBranch(id)
    localStorage.setItem('branch', id)
  }

  return (
    <BranchContext.Provider value={{ currentBranch, switchBranch }}>
      {children}
    </BranchContext.Provider>
  )
}

export const useBranch = () => useContext(BranchContext)