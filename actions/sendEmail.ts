"use server";

import { Resend } from "resend";
import { validateString, getErrorMessage } from "@/lib/utils";
import { siteLinks } from "@/lib/data";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const sendEmail = async (formData: FormData) => {
  const senderEmail = formData.get("senderEmail");
  const message = formData.get("message");

  // simple server-side validation
  if (!validateString(senderEmail, 500) || !EMAIL_RE.test(senderEmail)) {
    return { error: "Enter a valid email address so I can reply." };
  }
  if (!validateString(message, 5000)) {
    return { error: "Add a message (up to 5,000 characters)." };
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return {
      error: `The form isn't connected right now. Email me at ${siteLinks.email}.`,
    };
  }

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: "Contact Form <onboarding@resend.dev>",
      to: siteLinks.email,
      subject: "Message from contact form",
      replyTo: senderEmail,
      text: `${message}\n\nSender's email: ${senderEmail}`,
    });
    if (error) throw new Error(error.message);
  } catch (error: unknown) {
    return { error: getErrorMessage(error) };
  }

  return { error: null };
};
