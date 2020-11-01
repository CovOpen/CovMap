import React from "react";
import CartesianGrid from "recharts/es6/cartesian/CartesianGrid";
import Legend from "recharts/es6/component/Legend";
import Line from "recharts/es6/cartesian/Line";
import LineChart from "recharts/es6/chart/LineChart";
import ResponsiveContainer from "recharts/es6/component/ResponsiveContainer";
import Tooltip from "recharts/es6/component/Tooltip";
import XAxis from "recharts/es6/cartesian/XAxis";
import YAxis from "recharts/es6/cartesian/YAxis";

export type ChartData = Array<{ datum: string } & { [key: string]: number | null }>;
export type LineConfig = { dataKey: string; name: string; yAxis?: [number, number]; ticks?: number[] };
export type ChartConfig = { line1: LineConfig; line2: LineConfig };

export const Chart: React.FC<{ data: ChartData; chartConfig: ChartConfig }> = ({
  data,
  chartConfig: { line1, line2 },
}) => (
  <div style={{ position: "relative", width: "100%", height: "auto", padding: "62% 0 0 0" }}>
    <div style={{ position: "absolute", width: "100%", height: "100%", top: 0, left: 0 }}>
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
          <YAxis yAxisId="left" domain={line1.yAxis} ticks={line1.ticks} />
          <Line
            yAxisId="left"
            type="monotone"
            dataKey={line1.dataKey}
            stroke="#8884d8"
            strokeWidth="4px"
            name={line1.name}
            dot={null}
          />
          <YAxis yAxisId="right" domain={line2.yAxis} orientation="right" ticks={line2.ticks} />
          <Line
            yAxisId="right"
            type="monotone"
            dataKey={line2.dataKey}
            stroke="#f01a8d"
            strokeWidth="4px"
            name={line2.name}
            dot={null}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  </div>
);
