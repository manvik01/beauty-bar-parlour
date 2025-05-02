// Mindbody API utility functions

// Base URL for Mindbody API
const MINDBODY_API_BASE_URL = process.env.NEXT_PUBLIC_MINDBODY_API_URL || "https://api.mindbodyonline.com/public/v6"
const MINDBODY_API_KEY = process.env.MINDBODY_API_KEY
const MINDBODY_SITE_ID = process.env.MINDBODY_SITE_ID

// Headers for Mindbody API requests
const getHeaders = () => {
  return {
    "Content-Type": "application/json",
    "API-Key": MINDBODY_API_KEY,
    SiteId: MINDBODY_SITE_ID,
  }
}

// Fetch services from Mindbody
export async function getServices() {
  try {
    const response = await fetch(`${MINDBODY_API_BASE_URL}/services`, {
      method: "GET",
      headers: getHeaders(),
    })

    if (!response.ok) {
      throw new Error("Failed to fetch services")
    }

    const data = await response.json()
    return data.Services || []
  } catch (error) {
    console.error("Error fetching services:", error)
    return []
  }
}

// Fetch staff from Mindbody
export async function getStaff() {
  try {
    const response = await fetch(`${MINDBODY_API_BASE_URL}/staff`, {
      method: "GET",
      headers: getHeaders(),
    })

    if (!response.ok) {
      throw new Error("Failed to fetch staff")
    }

    const data = await response.json()
    return data.StaffMembers || []
  } catch (error) {
    console.error("Error fetching staff:", error)
    return []
  }
}

// Fetch available appointment times
export async function getAvailability(serviceId: string, staffId: string, date: string) {
  try {
    const response = await fetch(`${MINDBODY_API_BASE_URL}/appointments/availabletimes`, {
      method: "GET",
      headers: getHeaders(),
      body: JSON.stringify({
        ServiceIDs: [serviceId],
        StaffIDs: [staffId],
        StartDate: date,
        EndDate: date,
      }),
    })

    if (!response.ok) {
      throw new Error("Failed to fetch availability")
    }

    const data = await response.json()
    return data.AvailableTimes || []
  } catch (error) {
    console.error("Error fetching availability:", error)
    return []
  }
}

// Book an appointment
export async function bookAppointment(appointmentData: any) {
  try {
    const response = await fetch(`${MINDBODY_API_BASE_URL}/appointments`, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify(appointmentData),
    })

    if (!response.ok) {
      throw new Error("Failed to book appointment")
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error("Error booking appointment:", error)
    throw error
  }
}

// Get client information
export async function getClientInfo(clientId: string) {
  try {
    const response = await fetch(`${MINDBODY_API_BASE_URL}/clients/${clientId}`, {
      method: "GET",
      headers: getHeaders(),
    })

    if (!response.ok) {
      throw new Error("Failed to fetch client info")
    }

    const data = await response.json()
    return data.Client
  } catch (error) {
    console.error("Error fetching client info:", error)
    return null
  }
}

// Get client visits/appointments
export async function getClientVisits(clientId: string) {
  try {
    const response = await fetch(`${MINDBODY_API_BASE_URL}/clients/${clientId}/visits`, {
      method: "GET",
      headers: getHeaders(),
    })

    if (!response.ok) {
      throw new Error("Failed to fetch client visits")
    }

    const data = await response.json()
    return data.Visits || []
  } catch (error) {
    console.error("Error fetching client visits:", error)
    return []
  }
}
