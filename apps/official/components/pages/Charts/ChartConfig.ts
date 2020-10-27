export type ChartConfig = {
  ci?: boolean;
  r?: boolean;
};

export const chartConfigs: { [key: string]: ChartConfig } = {
  "Both": { r: true, ci: true },
  "Only R": { r: true },
  "Only CI": { ci: true },
};
