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

// Mock services data for fallback
const mockServices = [
  { 
    Id: "s1", 
    Name: "Henna Root Touch Up", 
    Description: "Natural hair coloring with high-quality henna.", 
    Price: 75, 
    Duration: 60,
    CategoryId: "c1",
    CategoryName: "Hair Services" 
  },
  { 
    Id: "s2", 
    Name: "Hot Oil Massage",
    Description: "Relaxing scalp treatment that nourishes hair follicles.",
    Price: 75, 
    Duration: 45,
    CategoryId: "c1",
    CategoryName: "Hair Services"
  },
  { 
    Id: "s3", 
    Name: "Herbal Hair Treatment",
    Description: "Organic herbs to strengthen and rejuvenate hair.",
    Price: 90, 
    Duration: 90,
    CategoryId: "c1",
    CategoryName: "Hair Services"
  },
  { 
    Id: "s4", 
    Name: "Hair Color (Full)",
    Description: "Premium hair coloring service using quality products.",
    Price: 120, 
    Duration: 120,
    CategoryId: "c1",
    CategoryName: "Hair Services"
  },
  { 
    Id: "s5", 
    Name: "Classic Manicure", 
    Description: "Standard manicure with polish of your choice.", 
    Price: 25, 
    Duration: 30,
    CategoryId: "c2",
    CategoryName: "Nail Services" 
  },
  { 
    Id: "s6", 
    Name: "Gel Pedicure", 
    Description: "Long-lasting gel polish for toes with full pedicure.", 
    Price: 58, 
    Duration: 60,
    CategoryId: "c2",
    CategoryName: "Nail Services" 
  }
]

// Fetch services from Mindbody with better fallback support
export async function getServices() {
  try {
    // Check if API keys are configured
    if (!MINDBODY_API_KEY || !MINDBODY_SITE_ID) {
      console.warn("Mindbody API keys not configured, using mock data")
      return mockServices
    }

    const response = await fetch(`${MINDBODY_API_BASE_URL}/services`, {
      method: "GET",
      headers: getHeaders(),
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch services: ${response.status} ${response.statusText}`)
    }

    const data = await response.json()
    return data.Services && data.Services.length > 0 ? data.Services : mockServices
  } catch (error) {
    console.error("Error fetching services:", error)
    return mockServices
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
