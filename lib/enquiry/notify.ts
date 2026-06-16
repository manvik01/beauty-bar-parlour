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
  staff: { sent: boolean; error?: string }
  customer: { sent: boolean; error?: string }
}

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

export async function sendEnquiryNotifications(
  args: RenderArgs,
): Promise<NotifyResult> {
  const result: NotifyResult = {
    staff: { sent: false },
    customer: { sent: false },
  }

  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    console.warn(
      "[enquiry] RESEND_API_KEY missing; staff/customer notifications skipped.",
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
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err)
    console.error("[enquiry] staff notification failed", message)
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
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err)
      console.error("[enquiry] customer confirmation failed", message)
      result.customer.error = message
    }
  } else {
    result.customer.error = "Customer did not provide an email address"
  }

  return result
}
