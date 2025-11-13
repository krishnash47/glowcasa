// app/api/contact/route.js
import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const ALLOWED = {
  general: "General Inquiry",
  quote: "Request Quote",
  support: "Technical Support",
  partnership: "Partnership",
};

const validate = (b) => {
  if (!b) return "invalid body";
  const { firstName, lastName, email, message, inquiryType } = b;

  if (!firstName || !lastName || !email || !message)
    return "firstName, lastName, email and message are required";

  if (!/^\S+@\S+\.\S+$/.test(email)) return "invalid email";

  const key = typeof inquiryType === "string" ? inquiryType.toLowerCase() : "";
  if (!(key in ALLOWED || Object.values(ALLOWED).includes(inquiryType))) {
    return `inquiryType must be one of: ${Object.values(ALLOWED).join(", ")}`;
  }

  return null;
};

function escapeHtml(str = "") {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export async function POST(req) {
  try {
    const body = await req.json();
    const error = validate(body);
    if (error) return NextResponse.json({ error }, { status: 400 });

    const {
      firstName,
      lastName,
      email,
      inquiryType = "general",
      message,
    } = body;

    const itKey =
      typeof inquiryType === "string" ? inquiryType.toLowerCase() : "general";
    const inquiryLabel = ALLOWED[itKey] || inquiryType || "General Inquiry";

    const subject = `New Inquiry (${inquiryLabel}) — ${firstName} ${lastName}`;
    const html = `
      <h2>Contact Form Submission</h2>
      <p><strong>Name:</strong> ${escapeHtml(firstName)} ${escapeHtml(lastName)}</p>
      <p><strong>Email:</strong> ${escapeHtml(email)}</p>
      <p><strong>Inquiry Type:</strong> ${escapeHtml(inquiryLabel)}</p>
      <hr/>
      <div>${escapeHtml(message).replace(/\n/g, "<br/>")}</div>
    `;

    const sendRes = await resend.emails.send({
      from: process.env.FROM_EMAIL,
      to: process.env.TO_EMAIL,
      subject,
      html,
    });
 const looksLikeSuccess =
      sendRes &&
      (Boolean(sendRes.id) ||
        Boolean(sendRes.messageId) ||
        sendRes.status === "queued" ||
        sendRes.status === "sent");

    if (looksLikeSuccess) {
      return NextResponse.json({ ok: true }, { status: 200 });
    } else {
      // Log the full response for debugging on the server
      console.error("Resend returned unexpected response:", sendRes);
      return NextResponse.json(
        { error: "failed to send email" },
        { status: 502 }
      );
    }
  } catch (err) {
    console.error("Resend error:", err);
    return NextResponse.json(
      { error: "internal server error" },
      { status: 500 }
    );
  }
}
