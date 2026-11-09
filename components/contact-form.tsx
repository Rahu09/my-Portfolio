"use client";

import { useActionState } from "react";
import { sendMessage, type ContactState } from "@/app/actions";

const initial: ContactState = { status: "idle", message: "" };

const field =
  "w-full rounded-md border border-rule bg-surface px-3.5 py-2.5 text-ink placeholder:text-muted/70 focus:border-ink focus:outline-none";

export default function ContactForm() {
  const [state, action, pending] = useActionState(sendMessage, initial);

  return (
    <form action={action} className="grid gap-4" noValidate={false}>
      <div className="grid gap-1.5">
        <label htmlFor="email" className="text-sm font-medium">Your email</label>
        <input id="email" name="email" type="email" required maxLength={320} autoComplete="email" className={field} />
      </div>
      <div className="grid gap-1.5">
        <label htmlFor="message" className="text-sm font-medium">Message</label>
        <textarea id="message" name="message" required minLength={10} maxLength={5000} rows={6} className={`${field} resize-y`} />
      </div>
      <div className="hidden" aria-hidden="true">
        <label htmlFor="company">Company</label>
        <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>
      <div className="flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={pending}
          className="rounded-md bg-ink px-5 py-2.5 font-medium text-paper hover:opacity-90 disabled:opacity-60"
        >
          {pending ? "Sending…" : "Send message"}
        </button>
        <p
          role="status"
          aria-live="polite"
          className={`m-0 text-sm ${state.status === "error" ? "text-del-ink" : "text-muted"}`}
        >
          {state.message}
        </p>
      </div>
    </form>
  );
}
