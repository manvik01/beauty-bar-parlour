"use client"

import { useState, useEffect } from "react"
import { getServices } from "@/lib/mindbody-api"
import { Clock } from "lucide-react"

interface Service {
  Id: string
  Name: string
  Description: string
  Duration: number
  Price: number
  CategoryId: string
  CategoryName: string
}

export function ServiceScheduleWidget() {
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [activeCategory, setActiveCategory] = useState<string | null>(null)

  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true)
        const servicesData = await getServices()
        setServices(servicesData)

        // Set the first category as active if there are services
        if (servicesData.length > 0) {
          setActiveCategory(servicesData[0].CategoryId)
        }
      } catch (err) {
        setError("Failed to load services. Please try again later.")
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchServices()
  }, [])

  // Get unique categories
  const categories = services.reduce((acc: { id: string; name: string }[], service) => {
    if (!acc.some((cat) => cat.id === service.CategoryId)) {
      acc.push({ id: service.CategoryId, name: service.CategoryName })
    }
    return acc
  }, [])

  // Filter services by active category
  const filteredServices = activeCategory
    ? services.filter((service) => service.CategoryId === activeCategory)
    : services

  if (loading) {
    return (
      <div className="p-8 text-center">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-sm uppercase tracking-wider">Loading services...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-8 text-center">
        <p className="text-sm text-red-500">{error}</p>
      </div>
    )
  }

  return (
    <div className="bg-white border border-primary/10">
      <div className="p-6 border-b border-primary/10">
        <h3 className="text-xl font-serif uppercase tracking-wider text-black">Our Services</h3>
        <p className="text-sm text-gold mt-2 font-medium">Browse our services and book your appointment</p>
        <p className="text-sm mt-1 text-black">Beyond Ordinary</p>
      </div>

      {/* Category Tabs */}
      {categories.length > 0 && (
        <div className="border-b border-primary/10 overflow-x-auto">
          <div className="flex min-w-max">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-6 py-3 text-xs uppercase tracking-wider transition-colors ${
                  activeCategory === category.id
                    ? "border-b-2 border-primary text-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Services List */}
      <div className="divide-y divide-primary/10">
        {filteredServices.length > 0 ? (
          filteredServices.map((service) => (
            <div key={service.Id} className="p-6 hover:bg-secondary/50 transition-colors">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-serif">{service.Name}</h4>
                <span className="text-primary font-light">${service.Price.toFixed(2)}</span>
              </div>

              <p className="text-sm text-muted-foreground mb-4 font-light">
                {service.Description || "Experience our premium service tailored to your needs."}
              </p>

              <div className="flex items-center justify-between">
                <div className="flex items-center text-xs text-muted-foreground">
                  <Clock className="w-4 h-4 mr-1" />
                  <span>{service.Duration} min</span>
                </div>

                <a
                  href={`/booking?serviceId=${service.Id}`}
                  className="px-4 py-2 text-xs uppercase tracking-wider bg-primary text-white hover:bg-primary/90 transition-colors"
                >
                  Book Now
                </a>
              </div>
            </div>
          ))
        ) : (
          <div className="p-6 text-center">
            <p className="text-sm text-muted-foreground">No services available in this category.</p>
          </div>
        )}
      </div>
    </div>
  )
}
