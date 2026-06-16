import type { EnquiryData } from "./schema"
import {
  ENQUIRY_CATEGORIES,
  ENQUIRY_SERVICE_BY_ID,
  type EnquiryCategory,
} from "./services"

export type GroupedSelection = {
  category: EnquiryCategory
  services: { id: string; label: string }[]
}

export function groupSelectionsByCategory(
  selectedServiceIds: string[],
): GroupedSelection[] {
  const byCategory = new Map<string, GroupedSelection>()

  for (const serviceId of selectedServiceIds) {
    const service = ENQUIRY_SERVICE_BY_ID[serviceId]
    if (!service) continue
    const existing = byCategory.get(service.categoryId)
    if (existing) {
      existing.services.push({ id: service.id, label: service.label })
    } else {
      const category = ENQUIRY_CATEGORIES.find((c) => c.id === service.categoryId)
      if (!category) continue
      byCategory.set(service.categoryId, {
        category,
        services: [{ id: service.id, label: service.label }],
      })
    }
  }

  return ENQUIRY_CATEGORIES.filter((c) => byCategory.has(c.id)).map(
    (c) => byCategory.get(c.id)!,
  )
}

export function formatFullName(data: Pick<EnquiryData, "firstName" | "lastName">) {
  return `${data.firstName} ${data.lastName}`.trim()
}

export function formatFullMobile(
  data: Pick<EnquiryData, "countryCode" | "mobile">,
): string | undefined {
  if (!data.mobile) return undefined
  const trimmed = data.mobile.replace(/[^\d]/g, "")
  if (!trimmed) return undefined
  return `${data.countryCode} ${trimmed}`
}

export function whatsappLinkForMobile(
  data: Pick<EnquiryData, "countryCode" | "mobile">,
): string | undefined {
  if (!data.mobile) return undefined
  const cc = data.countryCode.replace(/[^\d]/g, "")
  const num = data.mobile.replace(/[^\d]/g, "")
  if (!cc || !num) return undefined
  return `https://wa.me/${cc}${num}`
}

const CONTACT_METHOD_LABELS: Record<string, string> = {
  whatsapp: "WhatsApp",
  phone: "Phone call",
  email: "Email",
  "no-preference": "No preference",
}

export function preferredContactMethodLabel(
  method?: EnquiryData["preferredContactMethod"],
) {
  if (!method) return "Not specified"
  return CONTACT_METHOD_LABELS[method] ?? method
}

const TIME_LABELS: Record<string, string> = {
  morning: "Morning",
  afternoon: "Afternoon",
  evening: "Evening",
  any: "Any time",
}

export function preferredTimeLabel(time?: EnquiryData["preferredTime"]) {
  if (!time) return "Not specified"
  return TIME_LABELS[time] ?? time
}
