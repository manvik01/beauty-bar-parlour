"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { getStaff } from "@/lib/mindbody-api"
import { Calendar } from "lucide-react"

interface StaffMember {
  Id: string
  FirstName: string
  LastName: string
  Bio: string
  ImageUrl: string
  Role: string
}

export function StaffWidget() {
  const [staff, setStaff] = useState<StaffMember[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchStaff = async () => {
      try {
        setLoading(true)
        const staffData = await getStaff()
        setStaff(staffData)
      } catch (err) {
        setError("Failed to load staff. Please try again later.")
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchStaff()
  }, [])

  if (loading) {
    return (
      <div className="p-8 text-center">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-sm uppercase tracking-wider">Loading team members...</p>
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

  // If API fails, use placeholder data
  const displayStaff =
    staff.length > 0
      ? staff
      : [
          {
            Id: "1",
            FirstName: "Sarah",
            LastName: "Johnson",
            Bio: "Expert in hair styling with over 10 years of experience.",
            ImageUrl: "/professional-stylist.png",
            Role: "Senior Hair Stylist",
          },
          {
            Id: "2",
            FirstName: "Aisha",
            LastName: "Patel",
            Bio: "Specializes in nail art and gel extensions.",
            ImageUrl: "/nail-technician-applying-gel.png",
            Role: "Nail Technician",
          },
          {
            Id: "3",
            FirstName: "Michael",
            LastName: "Chen",
            Bio: "Certified esthetician with expertise in facial treatments.",
            ImageUrl: "/male-esthetician.png",
            Role: "Esthetician",
          },
        ]

  return (
    <div className="bg-white border border-primary/10">
      <div className="p-6 border-b border-primary/10">
        <h3 className="text-xl font-serif uppercase tracking-wider text-black">Our Team</h3>
        <p className="text-sm text-gold mt-2 font-medium">Meet our skilled professionals</p>
        <p className="text-sm mt-1 text-black">Beyond Ordinary</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-primary/10">
        {displayStaff.map((member) => (
          <div key={member.Id} className="bg-white p-6 hover:bg-secondary/50 transition-colors">
            <div className="relative w-full aspect-square mb-4 overflow-hidden">
              <Image
                src={member.ImageUrl || "/placeholder.svg?height=300&width=300&query=beauty%20professional"}
                alt={`${member.FirstName} ${member.LastName}`}
                fill
                className="object-cover"
              />
            </div>

            <h4 className="font-serif text-lg mb-1">
              {member.FirstName} {member.LastName}
            </h4>
            <p className="text-primary text-sm uppercase tracking-wider mb-3">{member.Role}</p>
            <p className="text-sm text-muted-foreground mb-4 font-light">{member.Bio}</p>

            <a
              href={`/booking?staffId=${member.Id}`}
              className="inline-block px-4 py-2 text-xs uppercase tracking-wider border border-primary text-primary hover:bg-primary/10 transition-colors"
            >
              <Calendar className="w-4 h-4 inline-block mr-2" />
              Book with {member.FirstName}
            </a>
          </div>
        ))}
      </div>
    </div>
  )
}
