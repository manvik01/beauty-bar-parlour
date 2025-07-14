"use client"

import { useScriptLoader } from "@/contexts/script-loader-context"
import { LoadingSpinner } from "@/components/loading-spinner"

const RegistrationWidget = () => {
  const { isScriptLoaded } = useScriptLoader()

  if (!isScriptLoaded) {
    return (
      <div className="flex justify-center items-center h-40">
        <LoadingSpinner />
      </div>
    )
  }

  return (
    <healcode-widget
      data-type="registrations"
      data-widget-partner="object"
      data-widget-id="0e163173e78e"
      data-widget-version="0"
    ></healcode-widget>
  )
}

export default RegistrationWidget 