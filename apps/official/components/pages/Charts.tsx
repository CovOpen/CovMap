import React from "react";
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis, } from 'recharts';

import chartsData from "../../static/ChartsData.json"

export const Charts = () => {
  return (
    <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ width: "100%", height: "calc(100vh - 100px)" }}>
        <ResponsiveContainer>
          <LineChart
            data={chartsData}
            margin={{
              top: 20, right: 20, left: 20, bottom: 20,
            }}
          >
            <CartesianGrid strokeDasharray="3 3"/>
            <XAxis dataKey={"name"}/>
            <YAxis yAxisId="left"/>
            <YAxis yAxisId="right" orientation="right"/>
            <Tooltip/>
            <Legend/>
            <Line yAxisId="left" type="monotone" dataKey={'ci'} stroke="#8884d8" strokeWidth="4px"
              name="Kontaktindex C"/>
            <Line yAxisId="right" type="monotone" dataKey={'R'} stroke="#f01a8d" strokeWidth="4px"
              name="Reproduktionszahl R"/>
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
