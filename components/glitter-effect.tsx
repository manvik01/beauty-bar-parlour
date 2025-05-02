"use client"

import { useEffect, useRef } from "react"

interface GlitterEffectProps {
  targetSelector: string
}

export function GlitterEffect({ targetSelector }: GlitterEffectProps) {
  const effectRef = useRef<boolean>(false)

  useEffect(() => {
    if (effectRef.current) return
    effectRef.current = true

    const targetElement = document.querySelector(targetSelector)
    if (!targetElement) return

    // Create sparkle elements
    const createSparkle = () => {
      const sparkle = document.createElement("span")

      // Set sparkle styles
      sparkle.style.position = "absolute"
      sparkle.style.width = `${2 + Math.random() * 3}px`
      sparkle.style.height = `${2 + Math.random() * 3}px`
      sparkle.style.borderRadius = "50%"
      sparkle.style.backgroundColor = "#fff"
      sparkle.style.boxShadow = "0 0 10px rgba(255, 255, 255, 0.8), 0 0 5px rgba(212, 175, 55, 0.5)"
      sparkle.style.pointerEvents = "none"

      // Position sparkle randomly within the element
      const rect = targetElement.getBoundingClientRect()
      sparkle.style.left = `${Math.random() * 100}%`
      sparkle.style.top = `${Math.random() * 100}%`

      // Animate sparkle
      sparkle.animate(
        [
          { opacity: 0, transform: "scale(0)" },
          { opacity: 1, transform: "scale(1)" },
          { opacity: 0, transform: "scale(0)" },
        ],
        {
          duration: 1000 + Math.random() * 1000,
          easing: "cubic-bezier(0.4, 0, 0.2, 1)",
        },
      )

      // Add sparkle to target element
      targetElement.appendChild(sparkle)

      // Remove sparkle after animation
      setTimeout(() => {
        if (sparkle.parentNode === targetElement) {
          targetElement.removeChild(sparkle)
        }
      }, 2000)
    }

    // Create sparkles at intervals
    const interval = setInterval(() => {
      createSparkle()
    }, 300)

    return () => {
      clearInterval(interval)
    }
  }, [targetSelector])

  return null
}
