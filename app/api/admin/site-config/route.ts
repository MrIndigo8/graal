import { NextResponse } from "next/server";
import {
  getSiteConfig,
  getSiteConfigStorage,
  saveSiteConfig,
  siteConfigSchema,
} from "@/lib/site-config";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function isAuthorized(request: Request) {
  const adminToken = process.env.ADMIN_TOKEN;

  if (!adminToken) {
    return process.env.NODE_ENV !== "production";
  }

  return request.headers.get("x-admin-token") === adminToken;
}

export async function GET(request: Request) {
  if (!isAuthorized(request)) {
    return NextResponse.json(
      { ok: false, message: "Нет доступа к админке." },
      { status: 401 },
    );
  }

  const config = await getSiteConfig();
  return NextResponse.json({
    ok: true,
    config,
    storage: getSiteConfigStorage(),
  });
}

export async function PUT(request: Request) {
  if (!isAuthorized(request)) {
    return NextResponse.json(
      { ok: false, message: "Нет доступа к админке." },
      { status: 401 },
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

  const parsed = siteConfigSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      {
        ok: false,
        message: "Конфигурация не прошла валидацию.",
        issues: parsed.error.flatten().fieldErrors,
      },
      { status: 400 },
    );
  }

  const config = await saveSiteConfig(parsed.data);
  return NextResponse.json({
    ok: true,
    config,
    storage: getSiteConfigStorage(),
  });
}
