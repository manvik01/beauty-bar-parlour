"use client"

import { type ReactNode, useState } from "react"
import { motion } from "framer-motion"

interface GlitterWrapperProps {
  children: ReactNode
  intensity?: "low" | "medium" | "high"
  color?: string
  className?: string
}

export function GlitterWrapper({
  children,
  intensity = "medium",
  color = "#c0a678",
  className = "",
}: GlitterWrapperProps) {
  const [isHovered, setIsHovered] = useState(false)

  // Configure intensity
  const particleCount = intensity === "low" ? 5 : intensity === "medium" ? 10 : 15
  const animationDuration = intensity === "low" ? 1.5 : intensity === "medium" ? 2 : 2.5

  return (
    <div
      className={`relative inline-block ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}

      {isHovered && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(particleCount)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full"
              style={{ backgroundColor: color }}
              initial={{
                x: Math.random() * 100 - 50,
                y: Math.random() * 100 - 50,
                opacity: 0,
                scale: 0,
              }}
              animate={{
                x: Math.random() * 200 - 100,
                y: Math.random() * 200 - 100,
                opacity: [0, 1, 0],
                scale: [0, Math.random() * 1.5 + 0.5, 0],
              }}
              transition={{
                duration: animationDuration,
                ease: "easeInOut",
                times: [0, 0.5, 1],
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "loop",
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>
      )}
    </div>
  )
}
