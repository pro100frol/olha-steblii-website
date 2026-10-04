import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";
import {
  MAX_REFERENCE_IMAGE_COUNT,
  MAX_TOTAL_BOOKING_IMAGE_BYTES,
} from "@/lib/booking-upload-limits";

function getResend() {
  const key = process.env.RESEND_API_KEY;
  if (!key) throw new Error("RESEND_API_KEY is not set");
  return new Resend(key);
}

interface ContactPayload {
  fullName: string;
  email: string;
  phone: string;
  details: Record<string, string>;
}

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const booking = formData.get("booking");
    if (typeof booking !== "string") {
      return NextResponse.json({ error: "Booking details are required" }, { status: 400 });
    }

    let body: ContactPayload;
    try {
      body = JSON.parse(booking) as ContactPayload;
    } catch {
      return NextResponse.json({ error: "Invalid booking details" }, { status: 400 });
    }

    const { fullName, email, phone, details } = body;
    const placementFiles = formData
      .getAll("placementImages")
      .filter((value): value is File => value instanceof File);
    const referenceFiles = formData
      .getAll("referenceImages")
      .filter((value): value is File => value instanceof File);
    const imageFiles = [...placementFiles, ...referenceFiles];

    if (!fullName || !email) {
      return NextResponse.json(
        { error: "fullName and email are required" },
        { status: 400 }
      );
    }

    if (placementFiles.length !== 1 || referenceFiles.length === 0 || referenceFiles.length > MAX_REFERENCE_IMAGE_COUNT) {
      return NextResponse.json({ error: "Please attach one placement photo and up to four reference photos" }, { status: 400 });
    }

    if (imageFiles.some((file) => file.type !== "image/jpeg" || file.size === 0)) {
      return NextResponse.json({ error: "Photos must be valid JPEG images" }, { status: 400 });
    }

    const totalImageBytes = imageFiles.reduce((total, file) => total + file.size, 0);
    if (totalImageBytes > MAX_TOTAL_BOOKING_IMAGE_BYTES) {
      return NextResponse.json({ error: "Photos exceed the 3 MB combined limit" }, { status: 413 });
    }

    const attachments = await Promise.all(
      imageFiles.map(async (file, index) => {
        const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_").replace(/^\.+/, "").slice(0, 100);
        const category = index < placementFiles.length ? "placement" : "reference";
        return {
          filename: `${category}-${safeName || `photo-${index + 1}.jpg`}`,
          content: Buffer.from(await file.arrayBuffer()).toString("base64"),
          contentType: "image/jpeg",
        };
      })
    );

    const detailRows = Object.entries(details)
      .map(([key, value]) => `<tr><td style="padding:4px 12px 4px 0;font-weight:600">${escapeHtml(key)}</td><td style="padding:4px 0">${escapeHtml(String(value))}</td></tr>`)
      .join("");

    const html = `
      <h2>New Booking Request</h2>
      <table>
        <tr><td style="padding:4px 12px 4px 0;font-weight:600">Name</td><td>${escapeHtml(fullName)}</td></tr>
        <tr><td style="padding:4px 12px 4px 0;font-weight:600">Email</td><td>${escapeHtml(email)}</td></tr>
        <tr><td style="padding:4px 12px 4px 0;font-weight:600">Phone</td><td>${escapeHtml(phone)}</td></tr>
        ${detailRows}
      </table>
      <h3>Uploaded Images</h3><p>${imageFiles.length} image(s) are attached to this email.</p>
    `;

    const { error } = await getResend().emails.send({
      from: "booking@olhasteblii.com",
      to: "olhasteblii@gmail.com",
      subject: `Booking Request from ${fullName}`,
      html,
      attachments,
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
