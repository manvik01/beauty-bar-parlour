"use client"

interface TimeSelectionProps {
  selectedTime: string
  selectedDate: Date | null
  serviceCategory: string
  onSelect: (time: string) => void
  onNext: () => void
  onBack: () => void
}

export function TimeSelection({
  selectedTime,
  selectedDate,
  serviceCategory,
  onSelect,
  onNext,
  onBack,
}: TimeSelectionProps) {
  // Format date for display
  const formattedDate = selectedDate
    ? selectedDate.toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
      })
    : ""

  // Generate time slots (10am to 8pm, 30 min intervals)
  const generateTimeSlots = () => {
    const slots = []
    const startHour = 10 // 10am
    const endHour = 20 // 8pm

    for (let hour = startHour; hour < endHour; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const formattedHour = hour % 12 === 0 ? 12 : hour % 12
        const period = hour >= 12 ? "PM" : "AM"
        const formattedMinute = minute === 0 ? "00" : minute
        slots.push(`${formattedHour}:${formattedMinute} ${period}`)
      }
    }

    return slots
  }

  // Simulate unavailable time slots based on service category
  // In a real app, this would come from a database or API
  const getUnavailableSlots = () => {
    // This is just a simulation - in a real app, you'd check availability from a database
    const unavailable = []

    // Simulate some unavailable slots
    if (serviceCategory === "Hair Services") {
      unavailable.push("11:30 AM", "2:00 PM", "4:30 PM")
    } else if (serviceCategory === "Nail Services") {
      unavailable.push("10:00 AM", "1:00 PM", "3:30 PM")
    } else {
      // Random unavailable slots for other services
      unavailable.push("12:00 PM", "2:30 PM", "5:00 PM")
    }

    return unavailable
  }

  const timeSlots = generateTimeSlots()
  const unavailableSlots = getUnavailableSlots()

  return (
    <div>
      <h2 className="text-2xl font-serif font-medium mb-6 text-center uppercase tracking-widest text-black">
        Select a Time
      </h2>

      <div className="mb-6 text-center">
        <p className="font-medium text-black">
          {formattedDate} • {serviceCategory}
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mb-8">
        {timeSlots.map((time) => {
          const isUnavailable = unavailableSlots.includes(time)
          return (
            <button
              key={time}
              onClick={() => !isUnavailable && onSelect(time)}
              disabled={isUnavailable}
              className={`py-3 transition-colors group ${
                selectedTime === time
                  ? "bg-primary text-black font-medium"
                  : isUnavailable
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "border border-border text-black hover:border-primary"
              }`}
            >
              <span
                className={`text-sm font-medium ${selectedTime === time ? "glitter-bold" : "group-hover:glitter-bold"}`}
              >
                {time}
              </span>
            </button>
          )
        })}
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
          disabled={!selectedTime}
          className={`px-8 py-3 uppercase tracking-widest text-xs transition-all ${
            selectedTime ? "bg-primary text-white hover:bg-primary/90" : "bg-gray-200 text-gray-500 cursor-not-allowed"
          }`}
        >
          Continue
        </button>
      </div>
    </div>
  )
}
