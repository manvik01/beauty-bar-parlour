import type { EnquiryData } from "./schema"
import {
  formatFullMobile,
  formatFullName,
  groupSelectionsByCategory,
  preferredContactMethodLabel,
  preferredTimeLabel,
  whatsappLinkForMobile,
} from "./format"

const STAFF_WHATSAPP_NUMBER = "6584158896"
const STAFF_PHONE_DISPLAY = "+65 8415 8896"

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;")
}

export type RenderArgs = {
  data: EnquiryData
  leadReference: string
  submittedAt: Date
}

function staffWhatsappPrefilled(args: RenderArgs): string {
  const { data, leadReference, submittedAt } = args
  const fullName = formatFullName(data)
  const mobile = formatFullMobile(data) ?? "Not provided"
  const email = data.email ?? "Not provided"
  const preferred = preferredContactMethodLabel(data.preferredContactMethod)
  const grouped = groupSelectionsByCategory(data.selectedServiceIds)
  const categories = grouped.map((g) => g.category.label).join(", ") || "None"
  const services =
    grouped
      .flatMap((g) => g.services.map((s) => `${g.category.label}: ${s.label}`))
      .join("; ") || "None"

  const lines = [
    "*New Beauty Bar Parlour Enquiry*",
    "",
    `Lead reference: ${leadReference}`,
    `Customer: ${fullName}`,
    `Mobile: ${mobile}`,
    `Email: ${email}`,
    `Preferred contact: ${preferred}`,
    `Preferred timing: ${preferredTimeLabel(data.preferredTime)}`,
    `Categories: ${categories}`,
    `Services: ${services}`,
  ]
  if (data.otherDetails) lines.push(`Other / details: ${data.otherDetails}`)
  if (data.message) lines.push(`Message: ${data.message}`)
  if (data.sourcePage) lines.push(`Source page: ${data.sourcePage}`)
  lines.push(`Submitted: ${submittedAt.toISOString()}`)
  lines.push("", "Action required: contact the customer and update the lead status.")

  return lines.join("\n")
}

export function renderStaffSubject(args: RenderArgs): string {
  return `New Customer Enquiry - ${formatFullName(args.data)} - ${args.leadReference}`
}

export function renderStaffText(args: RenderArgs): string {
  return staffWhatsappPrefilled(args)
}

