"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";

function calculateRecommendation(score: number) {
  if (score <= 4) return "outbound";
  if (score <= 8) return "hybrid";
  return "inbound";
}

export function RevenueQuiz() {
  const t = useTranslations("quiz");
  const questions = t.raw("questions") as string[];
  const options = t.raw("options") as string[][];
  const [answers, setAnswers] = useState<number[]>(Array(5).fill(0));
  const score = useMemo(() => answers.reduce((acc, current) => acc + current, 0), [answers]);
  const recommendation = t(`recommendations.${calculateRecommendation(score)}`);

  return (
    <div className="space-y-5">
      {questions.map((question, index) => (
        <div key={question} className="border border-[var(--border)] p-4">
          <p className="text-sm font-medium">{`${index + 1}. ${question}`}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {options[index].map((option, optionIndex) => (
              <button
                key={option}
                type="button"
                onClick={() => {
                  const copy = [...answers];
                  copy[index] = optionIndex;
                  setAnswers(copy);
                }}
                className={`border px-3 py-1 text-xs uppercase tracking-[0.06em] ${
                  answers[index] === optionIndex
                    ? "border-[var(--crimson)] text-[var(--crimson)]"
                    : "border-[var(--border)] text-[var(--text-secondary)]"
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      ))}

      <div className="border border-[var(--border)] bg-[var(--crimson-light)] p-4">
        <p className="text-sm">
          {t("scoreLabel")} {score}/10
        </p>
        <p className="mt-1 text-sm text-[var(--crimson-dark)]">
          {t("recommendedLabel")} {recommendation}
        </p>
      </div>
    </div>
  );
}
