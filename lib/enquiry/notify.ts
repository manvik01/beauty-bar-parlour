import {
  renderCustomerHtml,
  renderCustomerSubject,
  renderCustomerText,
  renderStaffHtml,
  renderStaffSubject,
  renderStaffText,
  type RenderArgs,
} from "./email-templates"

const STAFF_EMAIL = process.env.BBP_STAFF_EMAIL ?? "enquiry@beautybarparlour.com"
const FROM_EMAIL =
  process.env.BBP_FROM_EMAIL ?? "Beauty Bar Parlour <enquiry@beautybarparlour.com>"

export type NotifyResult = {
  staff: { sent: boolean; error?: string; provider?: "resend" }
  customer: { sent: boolean; error?: string; provider?: "resend" }
}

// ---------------------------------------------------------------------------
// Resend transport (server-side, branded emails from your verified domain)
// ---------------------------------------------------------------------------
// Note: Web3Forms is intentionally not handled here. Their free tier blocks
// server-side submissions (Pro plan required for server calls). The browser
// fires the Web3Forms call directly from EnquiryForm using
// NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY whenever the server didn't already send
// via Resend.

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
// Public API
// ---------------------------------------------------------------------------

export async function sendEnquiryNotifications(
  args: RenderArgs,
): Promise<NotifyResult> {
  const result: NotifyResult = {
    staff: { sent: false },
    customer: { sent: false },
  }

  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    console.info(
      "[enquiry] RESEND_API_KEY not set; server-side email skipped (client will attempt Web3Forms if NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY is configured).",
      { leadReference: args.leadReference },
    )
    result.staff.error = "RESEND_API_KEY not configured"
    result.customer.error = "RESEND_API_KEY not configured"
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
