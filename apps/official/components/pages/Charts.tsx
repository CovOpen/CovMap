import React from "react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from 'recharts';

import chartsdata from "../../static/ChartsData.json"

export const Charts = () => {
  const links = [2294, 2302, 2311, 2341]
  const index = Math.floor(Math.random() * links.length)
  const link = links[index]
  
  const indices = Array(chartsdata.days.length).fill(undefined).map((_, index) => index)
  
  return (
  <a href={`https://xkcd.com/${link}/`}>
  	<ResponsiveContainer>
      <LineChart
        data={indices}
        margin={{
          top: 20, right: 30, left: 20, bottom: 10,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey={(x) => chartsdata.days[x]}/>
        <YAxis yAxisId="left" />
        <YAxis yAxisId="right" orientation="right" />
        <Tooltip />
        <Legend />
        <Line yAxisId="left" type="monotone" dataKey={(x) => chartsdata.ci[x]} stroke="#8884d8" name="Contact Index C"/>
        <Line yAxisId="left" type="monotone" dataKey={(x) => chartsdata.md[x]} stroke="#82ca9d" name="Mean Contacts"/>
        <Line yAxisId="right" type="monotone" dataKey={(x) => chartsdata.R[x]} stroke="#f01a8d" name="Reproduction rate R"/>
      </LineChart>
    </ResponsiveContainer>
  </a>
  );
};
