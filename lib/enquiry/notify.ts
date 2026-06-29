import {
  renderCustomerHtml,
  renderCustomerSubject,
  renderCustomerText,
  renderStaffHtml,
  renderStaffSubject,
  renderStaffText,
  type RenderArgs,
} from "./email-templates"
import {
  formatFullMobile,
  formatFullName,
  groupSelectionsByCategory,
  preferredContactMethodLabel,
  preferredTimeLabel,
} from "./format"

const STAFF_EMAIL = process.env.BBP_STAFF_EMAIL ?? "enquiry@beautybarparlour.com"
const FROM_EMAIL =
  process.env.BBP_FROM_EMAIL ?? "Beauty Bar Parlour <enquiry@beautybarparlour.com>"

export type NotifyResult = {
  staff: { sent: boolean; error?: string; provider?: "resend" | "web3forms" }
  customer: { sent: boolean; error?: string; provider?: "resend" | "web3forms" }
}

// ---------------------------------------------------------------------------
// Resend transport
// ---------------------------------------------------------------------------

type ResendSendArgs = {
  from: string
  to: string | string[]
  subject: string
  html: string
  text: string
  replyTo?: string
}

async function sendViaResend(args: ResendSendArgs): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    throw new Error("RESEND_API_KEY is not configured")
  }

  const payload: Record<string, unknown> = {
    from: args.from,
    to: Array.isArray(args.to) ? args.to : [args.to],
    subject: args.subject,
    html: args.html,
    text: args.text,
  }
  if (args.replyTo) payload.reply_to = args.replyTo

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  })

  if (!response.ok) {
    const detail = await response.text().catch(() => "")
    throw new Error(`Resend send failed: ${response.status} ${detail}`)
  }
}

// ---------------------------------------------------------------------------
// Web3Forms transport
// Free tier delivers to the email registered against the access key.
// Each submitted field is rendered as a row in Web3Forms' default template,
// so we pass the lead details as labeled fields for a readable staff email.
// ---------------------------------------------------------------------------

function buildWeb3FormsStaffPayload(args: RenderArgs): Record<string, unknown> {
  const accessKey = process.env.WEB3FORMS_ACCESS_KEY
  if (!accessKey) throw new Error("WEB3FORMS_ACCESS_KEY is not configured")

  const { data, leadReference, submittedAt } = args
  const fullName = formatFullName(data)
  const mobile = formatFullMobile(data)
  const grouped = groupSelectionsByCategory(data.selectedServiceIds)

  const categoryList = grouped.map((g) => g.category.label).join(", ") || "None"
  const serviceList =
    grouped
      .flatMap((g) => g.services.map((s) => `${g.category.label}: ${s.label}`))
      .join("\n") || "None"

  const payload: Record<string, unknown> = {
    access_key: accessKey,
    subject: renderStaffSubject(args),
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

    message: renderStaffText(args),

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

async function postToWeb3Forms(payload: Record<string, unknown>): Promise<void> {
  const response = await fetch("https://api.web3forms.com/submit", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(payload),
  })

  let parsed: { success?: boolean; message?: string } | undefined
  try {
    parsed = (await response.json()) as { success?: boolean; message?: string }
  } catch {
    parsed = undefined
  }

  if (!response.ok || parsed?.success === false) {
    const detail = parsed?.message ?? response.statusText ?? "unknown error"
    throw new Error(`Web3Forms send failed: ${response.status} ${detail}`)
  }
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

type Provider = "web3forms" | "resend" | null

function pickProvider(): Provider {
  if (process.env.WEB3FORMS_ACCESS_KEY) return "web3forms"
  if (process.env.RESEND_API_KEY) return "resend"
  return null
}

export async function sendEnquiryNotifications(
  args: RenderArgs,
): Promise<NotifyResult> {
  const result: NotifyResult = {
    staff: { sent: false },
    customer: { sent: false },
  }

  const provider = pickProvider()
  if (!provider) {
    console.warn(
      "[enquiry] No email provider configured (set WEB3FORMS_ACCESS_KEY or RESEND_API_KEY); notifications skipped.",
      { leadReference: args.leadReference },
    )
    const error = "No email provider configured"
    result.staff.error = error
    result.customer.error = error
    return result
  }

  if (provider === "web3forms") {
    try {
      await postToWeb3Forms(buildWeb3FormsStaffPayload(args))
      result.staff.sent = true
      result.staff.provider = "web3forms"
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err)
      console.error("[enquiry] staff notification failed (web3forms)", message)
      result.staff.error = message
    }
    result.customer.provider = "web3forms"
    result.customer.error = args.data.email
      ? "Customer confirmation is delivered by Web3Forms Autoresponder (configure in dashboard)."
      : "Customer did not provide an email address"
    return result
  }

  try {
    await sendViaResend({
      from: FROM_EMAIL,
      to: STAFF_EMAIL,
      subject: renderStaffSubject(args),
      html: renderStaffHtml(args),
      text: renderStaffText(args),
      replyTo: args.data.email,
    })
    result.staff.sent = true
    result.staff.provider = "resend"
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err)
    console.error("[enquiry] staff notification failed (resend)", message)
    result.staff.error = message
  }

  if (args.data.email) {
    try {
      await sendViaResend({
        from: FROM_EMAIL,
        to: args.data.email,
        subject: renderCustomerSubject(args),
        html: renderCustomerHtml(args),
        text: renderCustomerText(args),
        replyTo: STAFF_EMAIL,
      })
      result.customer.sent = true
      result.customer.provider = "resend"
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err)
      console.error("[enquiry] customer confirmation failed (resend)", message)
      result.customer.error = message
    }
  } else {
    result.customer.error = "Customer did not provide an email address"
  }

  return result
}
