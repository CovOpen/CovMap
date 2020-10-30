import React from "react";
import { ChartConfig } from "app-config/components/pages/Charts/ChartConfig";

import CartesianGrid from "recharts/es6/cartesian/CartesianGrid";
import Legend from "recharts/es6/component/Legend";
import Line from "recharts/es6/cartesian/Line";
import LineChart from "recharts/es6/chart/LineChart";
import ResponsiveContainer from "recharts/es6/component/ResponsiveContainer";
import Tooltip from "recharts/es6/component/Tooltip";
import XAxis from "recharts/es6/cartesian/XAxis";
import YAxis from "recharts/es6/cartesian/YAxis";

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
      <Tooltip />
      <Legend />
      {chartConfig.ci && <YAxis yAxisId="left" domain={[0, 650]} />}
      {chartConfig.ci && (
        <Line yAxisId="left" type="monotone" dataKey={"CI"} stroke="#8884d8" strokeWidth="4px" name="Kontaktindex C" />
      )}
      {chartConfig.r && <YAxis yAxisId="right" domain={[0, 3.21]} orientation="right" />}
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
