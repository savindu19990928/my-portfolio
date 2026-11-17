"use client";

import Image from "next/image";
import { useRef, useState, type FormEvent } from "react";
import { PERSONAL_INFO } from "@/data/portfolio";

interface FieldErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

type SubmitState =
  | { kind: "idle" }
  | { kind: "submitting" }
  | { kind: "delivered"; message: string }
  | { kind: "handoff"; message: string; mailtoUrl: string; formattedBody: string }
  | { kind: "error"; message: string };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function ContactSection() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [submitState, setSubmitState] = useState<SubmitState>({ kind: "idle" });
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedDraft, setCopiedDraft] = useState(false);

  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const subjectRef = useRef<HTMLInputElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);

  const validate = (): FieldErrors => {
    const next: FieldErrors = {};
    if (name.trim().length < 2) {
      next.name = "Write your full name (at least 2 characters).";
    }
    if (!EMAIL_RE.test(email.trim())) {
      next.email = "Write a valid email address with an @ domain.";
    }
    if (subject.trim().length < 3) {
      next.subject = "Write a subject (at least 3 characters).";
    }
    if (message.trim().length < 10) {
      next.message = "Write a message of at least 10 characters.";
    }
    return next;
  };

  const focusFirstInvalid = (fieldErrors: FieldErrors) => {
    if (fieldErrors.name) nameRef.current?.focus();
    else if (fieldErrors.email) emailRef.current?.focus();
    else if (fieldErrors.subject) subjectRef.current?.focus();
    else if (fieldErrors.message) messageRef.current?.focus();
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const clientErrors = validate();
    if (Object.keys(clientErrors).length > 0) {
      setErrors(clientErrors);
      setSubmitState({
        kind: "error",
        message: `Please correct ${Object.keys(clientErrors).length} highlighted field${
          Object.keys(clientErrors).length > 1 ? "s" : ""
        }.`,
      });
      focusFirstInvalid(clientErrors);
      return;
    }

    setErrors({});
    setSubmitState({ kind: "submitting" });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          subject: subject.trim(),
          message: message.trim(),
        }),
      });

      const data = (await response.json()) as {
        ok?: boolean;
        delivered?: boolean;
        code?: string;
        mailtoUrl?: string;
        message?: string;
        error?: string;
        fieldErrors?: FieldErrors;
      };

      if (response.status === 400 && data.fieldErrors) {
        setErrors(data.fieldErrors);
        setSubmitState({
          kind: "error",
          message: data.error ?? "Please correct the highlighted fields.",
        });
        focusFirstInvalid(data.fieldErrors);
        return;
      }

      if (response.ok && data.delivered) {
        setSubmitState({
          kind: "delivered",
          message: data.message ?? "Your message has been delivered.",
        });
        setName("");
        setEmail("");
        setSubject("");
        setMessage("");
        return;
      }

      if (data.code === "relay_not_configured" && data.mailtoUrl) {
        setSubmitState({
          kind: "handoff",
          message:
            data.message ??
            "Direct mail relay is not configured on this server yet. Send your validated message using your email client or copy it below.",
          mailtoUrl: data.mailtoUrl,
          formattedBody: `To: ${PERSONAL_INFO.email}\nSubject: ${subject.trim()}\nFrom: ${name.trim()} (${email.trim()})\n\n${message.trim()}`,
        });
        return;
      }

      setSubmitState({
        kind: "error",
        message:
          data.error ??
          "Could not send the message through the server. Please reach out directly via email or phone.",
      });
    } catch {
      setSubmitState({
        kind: "error",
        message:
          "Network error while submitting. You can email savindushiranjaya@gmail.com directly.",
      });
    }
  };

  const copyEmailAddress = async () => {
    try {
      await navigator.clipboard.writeText(PERSONAL_INFO.email);
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } catch {
      // Clipboard API unavailable
    }
  };

  const copyDraft = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedDraft(true);
      setTimeout(() => setCopiedDraft(false), 2000);
    } catch {
      // Clipboard API unavailable
    }
  };

  return (
    <section
      id="contact"
      className="bg-[var(--bg-surface)] py-20 sm:py-24"
    >
      <div className="mx-auto w-full max-w-[1280px] px-5 sm:px-8 lg:px-10">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-12">
          {/* Left: Direct Contact Channels */}
          <div className="lg:col-span-5">
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.14em] text-[var(--accent-emerald-ink)]">
              Get In Touch
            </p>
            <h2 className="mt-2.5 text-balance text-3xl font-bold tracking-[-0.025em] text-[var(--text-primary)] sm:text-4xl">
              Have a Project in Mind? Let&apos;s Build Something Great.
            </h2>
            <p className="mt-4 max-w-[50ch] text-base leading-relaxed text-[var(--text-secondary)]">
              Open to international software engineering roles, backend architecture consulting, and freelance web development engagements.
            </p>

            <div className="mt-8 space-y-3.5">
              {/* Email Row */}
              <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-canvas)] p-4">
                <div className="min-w-0">
                  <p className="font-mono text-xs uppercase tracking-wider text-[var(--text-muted)]">
                    Email
                  </p>
                  <a
                    href={`mailto:${PERSONAL_INFO.email}`}
                    className="mt-1 block truncate text-base font-semibold text-[var(--text-primary)] hover:text-[var(--accent-emerald-ink)]"
                  >
                    {PERSONAL_INFO.email}
                  </a>
                </div>
                <button
                  type="button"
                  onClick={copyEmailAddress}
                  aria-label="Copy email address"
                  className="inline-flex min-h-[40px] shrink-0 items-center rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] px-3.5 py-2 font-mono text-xs font-semibold text-[var(--text-primary)] transition-colors hover:border-[var(--accent-emerald)]"
                >
                  {copiedEmail ? "Copied" : "Copy"}
                </button>
              </div>

              {/* Phone Row */}
              <a
                href={PERSONAL_INFO.phoneHref}
                className="flex items-center justify-between gap-3 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-canvas)] p-4 transition-colors hover:border-[var(--border-strong)]"
              >
                <div>
                  <p className="font-mono text-xs uppercase tracking-wider text-[var(--text-muted)]">
                    Phone
                  </p>
                  <p className="mt-1 text-base font-semibold text-[var(--text-primary)]">
                    {PERSONAL_INFO.phone}
                  </p>
                </div>
                <span className="font-mono text-xs font-semibold text-[var(--accent-emerald-ink)]">
                  Call
                </span>
              </a>

              {/* Social Links */}
              <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
                <a
                  href={PERSONAL_INFO.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex min-h-[56px] items-center gap-3 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-canvas)] p-4 transition-colors hover:border-[var(--border-strong)]"
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-black/10 bg-[var(--bg-tile-icon)] p-1.5">
                    <Image
                      src="/icons/linkedin.svg"
                      alt=""
                      width={20}
                      height={20}
                      unoptimized
                      className="h-5 w-5"
                    />
                  </span>
                  <div className="min-w-0">
                    <p className="text-sm font-bold text-[var(--text-primary)]">LinkedIn</p>
                    <p className="truncate font-mono text-xs text-[var(--text-secondary)]">
                      Connect
                    </p>
                  </div>
                </a>

                <a
                  href={PERSONAL_INFO.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex min-h-[56px] items-center gap-3 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-canvas)] p-4 transition-colors hover:border-[var(--border-strong)]"
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-black/10 bg-[var(--bg-tile-icon)] p-1.5">
                    <Image
                      src="/icons/github.svg"
                      alt=""
                      width={20}
                      height={20}
                      unoptimized
                      className="h-5 w-5"
                    />
                  </span>
                  <div className="min-w-0">
                    <p className="text-sm font-bold text-[var(--text-primary)]">GitHub</p>
                    <p className="truncate font-mono text-xs text-[var(--text-secondary)]">
                      savindu19990928
                    </p>
                  </div>
                </a>
              </div>
            </div>
          </div>

          {/* Right: Validated Contact Form */}
          <div className="lg:col-span-7">
            <form
              noValidate
              onSubmit={handleSubmit}
              className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-canvas)] p-6 shadow-[var(--shadow-card)] sm:p-8"
            >
              <h3 className="text-xl font-bold text-[var(--text-primary)]">
                Send a Message
              </h3>
              <p className="mt-1.5 text-sm text-[var(--text-secondary)]">
                All fields are validated before submission.
              </p>

              <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="contact-name"
                    className="block text-sm font-semibold text-[var(--text-primary)]"
                  >
                    Name
                  </label>
                  <input
                    ref={nameRef}
                    id="contact-name"
                    name="name"
                    type="text"
                    required
                    autoComplete="name"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }));
                    }}
                    aria-invalid={Boolean(errors.name)}
                    aria-describedby={errors.name ? "contact-name-error" : undefined}
                    className="mt-2 block h-12 w-full rounded-xl border border-[var(--border-strong)] bg-[var(--bg-surface)] px-4 text-base text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:border-[var(--accent-emerald)]"
                    placeholder="Your name"
                  />
                  {errors.name ? (
                    <p
                      id="contact-name-error"
                      className="mt-1.5 text-sm font-medium text-[var(--accent-coral-ink)]"
                    >
                      {errors.name}
                    </p>
                  ) : null}
                </div>

                <div>
                  <label
                    htmlFor="contact-email"
                    className="block text-sm font-semibold text-[var(--text-primary)]"
                  >
                    Email
                  </label>
                  <input
                    ref={emailRef}
                    id="contact-email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
                    }}
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={errors.email ? "contact-email-error" : undefined}
                    className="mt-2 block h-12 w-full rounded-xl border border-[var(--border-strong)] bg-[var(--bg-surface)] px-4 text-base text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:border-[var(--accent-emerald)]"
                    placeholder="you@company.com"
                  />
                  {errors.email ? (
                    <p
                      id="contact-email-error"
                      className="mt-1.5 text-sm font-medium text-[var(--accent-coral-ink)]"
                    >
                      {errors.email}
                    </p>
                  ) : null}
                </div>
              </div>

              <div className="mt-5">
                <label
                  htmlFor="contact-subject"
                  className="block text-sm font-semibold text-[var(--text-primary)]"
                >
                  Subject
                </label>
                <input
                  ref={subjectRef}
                  id="contact-subject"
                  name="subject"
                  type="text"
                  required
                  value={subject}
                  onChange={(e) => {
                    setSubject(e.target.value);
                    if (errors.subject) setErrors((prev) => ({ ...prev, subject: undefined }));
                  }}
                  aria-invalid={Boolean(errors.subject)}
                  aria-describedby={errors.subject ? "contact-subject-error" : undefined}
                  className="mt-2 block h-12 w-full rounded-xl border border-[var(--border-strong)] bg-[var(--bg-surface)] px-4 text-base text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:border-[var(--accent-emerald)]"
                  placeholder="Backend Engineering Role / Project Inquiry"
                />
                {errors.subject ? (
                  <p
                    id="contact-subject-error"
                    className="mt-1.5 text-sm font-medium text-[var(--accent-coral-ink)]"
                  >
                    {errors.subject}
                  </p>
                ) : null}
              </div>

              <div className="mt-5">
                <label
                  htmlFor="contact-message"
                  className="block text-sm font-semibold text-[var(--text-primary)]"
                >
                  Message
                </label>
                <textarea
                  ref={messageRef}
                  id="contact-message"
                  name="message"
                  rows={5}
                  required
                  value={message}
                  onChange={(e) => {
                    setMessage(e.target.value);
                    if (errors.message) setErrors((prev) => ({ ...prev, message: undefined }));
                  }}
                  aria-invalid={Boolean(errors.message)}
                  aria-describedby={errors.message ? "contact-message-error" : undefined}
                  className="mt-2 block w-full rounded-xl border border-[var(--border-strong)] bg-[var(--bg-surface)] px-4 py-3 text-base text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:border-[var(--accent-emerald)]"
                  placeholder="Share details about the opportunity, project scope, or timeline..."
                />
                {errors.message ? (
                  <p
                    id="contact-message-error"
                    className="mt-1.5 text-sm font-medium text-[var(--accent-coral-ink)]"
                  >
                    {errors.message}
                  </p>
                ) : null}
              </div>

              <div className="mt-6 flex flex-wrap items-center gap-4">
                <button
                  type="submit"
                  disabled={submitState.kind === "submitting"}
                  className="inline-flex h-12 min-w-[168px] items-center justify-center rounded-xl bg-[var(--accent-emerald)] px-6 text-[15px] font-semibold text-[var(--accent-emerald-on-fill)] transition-all hover:brightness-105 disabled:opacity-70"
                >
                  {submitState.kind === "submitting" ? "Sending..." : "Send Message"}
                </button>
              </div>

              {/* Accessible Live Status Region */}
              <div role="status" aria-live="polite" className="mt-4">
                {submitState.kind === "delivered" ? (
                  <div className="rounded-xl border border-[var(--accent-emerald-border)] bg-[var(--accent-emerald-soft)] p-4 text-sm font-medium text-[var(--accent-emerald-ink)]">
                    {submitState.message}
                  </div>
                ) : null}

                {submitState.kind === "error" ? (
                  <div className="rounded-xl border border-[var(--accent-coral-border)] bg-[var(--accent-coral-soft)] p-4 text-sm font-medium text-[var(--accent-coral-ink)]">
                    {submitState.message}
                  </div>
                ) : null}

                {submitState.kind === "handoff" ? (
                  <div className="space-y-3 rounded-xl border border-[var(--accent-gold-border)] bg-[var(--accent-gold-soft)] p-4">
                    <p className="text-sm font-medium text-[var(--text-primary)]">
                      {submitState.message}
                    </p>
                    <div className="flex flex-wrap gap-2.5">
                      <a
                        href={submitState.mailtoUrl}
                        className="inline-flex min-h-[40px] items-center justify-center rounded-xl bg-[var(--accent-emerald)] px-4 py-2 text-sm font-semibold text-[var(--accent-emerald-on-fill)]"
                      >
                        Open Email Draft
                      </a>
                      <button
                        type="button"
                        onClick={() => copyDraft(submitState.formattedBody)}
                        className="inline-flex min-h-[40px] items-center justify-center rounded-xl border border-[var(--border-strong)] bg-[var(--bg-surface)] px-4 py-2 text-sm font-semibold text-[var(--text-primary)]"
                      >
                        {copiedDraft ? "Message Copied" : "Copy Formatted Inquiry"}
                      </button>
                    </div>
                  </div>
                ) : null}
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
