"use client"

import { useState, useEffect } from "react"
import { WifiOff } from "lucide-react"

export function OfflineDetector() {
  const [isOnline, setIsOnline] = useState(true)

  useEffect(() => {
    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)

    window.addEventListener("online", handleOnline)
    window.addEventListener("offline", handleOffline)

    return () => {
      window.removeEventListener("online", handleOnline)
      window.removeEventListener("offline", handleOffline)
    }
  }, [])

  if (isOnline) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-red-500 text-white p-2 text-center z-50 flex items-center justify-center">
      <WifiOff className="w-4 h-4 mr-2" />
      <span>You are currently offline. Some features may be unavailable.</span>
    </div>
  )
}
