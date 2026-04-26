export const calculatorConfig = {
  recruitmentCostPerSeller: 1500,
  onboardingInefficiencyMonths: 2,
  ropMonthlyCost: 4000,
  graalMonthlyBaseByTeamSize: {
    "1-2": 2500,
    "3-5": 4500,
    "5-10": 7000,
    "10-plus": 11000,
  },
  defaultValues: {
    teamSize: "3-5",
    sellerSalary: 2500,
    hasRop: true,
    stackCost: 500,
    months: 6,
  },
} as const;

export type CalculatorTeamSize =
  keyof typeof calculatorConfig.graalMonthlyBaseByTeamSize;
