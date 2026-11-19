export interface ContactMessage {
  name: string;
  email: string;
  subject: string;
  message: string;
}

/** "inactive": FormSubmit has not been activated for this site yet (see below). */
export type DeliveryResult = "sent" | "inactive" | "failed";

const TIMEOUT_MS = 15_000;

/**
 * ───────────────────────────── HOW MESSAGES ARE SENT ─────────────────────────────
 * Default, no key: FormSubmit (https://formsubmit.co) emails every submission straight to
 * kartikpatel06471@gmail.com. The form posts to the inbox's FormSubmit alias (below) so the address
 * itself is not in the request. FormSubmit asks for activation once per website: the first
 * submission from a new address (localhost, then the live domain) sends one "Activate Form" email
 * to the inbox; click it, and every later message is delivered directly.
 *
 * Optional: to use Web3Forms instead, create an access key at https://web3forms.com for the same
 * inbox and put it in `.env.local`, then rebuild:
 *
 *   NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY=your-access-key
 * ──────────────────────────────────────────────────────────────────────────────────
 */
/** FormSubmit alias for kartikpatel06471@gmail.com (from its activation email, 2026-11-16). */
const FORMSUBMIT_ID = "b5543e285f416dac24ba292ff7a5fcc8";

const web3formsKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY?.trim() || undefined;

const composeBody = (message: ContactMessage, signature: string) =>
  `${message.message.trim()}\n\n${signature}`;

/** Builds a mailto: URL with an encoded subject and body. */
export function buildMailto(
  to: string,
  message?: ContactMessage,
  options?: { subject: string; signature: string },
) {
  if (!message || !options) return `mailto:${to}`;
  const params = new URLSearchParams({
    subject: options.subject,
    body: composeBody(message, options.signature),
  });
  // URLSearchParams encodes spaces as "+", which mail clients show literally; use %20 instead.
  return `mailto:${to}?${params.toString().replace(/\+/g, "%20")}`;
}

interface DeliveryOptions {
  /** Subject line of the delivered email. */
  subject: string;
  /** Honeypot value: real visitors never fill it, so `true` means a bot. */
  botcheck: boolean;
}

/** Endpoint and JSON body for the configured provider. */
function request(message: ContactMessage, { subject, botcheck }: DeliveryOptions) {
  const fields = {
    name: message.name,
    email: message.email,
    subject: message.subject,
    message: message.message.trim(),
  };
  if (web3formsKey) {
    return {
      url: "https://api.web3forms.com/submit",
      body: {
        ...fields,
        access_key: web3formsKey,
        subject,
        topic: message.subject,
        from_name: message.name,
        replyto: message.email,
        botcheck,
      },
    };
  }
  return {
    url: `https://formsubmit.co/ajax/${FORMSUBMIT_ID}`,
    body: {
      ...fields,
      _subject: subject,
      _replyto: message.email,
      _template: "table",
      _captcha: "false",
      _honey: botcheck ? "bot" : "",
    },
  };
}

/**
 * Emails a contact-form message to Kartik through FormSubmit (or Web3Forms when a key is set).
 * Never throws: network errors, timeouts and rejected submissions resolve to "failed".
 */
export async function deliverContactMessage(
  message: ContactMessage,
  options: DeliveryOptions,
): Promise<DeliveryResult> {
  const { url, body } = request(message, options);
  const controller = new AbortController();
  const timer = window.setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(body),
      signal: controller.signal,
    });
    // Web3Forms answers `success: true`; FormSubmit answers `success: "true"`.
    const result = (await response.json().catch(() => null)) as {
      success?: boolean | string;
      message?: string;
    } | null;
    if (response.ok && String(result?.success) === "true") return "sent";
    // FormSubmit answers this until the inbox owner clicks "Activate Form".
    return /activat/i.test(result?.message ?? "") ? "inactive" : "failed";
  } catch {
    return "failed";
  } finally {
    window.clearTimeout(timer);
  }
}
