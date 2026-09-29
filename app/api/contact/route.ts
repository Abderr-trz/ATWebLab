import { NextResponse } from "next/server";
import { z } from "zod";

export const runtime = "nodejs";

const recipient = "worldaround65@gmail.com";
const MAX_BODY_BYTES = 16_384;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 5;

type RateLimitEntry = { count: number; resetAt: number };

const globalRateLimit = globalThis as typeof globalThis & {
  contactRateLimit?: Map<string, RateLimitEntry>;
};
const rateLimitStore = globalRateLimit.contactRateLimit ?? new Map<string, RateLimitEntry>();
globalRateLimit.contactRateLimit = rateLimitStore;

const contactSchema = z.object({
  name: z.string().trim().min(2).max(80),
  company: z.string().trim().max(120).optional().default(""),
  phone: z.string().trim().min(6).max(30),
  email: z.string().trim().email().max(160),
  project: z.enum(["Site vitrine", "Site web sur mesure", "Boutique Shopify", "Refonte", "Autre"]),
  budget: z.enum(["Moins de 1 500 DH", "1 500 – 3 000 DH", "3 000 – 5 000 DH", "5 000+ DH", "À discuter"]),
  message: z.string().trim().min(10).max(3000),
  website: z.string().max(200).optional().default(""),
});

const validationMessages: Record<string, string> = {
  name: "Le nom doit contenir au moins 2 caractères.",
  company: "Le nom de l’entreprise est trop long.",
  phone: "Le numéro de téléphone doit contenir entre 6 et 30 caractères.",
  email: "Veuillez saisir une adresse e-mail valide.",
  project: "Veuillez sélectionner un type de projet.",
  budget: "Veuillez sélectionner un budget.",
  message: "Le message doit contenir au moins 10 caractères.",
};

const noStoreHeaders = { "Cache-Control": "no-store, max-age=0" };

function json(body: object, status = 200, headers: HeadersInit = {}) {
  return NextResponse.json(body, {
    status,
    headers: { ...noStoreHeaders, ...headers },
  });
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function getClientIp(request: Request) {
  return (
    request.headers.get("x-vercel-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown"
  );
}

function checkRateLimit(key: string) {
  const now = Date.now();
  const existing = rateLimitStore.get(key);

  if (!existing || existing.resetAt <= now) {
    rateLimitStore.set(key, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return { limited: false, retryAfter: 0 };
  }

  if (existing.count >= RATE_LIMIT_MAX_REQUESTS) {
    return {
      limited: true,
      retryAfter: Math.max(1, Math.ceil((existing.resetAt - now) / 1000)),
    };
  }

  existing.count += 1;
  return { limited: false, retryAfter: 0 };
}

function isSameOrigin(request: Request) {
  const origin = request.headers.get("origin");
  const host = request.headers.get("host");

  if (!origin || !host) return false;

  try {
    return new URL(origin).host === host.split(",")[0]?.trim();
  } catch {
    return false;
  }
}

export async function POST(request: Request) {
  if (!isSameOrigin(request)) {
    return json({ error: "Requête non autorisée." }, 403);
  }

  const contentType = request.headers.get("content-type")?.toLowerCase() || "";
  if (!contentType.startsWith("application/json")) {
    return json({ error: "Format de requête non pris en charge." }, 415);
  }

  const declaredLength = Number(request.headers.get("content-length") || 0);
  if (Number.isFinite(declaredLength) && declaredLength > MAX_BODY_BYTES) {
    return json({ error: "Requête trop volumineuse." }, 413);
  }

  const rateLimit = checkRateLimit(getClientIp(request));
  if (rateLimit.limited) {
    return json(
      { error: "Trop de demandes. Veuillez réessayer dans quelques minutes." },
      429,
      { "Retry-After": String(rateLimit.retryAfter) },
    );
  }

  try {
    const rawBody = await request.text();
    if (new TextEncoder().encode(rawBody).byteLength > MAX_BODY_BYTES) {
      return json({ error: "Requête trop volumineuse." }, 413);
    }

    let payload: unknown;
    try {
      payload = JSON.parse(rawBody);
    } catch {
      return json({ error: "Corps de requête invalide." }, 400);
    }

    const parsed = contactSchema.safeParse(payload);
    if (!parsed.success) {
      const field = String(parsed.error.issues[0]?.path[0] || "");
      return json(
        { error: validationMessages[field] || "Veuillez vérifier les informations saisies." },
        400,
      );
    }

    const data = parsed.data;
    if (data.website) {
      return json({ success: true });
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.error("RESEND_API_KEY is not configured");
      return json({ error: "Service momentanément indisponible." }, 503);
    }

    const safeSubjectName = data.name.replace(/[\r\n\t]+/g, " ").slice(0, 80);
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: process.env.CONTACT_FROM_EMAIL || "AT WebLab <onboarding@resend.dev>",
        to: [recipient],
        reply_to: data.email,
        subject: `Nouvelle demande ${data.project} — ${safeSubjectName}`,
        html: `
          <div style="font-family:Arial,sans-serif;max-width:640px;margin:auto;color:#161719">
            <h1 style="font-size:24px">Nouvelle demande AT WebLab</h1>
            <table style="width:100%;border-collapse:collapse">
              <tr><td style="padding:10px 0;color:#666">Nom</td><td>${escapeHtml(data.name)}</td></tr>
              <tr><td style="padding:10px 0;color:#666">Entreprise</td><td>${escapeHtml(data.company || "Non renseignée")}</td></tr>
              <tr><td style="padding:10px 0;color:#666">Téléphone</td><td>${escapeHtml(data.phone)}</td></tr>
              <tr><td style="padding:10px 0;color:#666">Email</td><td>${escapeHtml(data.email)}</td></tr>
              <tr><td style="padding:10px 0;color:#666">Projet</td><td>${escapeHtml(data.project)}</td></tr>
              <tr><td style="padding:10px 0;color:#666">Budget</td><td>${escapeHtml(data.budget)}</td></tr>
            </table>
            <h2 style="font-size:16px;margin-top:28px">Message</h2>
            <p style="line-height:1.6;white-space:pre-wrap">${escapeHtml(data.message)}</p>
          </div>`,
      }),
      signal: AbortSignal.timeout(10_000),
    });

    if (!response.ok) {
      console.error("Resend request failed with status", response.status);
      return json({ error: "L’envoi a échoué. Réessayez ou contactez-nous sur WhatsApp." }, 502);
    }

    return json({ success: true });
  } catch (error) {
    console.error("Contact form request failed", error instanceof Error ? error.name : "UnknownError");
    return json({ error: "Une erreur est survenue. Réessayez dans quelques instants." }, 500);
  }
}