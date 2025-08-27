"use client"

import React, { useEffect, useRef } from "react"

export default function ReviewsBanner() {
  const containerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    container.setAttribute("data-bid", "157659")
    container.setAttribute("data-url", "https://app.revu.cloud")
    container.setAttribute("data-aid", "23780")

    const advScriptId = "reviewability-adv-script"
    if (!document.getElementById(advScriptId)) {
      const script = document.createElement("script")
      script.id = advScriptId
      script.src = "https://widget.reviewability.com/js/widgetAdv.min.js"
      script.async = true
      // Append to container to scope execution near the widget root
      container.appendChild(script)
    }

    const ldScriptId = "reviewability-json-ld"
    if (!document.getElementById(ldScriptId)) {
      const jsonLd = document.createElement("script")
      jsonLd.id = ldScriptId
      jsonLd.type = "application/ld+json"
      jsonLd.className = "json-ld-content"
      container.appendChild(jsonLd)
    }

    return () => {
      // Clean up scripts added inside this container to avoid duplicates on remount
      const localAdvScript = container.querySelector(`#${advScriptId}`)
      if (localAdvScript) localAdvScript.remove()
      const localLdScript = container.querySelector(`#${ldScriptId}`)
      if (localLdScript) localLdScript.remove()
    }
  }, [])

  return (
    <section className="py-8 md:py-10 bg-white">
      <div className="container-custom">
        <div className="border border-primary/10 p-4 md:p-6 bg-white/80">
          <div ref={containerRef} className="w-full overflow-hidden" />
        </div>
      </div>
    </section>
  )
}


