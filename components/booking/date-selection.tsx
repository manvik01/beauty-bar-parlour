"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface DateSelectionProps {
  selectedDate: Date | null
  onSelect: (date: Date) => void
  onNext: () => void
  onBack: () => void
}

export function DateSelection({ selectedDate, onSelect, onNext, onBack }: DateSelectionProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date())

  // Get current date without time
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  // Calculate days in month
  const daysInMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate()

  // Calculate first day of month (0 = Sunday, 1 = Monday, etc.)
  const firstDayOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay()

  // Create array of days
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1)

  // Add empty cells for days before first day of month
  const emptyCells = Array.from({ length: firstDayOfMonth }, (_, i) => null)

  // Combine empty cells and days
  const calendarDays = [...emptyCells, ...days]

  // Format month name
  const monthName = currentMonth.toLocaleString("default", { month: "long" })

  // Navigate to previous month
  const prevMonth = () => {
    const newMonth = new Date(currentMonth)
    newMonth.setMonth(newMonth.getMonth() - 1)
    setCurrentMonth(newMonth)
  }

  // Navigate to next month
  const nextMonth = () => {
    const newMonth = new Date(currentMonth)
    newMonth.setMonth(newMonth.getMonth() + 1)
    setCurrentMonth(newMonth)
  }

  // Check if a date is in the past
  const isPastDate = (day: number) => {
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day)
    return date < today
  }

  // Handle date selection
  const handleDateSelect = (day: number) => {
    if (isPastDate(day)) return
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day)
    onSelect(date)
  }

  // Format date for comparison
  const formatDate = (date: Date) => {
    return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`
  }

  // Check if a date is selected
  const isSelected = (day: number) => {
    if (!selectedDate) return false
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day)
    return formatDate(date) === formatDate(selectedDate)
  }

  return (
    <div>
      <h2 className="text-2xl font-serif font-medium mb-6 text-center uppercase tracking-widest text-black">
        Select a Date
      </h2>

      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <button onClick={prevMonth} className="p-2 hover:bg-secondary transition-colors" aria-label="Previous month">
            <ChevronLeft size={20} />
          </button>
          <h3 className="text-lg font-medium uppercase tracking-widest text-black">
            {monthName} {currentMonth.getFullYear()}
          </h3>
          <button onClick={nextMonth} className="p-2 hover:bg-secondary transition-colors" aria-label="Next month">
            <ChevronRight size={20} />
          </button>
        </div>

        <div className="grid grid-cols-7 gap-1 text-center">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div key={day} className="text-center py-2 text-xs uppercase tracking-wider text-muted-foreground">
              {day}
            </div>
          ))}

          {calendarDays.map((day, index) => (
            <div
              key={index}
              className={`aspect-square flex items-center justify-center ${day === null ? "" : "cursor-pointer"}`}
            >
              {day !== null && (
                <button
                  onClick={() => handleDateSelect(day)}
                  disabled={isPastDate(day)}
                  className={`w-full h-full flex items-center justify-center transition-colors group ${
                    isSelected(day)
                      ? "bg-primary text-black font-medium"
                      : isPastDate(day)
                        ? "text-gray-300 cursor-not-allowed"
                        : "text-black hover:bg-primary/10"
                  }`}
                >
                  <span className={`${isSelected(day) ? "glitter-bold" : "group-hover:glitter-bold"}`}>{day}</span>
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-between">
        <button
          onClick={onBack}
          className="px-8 py-3 border border-primary text-primary hover:bg-primary/10 transition-all uppercase tracking-widest text-xs"
        >
          Back
        </button>
        <button
          onClick={onNext}
          disabled={!selectedDate}
          className={`px-8 py-3 uppercase tracking-widest text-xs transition-all ${
            selectedDate ? "bg-primary text-white hover:bg-primary/90" : "bg-gray-200 text-gray-500 cursor-not-allowed"
          }`}
        >
          Continue
        </button>
      </div>
    </div>
  )
}
