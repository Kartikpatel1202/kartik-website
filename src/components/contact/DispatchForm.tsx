"use client";

import { useId, useRef, useState, type FormEvent, type ReactNode } from "react";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { homeCopy } from "@/content/home";
import { buildMailto, deliverContactMessage, type DeliveryResult } from "@/lib/contact";
import { cn } from "@/lib/utils";

const copy = homeCopy.contact;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Field = "firstName" | "lastName" | "email" | "subject" | "message";
type Values = Record<Field, string>;
type ErrorKey = Exclude<Field, "lastName">;
type Errors = Partial<Record<ErrorKey, string>>;
type Status = "idle" | "invalid" | "sending" | DeliveryResult;

const ORDER: ErrorKey[] = ["firstName", "email", "subject", "message"];
const EMPTY: Values = { firstName: "", lastName: "", email: "", subject: "", message: "" };

function validate(v: Values): Errors {
  const errors: Errors = {};
  if (!v.firstName.trim()) errors.firstName = copy.errors.firstName;
  if (!EMAIL_PATTERN.test(v.email.trim())) errors.email = copy.errors.email;
  if (!v.subject.trim()) errors.subject = copy.errors.subject;
  if (v.message.trim().length < copy.minMessage) errors.message = copy.errors.message;
  return errors;
}

/** JSON-ish string literal for the live payload, with a placeholder while empty. */
const literal = (value: string, placeholder: string) =>
  value.trim() ? `"${value.trim().replace(/\s+/g, " ")}"` : `{${placeholder}}`;

/** Header badge of the payload terminal, per delivery state. */
const BADGES: Record<Status, { text: string; tone: string }> = {
  idle: { text: copy.badge.live, tone: "text-success" },
  invalid: { text: copy.badge.live, tone: "text-success" },
  sending: { text: copy.badge.sending, tone: "text-pending" },
  sent: { text: copy.badge.delivered, tone: "text-success" },
  failed: { text: copy.badge.failed, tone: "text-warn" },
  inactive: { text: copy.badge.failed, tone: "text-warn" },
};

interface DispatchFormProps {
  /** Inbox the message goes to; also the mailto fallback when delivery fails. */
  to: string;
  /** Rendered under the payload terminal (direct contact details). */
  children?: ReactNode;
}

/**
 * "Live dispatch" contact: a transmission form whose payload streams into a terminal panel as you
 * type, then emailed straight to Kartik (FormSubmit, or Web3Forms with a key: see
 * src/lib/contact.ts). Inline validation (after a field is left, then live); on submit, focus moves to the first problem. While sending, the fields are
 * disabled and the badge turns amber; on success the form resets and a confirmation shows; on
 * failure an inline error offers a mailto: link with the message already composed.
 */
