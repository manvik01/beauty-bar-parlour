"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { getClientInfo, getClientVisits } from "@/lib/mindbody-api"
import { User, Calendar, Clock, ChevronRight } from "lucide-react"

interface ClientAccountWidgetProps {
  clientId?: string
}

export function ClientAccountWidget({ clientId }: ClientAccountWidgetProps) {
  const [isLoggedIn, setIsLoggedIn] = useState(!!clientId)
  const [clientData, setClientData] = useState<any>(null)
  const [visits, setVisits] = useState([])
  const [activeTab, setActiveTab] = useState("upcoming")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  })

  useEffect(() => {
    if (clientId) {
      fetchClientData(clientId)
    }
  }, [clientId])

  const fetchClientData = async (id: string) => {
    try {
      setLoading(true)
      const [client, clientVisits] = await Promise.all([getClientInfo(id), getClientVisits(id)])

      setClientData(client)
      setVisits(clientVisits)
    } catch (err) {
      setError("Failed to load client data. Please try again later.")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      setLoading(true)
      setError(null)

      // In a real app, this would call an API endpoint to validate credentials
      // For demo purposes, we'll simulate a successful login
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Mock client data
      setClientData({
        Id: "c123",
        FirstName: "Jane",
        LastName: "Smith",
        Email: loginForm.email,
        Phone: "+65 9123 4567",
        MembershipName: "Gold Member",
      })

      // Mock visits data
      setVisits([
        {
          Id: "v1",
          StartDateTime: new Date(Date.now() + 86400000 * 3).toISOString(), // 3 days from now
          ServiceName: "Gel Manicure",
          StaffName: "Sarah Johnson",
          Status: "Confirmed",
        },
        {
          Id: "v2",
          StartDateTime: new Date(Date.now() + 86400000 * 10).toISOString(), // 10 days from now
          ServiceName: "Hair Styling",
          StaffName: "Aisha Patel",
          Status: "Confirmed",
        },
        {
          Id: "v3",
          StartDateTime: new Date(Date.now() - 86400000 * 5).toISOString(), // 5 days ago
          ServiceName: "Classic Facial",
          StaffName: "Michael Chen",
          Status: "Completed",
        },
      ])

      setIsLoggedIn(true)
    } catch (err) {
      setError("Login failed. Please check your credentials and try again.")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    setClientData(null)
    setVisits([])
    setLoginForm({ email: "", password: "" })
  }

  // Filter visits based on active tab
  const filteredVisits = visits.filter((visit) => {
    const visitDate = new Date(visit.StartDateTime)
    const now = new Date()

    if (activeTab === "upcoming") {
      return visitDate > now
    } else {
      return visitDate <= now
    }
  })

  if (loading && !isLoggedIn) {
    return (
      <div className="bg-white border border-primary/10 p-8 text-center">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-sm uppercase tracking-wider">Loading account...</p>
      </div>
    )
  }

  return (
    <div className="bg-white border border-primary/10">
      <div className="p-6 border-b border-primary/10">
        <h3 className="text-xl font-serif uppercase tracking-wider">My Account</h3>
        <p className="text-sm text-muted-foreground mt-2">
          {isLoggedIn ? "Manage your appointments and profile" : "Sign in to manage your appointments"}
        </p>
      </div>

      {error && <div className="p-4 bg-red-50 text-red-600 text-sm">{error}</div>}

      {!isLoggedIn ? (
        <div className="p-6">
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs uppercase tracking-wider mb-1">Email</label>
              <input
                type="email"
                required
                value={loginForm.email}
                onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                className="w-full border border-gray-200 p-3 focus:outline-none focus:border-primary"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider mb-1">Password</label>
              <input
                type="password"
                required
                value={loginForm.password}
                onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                className="w-full border border-gray-200 p-3 focus:outline-none focus:border-primary"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={loading || !loginForm.email || !loginForm.password}
                className={`w-full px-6 py-3 text-xs uppercase tracking-wider ${
                  loading || !loginForm.email || !loginForm.password
                    ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                    : "bg-primary text-white hover:bg-primary/90"
                }`}
              >
                {loading ? "Signing In..." : "Sign In"}
              </button>
            </div>
          </form>

          <div className="mt-4 text-center">
            <a href="#" className="text-xs text-primary hover:underline">
              Forgot password?
            </a>
          </div>

          <div className="mt-6 pt-6 border-t border-gray-200 text-center">
            <p className="text-sm mb-4">Don't have an account?</p>
            <a
              href="/register"
              className="px-6 py-3 border border-primary text-primary hover:bg-primary/10 transition-colors text-xs uppercase tracking-wider inline-block"
            >
              Create Account
            </a>
          </div>
        </div>
      ) : (
        <div>
          {/* Client Profile Summary */}
          <div className="p-6 border-b border-primary/10">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mr-4">
                <User className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h4 className="font-serif">
                  {clientData.FirstName} {clientData.LastName}
                </h4>
                <p className="text-xs text-muted-foreground">{clientData.Email}</p>
                {clientData.MembershipName && (
                  <span className="inline-block mt-1 px-2 py-1 bg-primary/10 text-primary text-xs">
                    {clientData.MembershipName}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-primary/10">
            <button
              onClick={() => setActiveTab("upcoming")}
              className={`flex-1 py-3 text-xs uppercase tracking-wider ${
                activeTab === "upcoming" ? "border-b-2 border-primary text-primary" : "text-muted-foreground"
              }`}
            >
              Upcoming
            </button>
            <button
              onClick={() => setActiveTab("past")}
              className={`flex-1 py-3 text-xs uppercase tracking-wider ${
                activeTab === "past" ? "border-b-2 border-primary text-primary" : "text-muted-foreground"
              }`}
            >
              Past
            </button>
          </div>

          {/* Appointments List */}
          <div className="divide-y divide-primary/10">
            {filteredVisits.length > 0 ? (
              filteredVisits.map((visit, index) => {
                const visitDate = new Date(visit.StartDateTime)
                return (
                  <div key={index} className="p-4 hover:bg-secondary/50 transition-colors">
                    <div className="flex justify-between items-start">
                      <div>
                        <h5 className="font-serif">{visit.ServiceName}</h5>
                        <p className="text-xs text-muted-foreground mt-1">with {visit.StaffName}</p>
                      </div>
                      <span
                        className={`text-xs px-2 py-1 ${
                          visit.Status === "Confirmed" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {visit.Status}
                      </span>
                    </div>
                    <div className="flex items-center mt-3 text-xs text-muted-foreground">
                      <Calendar className="w-3 h-3 mr-1" />
                      <span>
                        {visitDate.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })}
                      </span>
                      <span className="mx-2">•</span>
                      <Clock className="w-3 h-3 mr-1" />
                      <span>{visitDate.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" })}</span>
                    </div>

                    {activeTab === "upcoming" && (
                      <div className="mt-3 flex justify-end">
                        <a
                          href={`/booking/reschedule?appointmentId=${visit.Id}`}
                          className="text-xs text-primary hover:underline mr-4"
                        >
                          Reschedule
                        </a>
                        <a
                          href={`/booking/cancel?appointmentId=${visit.Id}`}
                          className="text-xs text-red-500 hover:underline"
                        >
                          Cancel
                        </a>
                      </div>
                    )}
                  </div>
                )
              })
            ) : (
              <div className="p-8 text-center">
                <p className="text-sm text-muted-foreground">
                  {activeTab === "upcoming"
                    ? "You don't have any upcoming appointments."
                    : "You don't have any past appointments."}
                </p>
                {activeTab === "upcoming" && (
                  <a
                    href="/booking"
                    className="inline-block mt-4 px-6 py-3 bg-primary text-white hover:bg-primary/90 transition-colors text-xs uppercase tracking-wider"
                  >
                    Book Now
                  </a>
                )}
              </div>
            )}
          </div>

          {/* Footer Actions */}
          <div className="p-4 border-t border-primary/10 flex justify-between items-center">
            <button onClick={handleLogout} className="text-xs text-muted-foreground hover:text-foreground">
              Sign Out
            </button>

            <a href="/profile" className="flex items-center text-xs text-primary">
              View Profile <ChevronRight className="ml-1 w-3 h-3" />
            </a>
          </div>
        </div>
      )}
    </div>
  )
}
