import {
  calculatorConfig,
  type CalculatorTeamSize,
} from "@/config/calculator";

const sellerCountByTeamSize: Record<CalculatorTeamSize, number> = {
  "1-2": 2,
  "3-5": 4,
  "5-10": 8,
  "10-plus": 12,
};

export type CalculatorInput = {
  teamSize: CalculatorTeamSize;
  sellerSalary: number;
  hasRop: boolean;
  stackCost: number;
  months: number;
};

export type CalculatorResult = {
  sellerCount: number;
  hiringCost: number;
  onboardingLoss: number;
  salaryCost: number;
  ropCost: number;
  stackCost: number;
  totalInHouse: number;
  graalMonthly: number;
  graalTotal: number;
  savings: number;
  speedDeltaDays: number;
};

export function calculateRoi(input: CalculatorInput): CalculatorResult {
  const sellerCount = sellerCountByTeamSize[input.teamSize];
  const hiringCost = sellerCount * calculatorConfig.recruitmentCostPerSeller;
  const onboardingLoss =
    sellerCount *
    input.sellerSalary *
    calculatorConfig.onboardingInefficiencyMonths;
  const salaryCost = sellerCount * input.sellerSalary * input.months;
  const ropCost = input.hasRop
    ? calculatorConfig.ropMonthlyCost * input.months
    : 0;
  const stackCost = input.stackCost * input.months;
  const totalInHouse =
    hiringCost + onboardingLoss + salaryCost + ropCost + stackCost;
  const graalMonthly = calculatorConfig.graalMonthlyBaseByTeamSize[input.teamSize];
  const graalTotal = graalMonthly * input.months;

  return {
    sellerCount,
    hiringCost,
    onboardingLoss,
    salaryCost,
    ropCost,
    stackCost,
    totalInHouse,
    graalMonthly,
    graalTotal,
    savings: totalInHouse - graalTotal,
    speedDeltaDays: 76,
  };
}

export function formatEuro(value: number) {
  return new Intl.NumberFormat("ru-RU", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(value);
}
