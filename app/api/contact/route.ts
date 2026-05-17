import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";

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
  imageUrls: string[];
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as ContactPayload;
    const { fullName, email, phone, details, imageUrls } = body;

    if (!fullName || !email) {
      return NextResponse.json(
        { error: "fullName and email are required" },
        { status: 400 }
      );
    }

    const detailRows = Object.entries(details)
      .map(([key, value]) => `<tr><td style="padding:4px 12px 4px 0;font-weight:600">${escapeHtml(key)}</td><td style="padding:4px 0">${escapeHtml(String(value))}</td></tr>`)
      .join("");

    const imageLinks = imageUrls
      .map((url, i) => `<a href="${escapeHtml(url)}" target="_blank">Image ${i + 1}</a>`)
      .join(" &middot; ");

    const html = `
      <h2>New Booking Request</h2>
      <table>
        <tr><td style="padding:4px 12px 4px 0;font-weight:600">Name</td><td>${escapeHtml(fullName)}</td></tr>
        <tr><td style="padding:4px 12px 4px 0;font-weight:600">Email</td><td>${escapeHtml(email)}</td></tr>
        <tr><td style="padding:4px 12px 4px 0;font-weight:600">Phone</td><td>${escapeHtml(phone)}</td></tr>
        ${detailRows}
      </table>
      ${imageUrls.length > 0 ? `<h3>Uploaded Images</h3><p>${imageLinks}</p>` : ""}
    `;

    const { error } = await getResend().emails.send({
      from: "booking@olhasteblii.com",
      to: "olhasteblii@gmail.com",
      subject: `Booking Request from ${fullName}`,
      html,
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
