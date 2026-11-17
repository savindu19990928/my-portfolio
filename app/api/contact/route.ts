import { NextRequest } from "next/server";
import { PERSONAL_INFO } from "@/data/portfolio";

interface ContactPayload {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function sanitizeLine(value: unknown, maxLen: number): string {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, maxLen);
}

export async function POST(request: NextRequest) {
  let body: ContactPayload;
  try {
    body = (await request.json()) as ContactPayload;
  } catch {
    return Response.json(
      { ok: false, error: "Invalid request payload." },
      { status: 400 }
    );
  }

  const name = sanitizeLine(body.name, 120);
  const email = sanitizeLine(body.email, 180);
  const subject = sanitizeLine(body.subject, 200);
  const message = sanitizeLine(body.message, 4000);

  const fieldErrors: Record<string, string> = {};
  if (name.length < 2) {
    fieldErrors.name = "Please enter your name (at least 2 characters).";
  }
  if (!EMAIL_RE.test(email)) {
    fieldErrors.email = "Please enter a valid email address with an @ domain.";
  }
  if (subject.length < 3) {
    fieldErrors.subject = "Please enter a brief subject (at least 3 characters).";
  }
  if (message.length < 10) {
    fieldErrors.message = "Please enter a message (at least 10 characters).";
  }

  if (Object.keys(fieldErrors).length > 0) {
    return Response.json(
      {
        ok: false,
        error: "Please fix the highlighted fields before sending.",
        fieldErrors,
      },
      { status: 400 }
    );
  }

  const resendApiKey = process.env.RESEND_API_KEY;
  if (resendApiKey) {
    try {
      const fromAddress =
        process.env.CONTACT_FROM_EMAIL || "Portfolio Contact <onboarding@resend.dev>";
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendApiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: fromAddress,
          to: [PERSONAL_INFO.email],
          reply_to: email,
          subject: `[Portfolio Inquiry] ${subject}`,
          text: `From: ${name} <${email}>\nSubject: ${subject}\n\n${message}`,
        }),
      });

      if (!res.ok) {
        return Response.json(
          {
            ok: false,
            error:
              "The email delivery service returned an error. Please use the direct email option below.",
          },
          { status: 502 }
        );
      }

      return Response.json({
        ok: true,
        delivered: true,
        message: "Your message has been delivered to Savindu.",
      });
    } catch {
      return Response.json(
        {
          ok: false,
          error:
            "Could not reach the email delivery service. Please email Savindu directly.",
        },
        { status: 502 }
      );
    }
  }

  const webhookUrl = process.env.CONTACT_WEBHOOK_URL;
  if (webhookUrl) {
    try {
      const res = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          subject,
          message,
          submittedAt: new Date().toISOString(),
        }),
      });
      if (!res.ok) {
        return Response.json(
          {
            ok: false,
            error:
              "Message delivery failed at the configured endpoint. Please email Savindu directly.",
          },
          { status: 502 }
        );
      }
      return Response.json({
        ok: true,
        delivered: true,
        message: "Your message has been submitted to Savindu.",
      });
    } catch {
      return Response.json(
        {
          ok: false,
          error:
            "Unable to reach the configured submission endpoint. Please email Savindu directly.",
        },
        { status: 502 }
      );
    }
  }

  const mailtoParams = new URLSearchParams({
    subject,
    body: `Name: ${name}\nEmail: ${email}\n\n${message}`,
  });
  const mailtoUrl = `mailto:${PERSONAL_INFO.email}?${mailtoParams
    .toString()
    .replace(/\+/g, "%20")}`;

  return Response.json(
    {
      ok: false,
      delivered: false,
      code: "relay_not_configured",
      mailtoUrl,
      message:
        "Direct server email delivery is not configured in this environment. Your validated message is ready to send via your email app or copy directly.",
    },
    { status: 503 }
  );
}