export function renderStaffHtml(args: RenderArgs): string {
  const { data, leadReference, submittedAt } = args
  const fullName = formatFullName(data)
  const mobile = formatFullMobile(data)
  const email = data.email
  const customerWhatsapp = whatsappLinkForMobile(data)
  const staffWhatsappHref = `https://wa.me/${STAFF_WHATSAPP_NUMBER}?text=${encodeURIComponent(
    staffWhatsappPrefilled(args),
  )}`
  const grouped = groupSelectionsByCategory(data.selectedServiceIds)

  const detailRow = (label: string, value: string, options?: { mono?: boolean }) => `
      <tr>
        <td style="padding:8px 14px;background:#faf7f1;border:1px solid #ecddc1;color:#6b5a3a;font-size:12px;text-transform:uppercase;letter-spacing:0.08em;width:42%;vertical-align:top;">${escapeHtml(label)}</td>
        <td style="padding:8px 14px;background:#ffffff;border:1px solid #ecddc1;color:#1a1a1a;font-size:14px;${options?.mono ? "font-family:Menlo,Consolas,monospace;" : ""}vertical-align:top;">${value}</td>
      </tr>`

  const escapedHref = (href: string) => escapeHtml(href)

  const customerActions: string[] = []
  if (customerWhatsapp) {
    customerActions.push(
      `<a href="${escapedHref(customerWhatsapp)}" style="display:inline-block;background:#25D366;color:#ffffff;text-decoration:none;padding:10px 18px;border-radius:9999px;font-size:13px;letter-spacing:0.08em;text-transform:uppercase;margin:4px 6px 4px 0;">WhatsApp customer</a>`,
    )
  }
  if (mobile) {
    const tel = `tel:${(data.countryCode + data.mobile!).replace(/[^\d+]/g, "")}`
    customerActions.push(
      `<a href="${escapedHref(tel)}" style="display:inline-block;background:#1a1a1a;color:#ffffff;text-decoration:none;padding:10px 18px;border-radius:9999px;font-size:13px;letter-spacing:0.08em;text-transform:uppercase;margin:4px 6px 4px 0;">Call customer</a>`,
    )
  }
  if (email) {
    customerActions.push(
      `<a href="mailto:${escapedHref(email)}?subject=${encodeURIComponent(
        `Re: your enquiry (${leadReference})`,
      )}" style="display:inline-block;background:#c0a678;color:#1a1a1a;text-decoration:none;padding:10px 18px;border-radius:9999px;font-size:13px;letter-spacing:0.08em;text-transform:uppercase;margin:4px 6px 4px 0;">Email customer</a>`,
    )
  }

  const servicesHtml =
    grouped.length === 0
      ? `<p style="margin:0;color:#6b5a3a;font-style:italic;">No services selected.</p>`
      : grouped
          .map(
            (g) => `
            <div style="margin-bottom:14px;">
              <p style="margin:0 0 6px;font-size:12px;text-transform:uppercase;letter-spacing:0.12em;color:#c0a678;font-weight:600;">${escapeHtml(g.category.label)}</p>
              <ul style="margin:0;padding-left:18px;color:#1a1a1a;font-size:14px;line-height:1.6;">
                ${g.services.map((s) => `<li>${escapeHtml(s.label)}</li>`).join("")}
              </ul>
            </div>`,
          )
          .join("")

  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>${escapeHtml(renderStaffSubject(args))}</title>
  </head>
  <body style="margin:0;padding:0;background:#f4ede0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;color:#1a1a1a;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f4ede0;padding:24px 0;">
      <tr>
        <td align="center">
          <table role="presentation" width="640" cellpadding="0" cellspacing="0" style="max-width:640px;background:#ffffff;border:1px solid #ecddc1;border-radius:8px;overflow:hidden;">
            <tr>
              <td style="background:#1a1a1a;color:#ffffff;padding:24px 28px;">
                <p style="margin:0;font-size:12px;letter-spacing:0.18em;text-transform:uppercase;color:#c0a678;">Beauty Bar Parlour</p>
                <h1 style="margin:6px 0 0;font-size:22px;font-weight:500;letter-spacing:0.02em;">New customer enquiry</h1>
                <p style="margin:8px 0 0;font-size:13px;color:#d8caa8;">Reference <strong style="color:#ffffff;">${escapeHtml(leadReference)}</strong> &middot; ${escapeHtml(submittedAt.toUTCString())}</p>
              </td>
            </tr>

            <tr>
              <td style="padding:20px 28px;background:#fbf7ee;border-bottom:1px solid #ecddc1;">
                ${customerActions.join("") || `<p style="margin:0;color:#6b5a3a;">No customer contact details provided.</p>`}
                <p style="margin:14px 0 0;font-size:12px;color:#6b5a3a;">Need to discuss internally?
                  <a href="${escapedHref(staffWhatsappHref)}" style="color:#1a1a1a;font-weight:600;">Forward this lead to ${escapeHtml(STAFF_PHONE_DISPLAY)} on WhatsApp</a>.
                </p>
              </td>
            </tr>

            <tr>
              <td style="padding:24px 28px;">
                <h2 style="margin:0 0 12px;font-size:16px;letter-spacing:0.06em;text-transform:uppercase;color:#1a1a1a;">Customer</h2>
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
                  ${detailRow("Name", escapeHtml(fullName))}
                  ${detailRow(
                    "Mobile / WhatsApp",
                    mobile
                      ? `<a href="${escapedHref(`tel:${(data.countryCode + data.mobile!).replace(/[^\d+]/g, "")}`)}" style="color:#1a1a1a;text-decoration:none;">${escapeHtml(mobile)}</a>`
                      : '<span style="color:#9c8a63;">Not provided</span>',
                  )}
                  ${detailRow(
                    "Email",
                    email
                      ? `<a href="mailto:${escapedHref(email)}" style="color:#1a1a1a;text-decoration:none;">${escapeHtml(email)}</a>`
                      : '<span style="color:#9c8a63;">Not provided</span>',
                  )}
                  ${detailRow("Preferred contact", escapeHtml(preferredContactMethodLabel(data.preferredContactMethod)))}
                  ${detailRow("Preferred timing", escapeHtml(preferredTimeLabel(data.preferredTime)))}
                  ${detailRow("Marketing opt-in", data.marketingConsent ? "Yes" : "No")}
                  ${data.sourcePage ? detailRow("Source page", escapeHtml(data.sourcePage), { mono: true }) : ""}
                </table>
              </td>
            </tr>

            <tr>
              <td style="padding:0 28px 24px;">
                <h2 style="margin:0 0 12px;font-size:16px;letter-spacing:0.06em;text-transform:uppercase;color:#1a1a1a;">Services of interest</h2>
                ${servicesHtml}
                ${
                  data.otherDetails
                    ? `<p style="margin:14px 0 0;font-size:13px;color:#1a1a1a;background:#faf7f1;border-left:3px solid #c0a678;padding:10px 14px;"><strong style="display:block;text-transform:uppercase;font-size:11px;letter-spacing:0.08em;color:#6b5a3a;margin-bottom:4px;">Other / details</strong>${escapeHtml(data.otherDetails)}</p>`
                    : ""
                }
              </td>
            </tr>

            ${
              data.message
                ? `<tr>
                    <td style="padding:0 28px 24px;">
                      <h2 style="margin:0 0 12px;font-size:16px;letter-spacing:0.06em;text-transform:uppercase;color:#1a1a1a;">Message</h2>
                      <p style="margin:0;padding:14px 16px;background:#fbf7ee;border:1px solid #ecddc1;border-radius:6px;color:#1a1a1a;line-height:1.5;white-space:pre-wrap;">${escapeHtml(data.message)}</p>
                    </td>
                  </tr>`
                : ""
            }

            <tr>
              <td style="padding:0 28px 28px;color:#6b5a3a;font-size:12px;line-height:1.6;">
                <p style="margin:0;">Next steps: contact the customer through their preferred channel, then create or update their profile in Fresha. Reference <strong style="color:#1a1a1a;">${escapeHtml(leadReference)}</strong> when logging this lead.</p>
              </td>
            </tr>
          </table>

          <p style="font-size:11px;color:#9c8a63;margin:16px 0 0;">This message was generated automatically by the Beauty Bar Parlour website enquiry form.</p>
        </td>
      </tr>
    </table>
  </body>
</html>`
}

export function renderCustomerSubject(args: RenderArgs): string {
  return `Thanks for contacting Beauty Bar Parlour - ${args.leadReference}`
}

export function renderCustomerText(args: RenderArgs): string {
  const { data, leadReference } = args
  return [
    `Hi ${data.firstName},`,
    "",
    "Thank you for your enquiry with Beauty Bar Parlour. Our team will be in touch with you shortly through your preferred contact method.",
    "",
    `Enquiry reference: ${leadReference}`,
    "",
    `For urgent assistance, WhatsApp us at ${STAFF_PHONE_DISPLAY} or call the same number.`,
    "",
    "Beauty Bar Parlour",
    "Elias Mall, #02-328, 625 Elias Road, Pasir Ris, Singapore 510625",
  ].join("\n")
}

export function renderCustomerHtml(args: RenderArgs): string {
  const { data, leadReference } = args
  const grouped = groupSelectionsByCategory(data.selectedServiceIds)
  const servicesHtml =
    grouped.length === 0
      ? ""
      : `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top:16px;border-collapse:collapse;">
          ${grouped
            .map(
              (g) => `<tr>
                <td style="padding:10px 14px;border:1px solid #ecddc1;background:#fbf7ee;color:#6b5a3a;font-size:12px;text-transform:uppercase;letter-spacing:0.1em;width:40%;vertical-align:top;">${escapeHtml(g.category.label)}</td>
                <td style="padding:10px 14px;border:1px solid #ecddc1;color:#1a1a1a;font-size:14px;vertical-align:top;">${g.services
                  .map((s) => escapeHtml(s.label))
                  .join("<br/>")}</td>
              </tr>`,
            )
            .join("")}
        </table>`

  const whatsappLink = `https://wa.me/${STAFF_WHATSAPP_NUMBER}?text=${encodeURIComponent(
    `Hi Beauty Bar Parlour, I just submitted an enquiry (reference ${leadReference}).`,
  )}`

  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>${escapeHtml(renderCustomerSubject(args))}</title>
  </head>
  <body style="margin:0;padding:0;background:#f4ede0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;color:#1a1a1a;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f4ede0;padding:24px 0;">
      <tr>
        <td align="center">
          <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;background:#ffffff;border:1px solid #ecddc1;border-radius:8px;overflow:hidden;">
            <tr>
              <td style="background:#1a1a1a;color:#ffffff;padding:28px 28px;text-align:center;">
                <p style="margin:0;font-size:11px;letter-spacing:0.24em;text-transform:uppercase;color:#c0a678;">Beauty Bar Parlour</p>
                <h1 style="margin:10px 0 0;font-size:26px;font-weight:300;letter-spacing:0.02em;">Thank you for your enquiry</h1>
              </td>
            </tr>

            <tr>
              <td style="padding:28px 28px 8px;">
                <p style="margin:0 0 14px;font-size:16px;line-height:1.6;">Hi ${escapeHtml(data.firstName)},</p>
                <p style="margin:0 0 14px;font-size:15px;line-height:1.7;color:#3a3a3a;">Your enquiry has been received by Beauty Bar Parlour. Our team will contact you shortly through your preferred contact method.</p>
                <p style="margin:0;font-size:13px;color:#6b5a3a;letter-spacing:0.06em;">Enquiry reference</p>
                <p style="margin:4px 0 0;font-size:22px;font-weight:600;color:#1a1a1a;letter-spacing:0.04em;">${escapeHtml(leadReference)}</p>
              </td>
            </tr>

            ${
              servicesHtml
                ? `<tr><td style="padding:8px 28px 8px;">
                    <p style="margin:18px 0 0;font-size:13px;color:#6b5a3a;letter-spacing:0.06em;text-transform:uppercase;">You asked about</p>
                    ${servicesHtml}
                  </td></tr>`
                : ""
            }

            <tr>
              <td style="padding:24px 28px 28px;">
                <p style="margin:0 0 12px;font-size:13px;color:#6b5a3a;letter-spacing:0.06em;text-transform:uppercase;">Need urgent help?</p>
                <p style="margin:0;font-size:14px;line-height:1.7;color:#1a1a1a;">WhatsApp us at <a href="${escapeHtml(whatsappLink)}" style="color:#1a1a1a;font-weight:600;">${escapeHtml(STAFF_PHONE_DISPLAY)}</a> or call the same number.</p>
                <div style="margin-top:18px;">
                  <a href="${escapeHtml(whatsappLink)}" style="display:inline-block;background:#25D366;color:#ffffff;text-decoration:none;padding:12px 22px;border-radius:9999px;font-size:13px;letter-spacing:0.08em;text-transform:uppercase;">Chat on WhatsApp</a>
                </div>
              </td>
            </tr>

            <tr>
              <td style="padding:20px 28px;background:#fbf7ee;border-top:1px solid #ecddc1;color:#6b5a3a;font-size:12px;line-height:1.6;">
                Beauty Bar Parlour<br />
                Elias Mall, #02-328, 625 Elias Road, Pasir Ris, Singapore 510625
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`
}
