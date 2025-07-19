"use client"

import { useState, useEffect, useRef } from "react"
import { useSearchParams } from "next/navigation"
import { Copy, X } from "lucide-react"

const serviceCategories = [
  { id: "hair", name: "Herbal Treatment", widgetId: "0e33258e78e" },
  { id: "nail", name: "Nail & Foot Spa", widgetId: "0e33444e78e", isPrompt: true }, // Special case
  { id: "facial", name: "Facial Services", widgetId: "0e33532e78e" },
  { id: "waxing", name: "Waxing Services", widgetId: "0e33533e78e" },
  { id: "threading", name: "Threading Services", widgetId: "0e33534e78e" },
  { id: "laser", name: "AFT Treatment", widgetId: "0e33535e78e" },
]

// Direct HTML injection for robust widget loading.
function MindbodySnippetEmbed({ widgetId }: { widgetId: string }) {
  const getWidgetSnippet = () => {
    const div = `<div class="mindbody-widget" data-widget-type="Appointments" data-widget-id="${widgetId}"></div>`
    const script = `<script async src="https://brandedweb.mindbodyonline.com/embed/widget.js?v=${Date.now()}"><\/script>`
    return { __html: div + script }
  }
  return <div dangerouslySetInnerHTML={getWidgetSnippet()} className="min-h-[600px] w-full" />
}

// A simple modal to show the widget code snippet.
function CodePromptModal({ code, onClose }: { code: string; onClose: () => void }) {
  const [copied, setCopied] = useState(false)
  const copyToClipboard = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-white p-6 rounded-lg shadow-xl max-w-lg w-full">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-serif text-black">Embed Widget Code</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800"><X size={24} /></button>
        </div>
        <p className="text-muted-foreground mb-4">Copy and paste this snippet into your website's HTML to embed the booking widget.</p>
        <div className="bg-gray-100 p-4 rounded-md relative">
          <pre className="text-sm text-gray-800 overflow-x-auto"><code>{code}</code></pre>
          <button
            onClick={copyToClipboard}
            className="absolute top-2 right-2 px-3 py-1 bg-gray-200 text-gray-800 rounded-md text-xs hover:bg-gray-300"
          >
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>
      </div>
    </div>
  )
}

export function ServiceSelection() {
  const searchParams = useSearchParams()
  const categoryFromUrl = searchParams.get("category")

  const [activeCategory, setActiveCategory] = useState(categoryFromUrl)
  const [widgetKey, setWidgetKey] = useState(0)
  const [showCodePrompt, setShowCodePrompt] = useState(false)
  const serviceSelectionRef = useRef<HTMLDivElement>(null)
  
  const currentCategory = serviceCategories.find((cat) => cat.id === activeCategory)

  const handleCategoryChange = (categoryId: string) => {
    const category = serviceCategories.find(c => c.id === categoryId)
    setActiveCategory(categoryId)
    setWidgetKey(prev => prev + 1)

    if (category?.isPrompt) {
      setShowCodePrompt(true)
    } else {
      setShowCodePrompt(false)
      setTimeout(() => {
        serviceSelectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }, 100)
    }
  }

  const getPromptCode = () => {
    if (currentCategory?.isPrompt) {
      return `<!-- Mindbody Appointments widget begin -->\n<div class="mindbody-widget" data-widget-type="Appointments" data-widget-id="${currentCategory.widgetId}"></div>\n<script async src="https://brandedweb.mindbodyonline.com/embed/widget.js"><\/script>\n<!-- Mindbody Appointments widget end -->`
    }
    return ''
  }

  return (
    <div ref={serviceSelectionRef}>
      <h2 className="text-2xl font-serif font-medium mb-6 text-center uppercase tracking-widest text-black">Select a Service</h2>
      <div className="mb-8 overflow-x-auto">
        <div className="flex justify-center flex-wrap gap-2 md:gap-4">
          {serviceCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => handleCategoryChange(category.id)}
              className={`px-4 py-2 text-xs uppercase tracking-widest transition-colors group ${activeCategory === category.id ? "bg-primary text-black font-medium" : "bg-secondary text-black hover:bg-primary/10"}`}
            >
              <span className={`${activeCategory === category.id ? "glitter-bold" : "group-hover:glitter-bold"}`}>{category.name}</span>
            </button>
          ))}
        </div>
      </div>
      
      {currentCategory && !currentCategory.isPrompt && (
        <div className="mb-8" data-widget-area>
          <div className="mb-4 text-center">
            <h3 className="text-lg font-serif font-medium uppercase tracking-wider text-black mb-2">Book Your {currentCategory.name} Appointment</h3>
          </div>
          <div className="max-h-[80vh] overflow-y-auto rounded-lg border">
            <MindbodySnippetEmbed key={widgetKey} widgetId={currentCategory.widgetId} />
          </div>
        </div>
      )}

      {showCodePrompt && (
        <CodePromptModal code={getPromptCode()} onClose={() => setShowCodePrompt(false)} />
      )}
    </div>
  )
}
