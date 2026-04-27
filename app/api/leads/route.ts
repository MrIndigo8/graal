import { NextResponse } from "next/server";
import { processLead } from "@/lib/leads";
import { isRateLimited } from "@/lib/rate-limit";
import { leadSchema } from "@/lib/validation";

export const runtime = "nodejs";

function getClientKey(request: Request) {
  const forwardedFor = request.headers.get("x-forwarded-for");
  return forwardedFor?.split(",")[0]?.trim() || "unknown";
}

export async function POST(request: Request) {
  const clientKey = getClientKey(request);

  if (isRateLimited(clientKey)) {
    return NextResponse.json(
      { ok: false, message: "Too many requests. Try again later." },
      { status: 429 },
    );
  }

  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, message: "Invalid JSON payload." },
      { status: 400 },
    );
  }

  const parsed = leadSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      {
        ok: false,
        message: "Please check your form fields.",
        issues: parsed.error.flatten().fieldErrors,
      },
      { status: 400 },
    );
  }

  if (parsed.data.website) {
    return NextResponse.json({
      ok: true,
      message: "Request accepted. Proposal will be ready in 48 hours.",
    });
  }

  try {
    const result = await processLead(parsed.data);
    const status = result.partial ? 202 : 200;

    return NextResponse.json(result, { status });
  } catch {
    return NextResponse.json(
      {
        ok: false,
        message: "Unable to process request now. Please try later.",
      },
      { status: 500 },
    );
  }
}
