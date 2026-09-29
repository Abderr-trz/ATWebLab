import { NextResponse } from "next/server";

export const runtime = "nodejs";

const PRODYous_URL = "https://prodyous.co/";
const cacheHeaders = {
  "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600",
};

export async function GET() {
  try {
    const response = await fetch(PRODYous_URL, {
      method: "HEAD",
      next: { revalidate: 300 },
      signal: AbortSignal.timeout(5000),
    });

    const frameOptions = response.headers.get("x-frame-options")?.toLowerCase();
    const contentSecurityPolicy = response.headers.get("content-security-policy")?.toLowerCase();
    const blockedByFrameOptions = frameOptions === "deny" || frameOptions === "sameorigin";
    const hasAllowedAncestor =
      !contentSecurityPolicy?.includes("frame-ancestors") ||
      contentSecurityPolicy.includes("https://atweblab.com") ||
      contentSecurityPolicy.includes("http://localhost:3000");

    return NextResponse.json(
      { embeddable: response.ok && !blockedByFrameOptions && hasAllowedAncestor },
      { headers: cacheHeaders },
    );
  } catch {
    return NextResponse.json(
      { embeddable: false },
      { headers: cacheHeaders },
    );
  }
}