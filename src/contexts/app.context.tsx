import React, { useState } from 'react'
import { ExtendedPurchase } from 'src/types/purchase.type'
import { User } from 'src/types/user.type'
import { getAccessTokenFromLS, getProfileFromLS } from 'src/utils/auth'

interface AppContextInterface {
  isAuthenticated: boolean
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>
  profile: User | null
  setProfile: React.Dispatch<React.SetStateAction<User | null>>
  extendedPurchases: ExtendedPurchase[]
  setExtendedPurchases: React.Dispatch<React.SetStateAction<ExtendedPurchase[]>>
  resetAuth: () => void
}

const initialAppContext: AppContextInterface = {
  isAuthenticated: Boolean(getAccessTokenFromLS()),
  setIsAuthenticated: () => null,
  profile: getProfileFromLS(),
  setProfile: () => null,
  extendedPurchases: [],
  setExtendedPurchases: () => null,
  resetAuth: () => null
}

export const AppContext = React.createContext<AppContextInterface>(initialAppContext)

export const AppContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(initialAppContext.isAuthenticated)
  const [profile, setProfile] = useState<User | null>(initialAppContext.profile)
  const [extendedPurchases, setExtendedPurchases] = useState<ExtendedPurchase[]>(initialAppContext.extendedPurchases)

  const resetAuth = () => {
    setIsAuthenticated(false)
    setProfile(null)
  }
  return (
    <AppContext.Provider
      value={{
        isAuthenticated: isAuthenticated,
        setIsAuthenticated: setIsAuthenticated,
        profile: profile,
        setProfile: setProfile,
        extendedPurchases: extendedPurchases,
        setExtendedPurchases: setExtendedPurchases,
        resetAuth: resetAuth
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
