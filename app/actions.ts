"use server";

import { Resend } from "resend";
import { site } from "@/lib/content";

export type ContactState = { status: "idle" | "sent" | "error"; message: string };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function sendMessage(_prev: ContactState, formData: FormData): Promise<ContactState> {
  // Hidden field that people never fill in; bots usually do.
  if (String(formData.get("company") ?? "").trim() !== "") {
    return { status: "sent", message: "Message sent. I'll reply by email." };
  }

  const email = String(formData.get("email") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();

  if (!EMAIL_RE.test(email) || email.length > 320) {
    return { status: "error", message: "Enter a valid email address so I can reply." };
  }
  if (message.length < 10) {
    return { status: "error", message: "Add a little more detail to your message (at least 10 characters)." };
  }
  if (message.length > 5000) {
    return { status: "error", message: "Shorten your message to 5,000 characters or fewer." };
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return { status: "error", message: `The form isn't connected right now. Email me directly at ${site.email}.` };
  }

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: "Portfolio contact form <onboarding@resend.dev>",
      to: site.email,
      replyTo: email,
      subject: `Portfolio message from ${email}`,
      text: `${message}\n\nFrom: ${email}`,
    });
    if (error) throw new Error(error.message);
  } catch {
    return { status: "error", message: `The message didn't go through. Email me directly at ${site.email}.` };
  }

  return { status: "sent", message: "Message sent. I'll reply by email." };
}
