"use client"

import { createContext, useState, useContext, type ReactNode } from "react"

interface ScriptLoaderContextType {
  isScriptLoaded: boolean
  setScriptLoaded: (isLoaded: boolean) => void
}

const ScriptLoaderContext = createContext<ScriptLoaderContextType | undefined>(undefined)

export const ScriptLoaderProvider = ({ children }: { children: ReactNode }) => {
  const [isScriptLoaded, setScriptLoaded] = useState(false)

  const value = {
    isScriptLoaded,
    setScriptLoaded,
  }

  return (
    <ScriptLoaderContext.Provider value={value}>
      {children}
    </ScriptLoaderContext.Provider>
  )
}

export const useScriptLoader = () => {
  const context = useContext(ScriptLoaderContext)
  if (context === undefined) {
    throw new Error("useScriptLoader must be used within a ScriptLoaderProvider")
  }
  return context
} 