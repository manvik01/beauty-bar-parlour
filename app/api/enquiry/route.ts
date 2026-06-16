import { NextResponse, type NextRequest } from "next/server"
import { z } from "zod"

import { generateLeadReference } from "@/lib/enquiry/lead-reference"
import { sendEnquiryNotifications } from "@/lib/enquiry/notify"
import { enquirySchema } from "@/lib/enquiry/schema"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

export async function POST(request: NextRequest) {
  let payload: unknown
  try {
    payload = await request.json()
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid JSON body" },
      { status: 400 },
    )
  }

  const parsed = enquirySchema.safeParse(payload)
  if (!parsed.success) {
    return NextResponse.json(
      {
        ok: false,
        error: "Validation failed",
        issues: parsed.error.flatten(),
      } satisfies {
        ok: false
        error: string
        issues: z.inferFlattenedErrors<typeof enquirySchema>
      },
      { status: 400 },
    )
  }

  const data = parsed.data
  const submittedAt = new Date()
  const leadReference = generateLeadReference(submittedAt)

  const notify = await sendEnquiryNotifications({
    data,
    leadReference,
    submittedAt,
  })

  if (!notify.staff.sent) {
    console.warn("[enquiry] proceeding without staff email", {
      leadReference,
      error: notify.staff.error,
    })
  }

  return NextResponse.json(
    {
      ok: true,
      leadReference,
      notified: {
        staff: notify.staff.sent,
        customer: notify.customer.sent,
      },
    },
    { status: 200 },
  )
}
