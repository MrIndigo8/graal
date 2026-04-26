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
      { ok: false, message: "Слишком много запросов. Попробуйте позже." },
      { status: 429 },
    );
  }

  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, message: "Некорректный JSON payload." },
      { status: 400 },
    );
  }

  const parsed = leadSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      {
        ok: false,
        message: "Проверьте поля формы.",
        issues: parsed.error.flatten().fieldErrors,
      },
      { status: 400 },
    );
  }

  if (parsed.data.website) {
    return NextResponse.json({
      ok: true,
      message: "Заявка принята. Смета будет готова за 48 часов.",
    });
  }

  try {
    const result = await processLead(parsed.data);
    const status = result.message.includes("интеграций") ? 202 : 200;

    return NextResponse.json(result, { status });
  } catch {
    return NextResponse.json(
      {
        ok: false,
        message: "Не удалось принять заявку. Попробуйте позже.",
      },
      { status: 500 },
    );
  }
}