export function DispatchForm({ to, children }: DispatchFormProps) {
  const id = useId();
  const formRef = useRef<HTMLFormElement>(null);
  const [values, setValues] = useState<Values>(EMPTY);
  const [botcheck, setBotcheck] = useState(false);
  const [touched, setTouched] = useState<Partial<Record<ErrorKey, boolean>>>({});
  const [submitted, setSubmitted] = useState(false);
  const [status, setStatus] = useState<Status>("idle");

  const errors = validate(values);
  const shown = (key: ErrorKey) => (touched[key] || submitted ? errors[key] : undefined);
  const sending = status === "sending";
  const name = [values.firstName, values.lastName]
    .map((s) => s.trim())
    .filter(Boolean)
    .join(" ");
  const message = {
    name,
    email: values.email.trim(),
    subject: values.subject.trim(),
    message: values.message,
  };
  const mailOptions = {
    subject: copy.emailSubject(message.subject, name),
    signature: copy.signature(name, message.email),
  };

  const set = (key: Field, value: string) => {
    setValues((v) => ({ ...v, [key]: value }));
    if (status !== "idle" && status !== "invalid") setStatus("idle");
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (sending) return;
    setSubmitted(true);
    const first = ORDER.find((key) => errors[key]);
    if (first) {
      setStatus("invalid");
      formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }
    setStatus("sending");
    const result = await deliverContactMessage(message, {
      subject: mailOptions.subject,
      botcheck,
    });
    if (result === "sent") {
      setValues(EMPTY);
      setTouched({});
      setSubmitted(false);
    }
    setStatus(result);
  };

  const inputClass = (error?: string) =>
    cn(
      "w-full rounded-xl border bg-bg-0/70 px-4 py-3 text-text-primary transition-colors duration-150 placeholder:text-text-muted focus:border-text-muted disabled:opacity-60",
      error ? "border-warn" : "border-border-strong hover:border-text-muted",
    );
  const field = (key: Field, error?: string) => ({
    id: `${id}-${key}`,
    name: key,
    value: values[key],
    onChange: (e: { target: { value: string } }) => set(key, e.target.value),
    onBlur: () => key !== "lastName" && setTouched((t) => ({ ...t, [key]: true })),
    "aria-invalid": error ? true : undefined,
    "aria-describedby": error ? `${id}-${key}-error` : undefined,
    className: inputClass(error),
  });
  const label = (key: Field, text: string) => (
    <label htmlFor={`${id}-${key}`} className="text-small font-medium text-text-secondary">
      {text}
    </label>
  );
  const errorText = (key: ErrorKey) => {
    const error = shown(key);
    return error ? (
      <p id={`${id}-${key}-error`} className="text-small text-warn">
        {error}
      </p>
    ) : null;
  };

  const badge = BADGES[status];
  const tone = (value: string) => (value.trim() ? "text-text-primary" : "text-text-muted");

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="order-2 flex min-w-0 flex-col gap-6 lg:order-1">
        {/* Live payload: mirrors the form as you type. Decorative duplicate of the inputs. */}
        <div
          aria-hidden
          className="overflow-hidden rounded-2xl border border-border-strong bg-bg-0/90 font-mono text-[0.8125rem] shadow-2"
        >
          <div className="flex items-center gap-3 border-b border-border px-4 py-3">
            <span className="flex gap-1.5">
              <span className="size-2.5 rounded-full bg-border-strong" />
              <span className="size-2.5 rounded-full bg-border-strong" />
              <span className="size-2.5 rounded-full bg-border-strong" />
            </span>
            <span className="text-[0.75rem] text-text-muted">{copy.terminalTitle}</span>
            <span
              data-status={status}
              className={cn(
                "ml-auto flex items-center gap-2 text-[0.6875rem] tracking-[0.14em] uppercase transition-colors duration-300",
                badge.tone,
              )}
            >
              <span
                className={cn("size-1.5 rounded-full bg-current", sending && "animate-pulse")}
              />
              {badge.text}
            </span>
          </div>
          <pre className="overflow-x-auto p-5 leading-7 whitespace-pre-wrap text-text-secondary">
            <span className="text-text-muted">{"{"}</span>
            {"\n  "}
            <span className="text-accent-2">sender</span>
            {":  "}
            <span className={tone(name)}>{literal(name, copy.awaiting.name)}</span>
            {",\n  "}
            <span className="text-accent-2">email</span>
            {":   "}
            <span className={tone(values.email)}>{literal(values.email, copy.awaiting.email)}</span>
            {",\n  "}
            <span className="text-accent-2">subject</span>
            {": "}
            <span className={tone(values.subject)}>
              {literal(values.subject, copy.awaiting.subject)}
            </span>
            {",\n  "}
            <span className="text-accent-2">message</span>
            {": "}
            <span className={tone(values.message)}>
              {literal(values.message, copy.awaiting.message)}
            </span>
            {"\n"}
            <span className="text-text-muted">{"}"}</span>
            <span className="ml-1 inline-block h-4 w-2 translate-y-0.5 caret-blink bg-text-primary/70" />
          </pre>
        </div>
        {children}
      </div>

      <form
        ref={formRef}
        noValidate
        onSubmit={onSubmit}
        aria-busy={sending || undefined}
        className="order-1 min-w-0 lg:order-2"
      >
        <fieldset disabled={sending} className="flex min-w-0 flex-col gap-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-2">
              {label("firstName", copy.fields.firstName)}
              <input
                type="text"
                autoComplete="given-name"
                required
                {...field("firstName", shown("firstName"))}
              />
              {errorText("firstName")}
            </div>
            <div className="flex flex-col gap-2">
              {label("lastName", copy.fields.lastName)}
              <input type="text" autoComplete="family-name" {...field("lastName")} />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            {label("email", copy.fields.email)}
            <input
              type="email"
              autoComplete="email"
              inputMode="email"
              required
              {...field("email", shown("email"))}
            />
            {errorText("email")}
          </div>
          <div className="flex flex-col gap-2">
            {label("subject", copy.fields.subject)}
            <input type="text" required maxLength={120} {...field("subject", shown("subject"))} />
            {errorText("subject")}
          </div>
          <div className="flex flex-col gap-2">
            {label("message", copy.fields.message)}
            <textarea rows={5} required {...field("message", shown("message"))} />
            {errorText("message")}
          </div>
          {/* Honeypot for bots (Web3Forms "botcheck"): hidden from people and assistive tech. */}
          <input
            type="checkbox"
            name="botcheck"
            tabIndex={-1}
            aria-hidden
            checked={botcheck}
            onChange={(e) => setBotcheck(e.target.checked)}
            className="hidden"
          />
          <div className="pt-1">
            <Button type="submit" leadingIcon="send" className={cn(sending && "cursor-progress")}>
              {sending ? copy.sending : copy.submit}
            </Button>
          </div>
        </fieldset>

        {/* One polite live region for every outcome; empty while idle. */}
        <div aria-live="polite" className="mt-4">
          {status === "invalid" && <p className="text-small text-warn">{copy.errorSummary}</p>}
          {status === "sent" && (
            <p className="flex items-center gap-3 rounded-xl border border-success/30 bg-success/[0.06] px-4 py-3 text-small text-text-primary">
              <span className="grid size-6 shrink-0 place-items-center rounded-full bg-success/15 text-success">
                <Icon name="check" size={14} />
              </span>
              {copy.sent}
            </p>
          )}
          {(status === "failed" || status === "inactive") && (
            <p className="rounded-xl border border-warn/30 bg-warn/[0.06] px-4 py-3 text-small text-warn">
              {status === "inactive" ? copy.inactive : copy.failed}{" "}
              <a
                href={buildMailto(to, message, mailOptions)}
                className="link-draw font-medium text-text-primary"
              >
                {to}
              </a>
            </p>
          )}
        </div>
      </form>
    </div>
  );
}
