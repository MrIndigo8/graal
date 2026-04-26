"use client";

import { useMemo, useState } from "react";
import {
  calculatorConfig,
  type CalculatorTeamSize,
} from "@/config/calculator";
import { calculateRoi, formatEuro } from "@/lib/calculator";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Section } from "./Section";

const teamOptions: Array<{ value: CalculatorTeamSize; label: string }> = [
  { value: "1-2", label: "1-2" },
  { value: "3-5", label: "3-5" },
  { value: "5-10", label: "5-10" },
  { value: "10-plus", label: "10+" },
];

const monthOptions = [3, 6, 12];

export function ROICalculator() {
  const [teamSize, setTeamSize] = useState<CalculatorTeamSize>(
    calculatorConfig.defaultValues.teamSize,
  );
  const [sellerSalary, setSellerSalary] = useState<number>(
    calculatorConfig.defaultValues.sellerSalary,
  );
  const [hasRop, setHasRop] = useState<boolean>(
    calculatorConfig.defaultValues.hasRop,
  );
  const [stackCost, setStackCost] = useState<number>(
    calculatorConfig.defaultValues.stackCost,
  );
  const [months, setMonths] = useState<number>(
    calculatorConfig.defaultValues.months,
  );

  const result = useMemo(
    () =>
      calculateRoi({
        teamSize,
        sellerSalary,
        hasRop,
        stackCost,
        months,
      }),
    [teamSize, sellerSalary, hasRop, stackCost, months],
  );

  const isSavingPositive = result.savings > 0;

  return (
    <Section
      id="roi-calculator"
      eyebrow="ROI calculator"
      title="Посчитайте, сколько стоит строить in-house"
    >
      <div className="grid gap-6 lg:grid-cols-[1fr_0.9fr]">
        <Card className="grid gap-6">
          <div>
            <p className="mb-3 text-sm font-medium text-[var(--color-text-primary)]">
              Сколько продажников нужно
            </p>
            <div className="grid grid-cols-4 gap-2">
              {teamOptions.map((option) => (
                <button
                  className={
                    option.value === teamSize
                      ? "rounded-[var(--radius-button)] bg-[var(--color-crimson-400)] px-4 py-3 text-sm font-medium text-white"
                      : "rounded-[var(--radius-button)] border border-[var(--color-border)] bg-white px-4 py-3 text-sm font-medium text-[var(--color-text-secondary)]"
                  }
                  key={option.value}
                  onClick={() => setTeamSize(option.value)}
                  type="button"
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          <RangeControl
            label="Средняя зарплата продажника"
            max={5000}
            min={1000}
            onChange={setSellerSalary}
            suffix="/мес"
            value={sellerSalary}
          />

          <div>
            <p className="mb-3 text-sm font-medium text-[var(--color-text-primary)]">
              Нужен ли РОП
            </p>
            <div className="grid grid-cols-2 gap-2">
              {[true, false].map((value) => (
                <button
                  className={
                    value === hasRop
                      ? "rounded-[var(--radius-button)] bg-[var(--color-crimson-400)] px-4 py-3 text-sm font-medium text-white"
                      : "rounded-[var(--radius-button)] border border-[var(--color-border)] bg-white px-4 py-3 text-sm font-medium text-[var(--color-text-secondary)]"
                  }
                  key={String(value)}
                  onClick={() => setHasRop(value)}
                  type="button"
                >
                  {value ? "Да" : "Нет"}
                </button>
              ))}
            </div>
          </div>

          <RangeControl
            label="CRM, базы и инструменты"
            max={2000}
            min={0}
            onChange={setStackCost}
            suffix="/мес"
            value={stackCost}
          />

          <div>
            <p className="mb-3 text-sm font-medium text-[var(--color-text-primary)]">
              Горизонт расчёта
            </p>
            <div className="grid grid-cols-3 gap-2">
              {monthOptions.map((option) => (
                <button
                  className={
                    option === months
                      ? "rounded-[var(--radius-button)] bg-[var(--color-crimson-400)] px-4 py-3 text-sm font-medium text-white"
                      : "rounded-[var(--radius-button)] border border-[var(--color-border)] bg-white px-4 py-3 text-sm font-medium text-[var(--color-text-secondary)]"
                  }
                  key={option}
                  onClick={() => setMonths(option)}
                  type="button"
                >
                  {option} мес
                </button>
              ))}
            </div>
          </div>
        </Card>

        <Card className="bg-[linear-gradient(180deg,#fff,rgba(253,245,220,0.45))] shadow-[0_24px_80px_rgba(74,14,14,0.08)]">
          <Badge variant="gold">Live estimate</Badge>
          <div className="mt-6 grid gap-4">
            <ResultLine label="Найм и онбординг" value={result.hiringCost + result.onboardingLoss} />
            <ResultLine label="Зарплаты за период" value={result.salaryCost} />
            <ResultLine label="РОП" value={result.ropCost} />
            <ResultLine label="Стек и инструменты" value={result.stackCost} />
          </div>

          <div className="my-6 h-px bg-[var(--color-border)]" />

          <ResultLine
            emphasis
            label="Итого in-house"
            value={result.totalInHouse}
          />
          <ResultLine
            label={`С Граалем (${formatEuro(result.graalMonthly)}/мес)`}
            value={result.graalTotal}
          />

          <div className="mt-8 rounded-[var(--radius-card)] bg-[var(--color-bg-dark)] p-5 text-white">
            <p className="text-sm uppercase tracking-[0.18em] text-[var(--color-gold-300)]">
              {isSavingPositive ? "Ориентировочная экономия" : "Главный выигрыш"}
            </p>
            <div className="mt-3 text-4xl font-light">
              {isSavingPositive
                ? formatEuro(result.savings)
                : `${result.speedDeltaDays} дней скорости`}
            </div>
            <p className="mt-3 text-sm leading-6 text-white/70">
              Расчёт ориентировочный и не является коммерческим предложением.
              Финальная смета зависит от ниши, географии и состава команды.
            </p>
          </div>

          <ButtonLink className="mt-6 w-full" href="#lead-form" size="lg">
            Получить детальную смету
          </ButtonLink>
        </Card>
      </div>
    </Section>
  );
}

function RangeControl({
  label,
  min,
  max,
  value,
  suffix,
  onChange,
}: {
  label: string;
  min: number;
  max: number;
  value: number;
  suffix: string;
  onChange: (value: number) => void;
}) {
  return (
    <label className="grid gap-3">
      <span className="flex items-center justify-between gap-4 text-sm font-medium text-[var(--color-text-primary)]">
        {label}
        <span className="font-normal text-[var(--color-text-secondary)]">
          {formatEuro(value)} {suffix}
        </span>
      </span>
      <input
        className="accent-[var(--color-crimson-400)]"
        max={max}
        min={min}
        onChange={(event) => onChange(Number(event.target.value))}
        step={100}
        type="range"
        value={value}
      />
    </label>
  );
}

function ResultLine({
  label,
  value,
  emphasis,
}: {
  label: string;
  value: number;
  emphasis?: boolean;
}) {
  return (
    <div
      className={
        emphasis
          ? "flex items-center justify-between gap-4 text-lg font-semibold text-[var(--color-text-primary)]"
          : "flex items-center justify-between gap-4 text-sm text-[var(--color-text-secondary)]"
      }
    >
      <span>{label}</span>
      <span>{formatEuro(value)}</span>
    </div>
  );
}
