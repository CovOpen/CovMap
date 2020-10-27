import React from "react";
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { ChartConfig } from "app-config/components/pages/Charts/ChartConfig";

export type ChartData = Array<{ datum: string } & { [key: string]: number | null }>;

export const Chart: React.FC<{ data: ChartData; chartConfig: ChartConfig }> = ({ data, chartConfig }) => (
  <ResponsiveContainer>
    <LineChart
      data={data}
      margin={{
        top: 20,
        right: 0,
        left: 0,
        bottom: 0,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey={"datum"} interval={"preserveEnd"} angle={-8} />
      <YAxis yAxisId="left" domain={[0, 650]} />
      <YAxis yAxisId="right" domain={[0, 3.21]} orientation="right" />
      <Tooltip />
      <Legend />
      {chartConfig.ci && (
        <Line yAxisId="left" type="monotone" dataKey={"CI"} stroke="#8884d8" strokeWidth="4px" name="Kontaktindex C" />
      )}
      {chartConfig.r && (
        <Line
          yAxisId="right"
          type="monotone"
          dataKey={"R"}
          stroke="#f01a8d"
          strokeWidth="4px"
          name="Reproduktionszahl R"
        />
      )}
    </LineChart>
  </ResponsiveContainer>
);
