"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

interface CountdownProps {
  targetDate: Date
}

export function CountdownTimer({ targetDate }: CountdownProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = targetDate.getTime() - new Date().getTime()

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        })
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
      }
    }

    calculateTimeLeft()
    const timer = setInterval(calculateTimeLeft, 1000)

    return () => clearInterval(timer)
  }, [targetDate])

  return (
    <div className="text-center">
      <p className="text-sm uppercase tracking-widest mb-6 text-gold font-medium">July 26, 2025</p>
      <div className="flex justify-center gap-8 md:gap-12">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <span className="text-3xl md:text-5xl font-light text-gold">{timeLeft.days}</span>
          <span className="block text-xs uppercase tracking-widest mt-1 text-black font-medium">Days</span>
        </motion.div>

        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <span className="text-3xl md:text-5xl font-light text-gold">
            {timeLeft.hours.toString().padStart(2, "0")}
          </span>
          <span className="block text-xs uppercase tracking-widest mt-1 text-black font-medium">Hours</span>
        </motion.div>

        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <span className="text-3xl md:text-5xl font-light text-gold">
            {timeLeft.minutes.toString().padStart(2, "0")}
          </span>
          <span className="block text-xs uppercase tracking-widest mt-1 text-black font-medium">Minutes</span>
        </motion.div>

        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <span className="text-3xl md:text-5xl font-light text-gold">
            {timeLeft.seconds.toString().padStart(2, "0")}
          </span>
          <span className="block text-xs uppercase tracking-widest mt-1 text-black font-medium">Seconds</span>
        </motion.div>
      </div>
    </div>
  )
}
