"use client"

import { useScriptLoader } from "@/contexts/script-loader-context"
import { LoadingSpinner } from "@/components/loading-spinner"

export function RootTouchUpWidget() {
  const { isScriptLoaded } = useScriptLoader()
  const widgetHtml = `<healcode-widget data-version="0.2" data-link-class="healcode-pricing-option-text-link" data-site-id="127612" data-mb-site-id="5746301" data-service-id="100003" data-bw-identity-site="true" data-type="pricing-link" data-inner-html="Buy"></healcode-widget>`

  if (!isScriptLoaded) {
    return (
      <div className="flex justify-center items-center h-40">
        <LoadingSpinner />
      </div>
    )
  }

  return <div dangerouslySetInnerHTML={{ __html: widgetHtml }} />
} 