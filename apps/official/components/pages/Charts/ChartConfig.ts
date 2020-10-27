export type ChartConfig = {
  ci?: boolean;
  r?: boolean;
};

export const chartConfigs: { [key: string]: ChartConfig } = {
  "Beide": { r: true, ci: true },
  "Nur R": { r: true },
  "Nur CI": { ci: true },
};
