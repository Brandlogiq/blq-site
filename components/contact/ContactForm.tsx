"use client";

import { useState } from "react";

export default function ContactForm({
  submitLabel,
  namePlaceholder,
  emailPlaceholder,
  briefPlaceholder,
}: {
  submitLabel: string;
  namePlaceholder: string;
  emailPlaceholder: string;
  briefPlaceholder: string;
}) {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [message, setMessage] = useState("");

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    setStatus("sending");
    setMessage("");

    try {
      const response = await fetch("/api/contact/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          brief: data.get("brief"),
          company: data.get("company"),
        }),
      });
      const result = (await response.json()) as { error?: string };

      if (!response.ok) {
        setStatus("error");
        setMessage(result.error || "Could not send the request.");
        return;
      }

      form.reset();
      setStatus("sent");
      setMessage("Request sent. We will be in touch.");
    } catch {
      setStatus("error");
      setMessage("Could not send the request.");
    }
  };

  return (
    <form className="flex flex-col gap-8" onSubmit={onSubmit}>
      <input type="text" name="company" tabIndex={-1} autoComplete="off" className="hidden" />
      <div className="border-b border-neutral-200 dark:border-neutral-800 focus-within:border-accent transition-colors">
        <input
          type="text"
          name="name"
          required
          maxLength={200}
          placeholder={namePlaceholder}
          className="w-full bg-transparent py-4 outline-none placeholder:uppercase placeholder:tracking-widest focus:placeholder:text-accent transition-colors"
        />
      </div>
      <div className="border-b border-neutral-200 dark:border-neutral-800 focus-within:border-accent transition-colors">
        <input
          type="email"
          name="email"
          required
          maxLength={320}
          placeholder={emailPlaceholder}
          className="w-full bg-transparent py-4 outline-none placeholder:uppercase placeholder:tracking-widest focus:placeholder:text-accent transition-colors"
        />
      </div>
      <div className="border-b border-neutral-200 dark:border-neutral-800 focus-within:border-accent transition-colors">
        <textarea
          name="brief"
          required
          maxLength={5000}
          placeholder={briefPlaceholder}
          rows={1}
          className="w-full bg-transparent py-4 outline-none placeholder:uppercase placeholder:tracking-widest focus:placeholder:text-accent transition-colors resize-none"
        />
      </div>
      <button
        type="submit"
        disabled={status === "sending"}
        className="self-start mt-8 px-8 py-3 border border-current rounded-full uppercase tracking-widest hover:bg-foreground hover:text-background transition-colors disabled:opacity-50"
      >
        {status === "sending" ? "Sending" : submitLabel}
      </button>
      {message ? (
        <p className={`text-sm uppercase tracking-widest ${status === "error" ? "text-accent" : "opacity-70"}`}>
          {message}
        </p>
      ) : null}
    </form>
  );
}
