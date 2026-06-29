// Client-side Web3Forms transport for the Customer Interest Form.
//
// Web3Forms' free tier only accepts submissions from the browser (server-side
// calls require a paid plan). The access key is intentionally a public token:
// it is locked to the email inbox you registered with them, and they handle
// spam protection on their side. Exposing it via NEXT_PUBLIC_* is the
// supported pattern.

import {
  formatFullMobile,
  formatFullName,
  groupSelectionsByCategory,
  preferredContactMethodLabel,
  preferredTimeLabel,
} from "./format"
import type { EnquiryData } from "./schema"

export type Web3FormsSendArgs = {
  data: EnquiryData
  leadReference: string
  submittedAt: Date
}

export type Web3FormsSendResult =
  | { ok: true }
  | { ok: false; error: string; skipped?: boolean }

export function isWeb3FormsConfigured(): boolean {
  return Boolean(process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY)
}

function buildPayload(args: Web3FormsSendArgs, accessKey: string) {
  const { data, leadReference, submittedAt } = args
  const fullName = formatFullName(data)
  const mobile = formatFullMobile(data)
  const grouped = groupSelectionsByCategory(data.selectedServiceIds)

  const categoryList = grouped.map((g) => g.category.label).join(", ") || "None"
  const serviceList =
    grouped
      .flatMap((g) => g.services.map((s) => `${g.category.label}: ${s.label}`))
      .join("\n") || "None"

  const messageBody = [
    "New Beauty Bar Parlour Enquiry",
    "",
    `Lead reference: ${leadReference}`,
    `Customer: ${fullName}`,
    `Mobile: ${mobile ?? "Not provided"}`,
    `Email: ${data.email ?? "Not provided"}`,
    `Preferred contact: ${preferredContactMethodLabel(data.preferredContactMethod)}`,
    `Preferred timing: ${preferredTimeLabel(data.preferredTime)}`,
    `Categories: ${categoryList}`,
    "Services:",
    ...grouped.flatMap((g) =>
      g.services.map((s) => `  - ${g.category.label}: ${s.label}`),
    ),
    data.otherDetails ? `\nOther / details: ${data.otherDetails}` : "",
    data.message ? `\nCustomer message: ${data.message}` : "",
    `\nMarketing opt-in: ${data.marketingConsent ? "Yes" : "No"}`,
    data.sourcePage ? `Source page: ${data.sourcePage}` : "",
    `Submitted: ${submittedAt.toISOString()}`,
    "",
    "Action required: contact the customer and update the lead status.",
  ]
    .filter(Boolean)
    .join("\n")

  const payload: Record<string, unknown> = {
    access_key: accessKey,
    subject: `New Customer Enquiry - ${fullName} - ${leadReference}`,
    from_name: "Beauty Bar Parlour Website",
    botcheck: "",

    "Lead Reference": leadReference,
    Submitted: submittedAt.toUTCString(),
    "First Name": data.firstName,
    "Last Name": data.lastName,
    "Mobile / WhatsApp": mobile ?? "Not provided",
    "Email Address": data.email ?? "Not provided",
    "Preferred Contact": preferredContactMethodLabel(data.preferredContactMethod),
    "Preferred Time": preferredTimeLabel(data.preferredTime),
    Categories: categoryList,
    Services: serviceList,
    "Marketing Opt-in": data.marketingConsent ? "Yes" : "No",

    message: messageBody,
    name: fullName,
  }

  if (data.otherDetails) payload["Other / Details"] = data.otherDetails
  if (data.message) payload["Customer Message"] = data.message
  if (data.sourcePage) payload["Source Page"] = data.sourcePage

  if (data.email) {
    payload.email = data.email
    payload.replyto = data.email
  }

  return payload
}

export async function sendEnquiryViaWeb3Forms(
  args: Web3FormsSendArgs,
): Promise<Web3FormsSendResult> {
  const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY
  if (!accessKey) {
    return {
      ok: false,
      skipped: true,
      error: "NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY is not configured",
    }
  }

  try {
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(buildPayload(args, accessKey)),
    })

    let parsed: { success?: boolean; message?: string } | undefined
    try {
      parsed = (await response.json()) as { success?: boolean; message?: string }
    } catch {
      parsed = undefined
    }

    if (!response.ok || parsed?.success === false) {
      const detail = parsed?.message ?? response.statusText ?? "unknown error"
      return {
        ok: false,
        error: `Web3Forms send failed: ${response.status} ${detail}`,
      }
    }

    return { ok: true }
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err)
    return { ok: false, error: `Web3Forms send failed: ${message}` }
  }
}
