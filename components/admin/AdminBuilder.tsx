"use client";

import { useMemo, useState } from "react";
import type { ReactNode } from "react";
import type { SiteConfig, SiteConfigStorage } from "@/lib/site-config";

type SaveState = "idle" | "saving" | "saved" | "error";

export function AdminBuilder({
  initialConfig,
  initialStorage,
}: {
  initialConfig: SiteConfig;
  initialStorage: SiteConfigStorage;
}) {
  const [config, setConfig] = useState(initialConfig);
  const [storage, setStorage] = useState<SiteConfigStorage>(initialStorage);
  const [adminToken, setAdminToken] = useState("");
  const [state, setState] = useState<SaveState>("idle");
  const [message, setMessage] = useState("");

  const enabledBlocks = useMemo(
    () => config.blocks.filter((block) => block.enabled).length,
    [config.blocks],
  );

  async function saveConfig() {
    setState("saving");
    setMessage("");

    const response = await fetch("/api/admin/site-config", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        ...(adminToken ? { "x-admin-token": adminToken } : {}),
      },
      body: JSON.stringify(config),
    });

    const result = await response.json();

    if (!response.ok) {
      setState("error");
      setMessage(result.message ?? "Не удалось сохранить настройки.");
      return;
    }

    setConfig(result.config);
    if (result.storage) {
      setStorage(result.storage);
    }
    setState("saved");
    setMessage("Настройки сохранены. Обновите главную страницу, чтобы увидеть изменения.");
  }

  return (
    <div className="min-h-screen bg-[var(--color-bg-primary)]">
      <header className="border-b border-[var(--color-border)] bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-[var(--color-crimson-400)]">
              Site constructor
            </p>
            <h1 className="mt-2 font-[var(--font-cormorant)] text-5xl">
              Админка Грааля
            </h1>
            <p className="mt-2 text-[var(--color-text-secondary)]">
              Редактор блоков, цветов, шрифтов, форм и кнопок. Активных блоков:
              {" "}
              {enabledBlocks}
            </p>
            <p className="mt-3 inline-flex rounded-full border border-[var(--color-border)] bg-[var(--color-bg-secondary)] px-3 py-1 text-xs font-medium uppercase tracking-[0.14em] text-[var(--color-text-secondary)]">
              Storage: {storage === "supabase" ? "Supabase/Postgres" : "local JSON"}
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-[minmax(220px,320px)_auto]">
            <input
              value={adminToken}
              onChange={(event) => setAdminToken(event.target.value)}
              placeholder="ADMIN_TOKEN для production"
              className="rounded border border-[var(--color-border)] px-4 py-3"
              type="password"
            />
            <button
              onClick={saveConfig}
              disabled={state === "saving"}
              className="rounded bg-[var(--color-crimson-400)] px-6 py-3 font-medium text-white disabled:opacity-60"
            >
              {state === "saving" ? "Сохраняю..." : "Сохранить"}
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto grid max-w-7xl gap-6 px-6 py-8 xl:grid-cols-[360px_1fr]">
        <aside className="space-y-6">
          <Panel title="Бренд">
            <TextInput
              label="Название"
              value={config.brand.name}
              onChange={(value) =>
                setConfig({ ...config, brand: { ...config.brand, name: value } })
              }
            />
            <TextInput
              label="Tagline"
              value={config.brand.tagline}
              onChange={(value) =>
                setConfig({
                  ...config,
                  brand: { ...config.brand, tagline: value },
                })
              }
            />
          </Panel>

          <Panel title="Цвета">
            {Object.entries(config.theme.colors).map(([key, value]) => (
              <ColorInput
                key={key}
                label={key}
                value={value}
                onChange={(nextValue) =>
                  setConfig({
                    ...config,
                    theme: {
                      ...config.theme,
                      colors: { ...config.theme.colors, [key]: nextValue },
                    },
                  })
                }
              />
            ))}
          </Panel>

          <Panel title="Шрифты и адаптив">
            <TextInput
              label="Display font"
              value={config.theme.typography.headingFont}
              onChange={(value) =>
                setConfig({
                  ...config,
                  theme: {
                    ...config.theme,
                    typography: {
                      ...config.theme.typography,
                      headingFont: value,
                    },
                  },
                })
              }
            />
            <RangeInput
              label="Масштаб заголовков"
              min={0.8}
              max={1.3}
              step={0.05}
              value={config.theme.typography.headingScale}
              onChange={(value) =>
                setConfig({
                  ...config,
                  theme: {
                    ...config.theme,
                    typography: {
                      ...config.theme.typography,
                      headingScale: value,
                    },
                  },
                })
              }
            />
            <RangeInput
              label="Масштаб текста"
              min={0.9}
              max={1.2}
              step={0.05}
              value={config.theme.typography.bodyScale}
              onChange={(value) =>
                setConfig({
                  ...config,
                  theme: {
                    ...config.theme,
                    typography: {
                      ...config.theme.typography,
                      bodyScale: value,
                    },
                  },
                })
              }
            />
          </Panel>

          <Panel title="Формы и кнопки">
            <TextInput
              label="Главная CTA"
              value={config.buttons.primaryLabel}
              onChange={(value) =>
                setConfig({
                  ...config,
                  buttons: { ...config.buttons, primaryLabel: value },
                })
              }
            />
            <TextInput
              label="Вторичная CTA"
              value={config.buttons.secondaryLabel}
              onChange={(value) =>
                setConfig({
                  ...config,
                  buttons: { ...config.buttons, secondaryLabel: value },
                })
              }
            />
            <TextInput
              label="Submit формы"
              value={config.form.submitLabel}
              onChange={(value) =>
                setConfig({
                  ...config,
                  form: { ...config.form, submitLabel: value },
                })
              }
            />
          </Panel>
        </aside>

        <section className="space-y-6">
          {message ? (
            <div
              className={
                state === "error"
                  ? "rounded border border-[var(--color-crimson-400)] bg-[var(--color-crimson-50)] p-4 text-[var(--color-crimson-900)]"
                  : "rounded border border-[var(--color-border)] bg-white p-4 text-[var(--color-text-secondary)]"
              }
            >
              {message}
            </div>
          ) : null}

          {storage === "file" ? (
            <div className="rounded-xl border border-[var(--color-gold-500)] bg-[var(--color-gold-100)] p-5 text-sm leading-6 text-[var(--color-text-primary)]">
              Сейчас конструктор сохраняет настройки в локальный JSON-файл.
              Для production выполните SQL из `supabase/site-config.sql` и задайте
              `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, `SITE_CONFIG_KEY` в env.
            </div>
          ) : (
            <div className="rounded-xl border border-[var(--color-border)] bg-white p-5 text-sm leading-6 text-[var(--color-text-secondary)]">
              Конструктор подключён к Supabase/Postgres. Настройки переживут деплой
              и не зависят от файловой системы Vercel.
            </div>
          )}

          <Panel title="Текст формы">
            <TextInput
              label="Заголовок"
              value={config.form.title}
              onChange={(value) =>
                setConfig({ ...config, form: { ...config.form, title: value } })
              }
            />
            <TextareaInput
              label="Описание"
              value={config.form.subtitle}
              onChange={(value) =>
                setConfig({
                  ...config,
                  form: { ...config.form, subtitle: value },
                })
              }
            />
            <TextInput
              label="Success message"
              value={config.form.successMessage}
              onChange={(value) =>
                setConfig({
                  ...config,
                  form: { ...config.form, successMessage: value },
                })
              }
            />
          </Panel>

          <Panel title="Блоки страницы">
            <div className="space-y-4">
              {config.blocks.map((block, blockIndex) => (
                <div
                  className="rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-4"
                  key={block.id}
                >
                  <div className="mb-4 flex items-center justify-between gap-4">
                    <div>
                      <p className="text-xs uppercase tracking-[0.16em] text-[var(--color-text-muted)]">
                        {block.type} / {block.id}
                      </p>
                      <h3 className="text-xl font-medium">{block.title}</h3>
                    </div>
                    <label className="flex items-center gap-2 text-sm">
                      <input
                        checked={block.enabled}
                        onChange={(event) =>
                          updateBlock(blockIndex, { enabled: event.target.checked })
                        }
                        type="checkbox"
                      />
                      включён
                    </label>
                  </div>

                  <div className="grid gap-4">
                    {"eyebrow" in block ? (
                      <TextInput
                        label="Надзаголовок"
                        value={block.eyebrow ?? ""}
                        onChange={(value) => updateBlock(blockIndex, { eyebrow: value })}
                      />
                    ) : null}
                    <TextInput
                      label="Заголовок"
                      value={block.title}
                      onChange={(value) => updateBlock(blockIndex, { title: value })}
                    />
                    {"body" in block ? (
                      <TextareaInput
                        label="Текст"
                        value={block.body ?? ""}
                        onChange={(value) => updateBlock(blockIndex, { body: value })}
                      />
                    ) : null}

                    <div className="grid gap-3">
                      {block.items.map((item, itemIndex) => (
                        <div
                          className="grid gap-3 rounded border border-[var(--color-border)] bg-white p-3 md:grid-cols-2"
                          key={`${block.id}-${itemIndex}`}
                        >
                          <TextInput
                            label={`Item ${itemIndex + 1}: title`}
                            value={item.title}
                            onChange={(value) =>
                              updateItem(blockIndex, itemIndex, {
                                ...item,
                                title: value,
                              })
                            }
                          />
                          <TextInput
                            label={`Item ${itemIndex + 1}: text`}
                            value={item.text}
                            onChange={(value) =>
                              updateItem(blockIndex, itemIndex, {
                                ...item,
                                text: value,
                              })
                            }
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Panel>
        </section>
      </main>
    </div>
  );

  function updateBlock(
    blockIndex: number,
    patch: Partial<SiteConfig["blocks"][number]>,
  ) {
    setConfig({
      ...config,
      blocks: config.blocks.map((block, index) =>
        index === blockIndex ? { ...block, ...patch } : block,
      ),
    });
  }

  function updateItem(
    blockIndex: number,
    itemIndex: number,
    nextItem: SiteConfig["blocks"][number]["items"][number],
  ) {
    setConfig({
      ...config,
      blocks: config.blocks.map((block, index) =>
        index === blockIndex
          ? {
              ...block,
              items: block.items.map((item, nestedIndex) =>
                nestedIndex === itemIndex ? nextItem : item,
              ),
            }
          : block,
      ),
    });
  }
}

function Panel({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="rounded-xl border border-[var(--color-border)] bg-white p-5 shadow-sm">
      <h2 className="mb-4 text-lg font-semibold">{title}</h2>
      <div className="grid gap-4">{children}</div>
    </section>
  );
}

function TextInput({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="grid gap-2 text-sm font-medium">
      {label}
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="rounded border border-[var(--color-border)] px-3 py-2 font-normal"
      />
    </label>
  );
}

function TextareaInput({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="grid gap-2 text-sm font-medium">
      {label}
      <textarea
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="min-h-24 rounded border border-[var(--color-border)] px-3 py-2 font-normal"
      />
    </label>
  );
}

function ColorInput({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="grid grid-cols-[1fr_44px] items-end gap-3 text-sm font-medium">
      <span className="grid gap-2">
        {label}
        <input
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="rounded border border-[var(--color-border)] px-3 py-2 font-mono text-sm font-normal"
        />
      </span>
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-10 w-11 rounded border border-[var(--color-border)]"
        type="color"
      />
    </label>
  );
}

function RangeInput({
  label,
  value,
  min,
  max,
  step,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (value: number) => void;
}) {
  return (
    <label className="grid gap-2 text-sm font-medium">
      <span className="flex justify-between">
        {label}
        <span>{value}</span>
      </span>
      <input
        value={value}
        min={min}
        max={max}
        step={step}
        onChange={(event) => onChange(Number(event.target.value))}
        type="range"
      />
    </label>
  );
}
