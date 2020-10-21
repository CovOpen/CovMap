import React, { useEffect, useState } from "react";
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { useThunkDispatch } from "../../../../src/useThunkDispatch";
import { useSelector } from "react-redux";
import { State } from "../../../../src/state";
import { AppApi } from "../../../../src/state/app";

import { formatUTCDate } from "../../../../src/lib/formatUTCDate";

export const Charts = () => {
  const dispatch = useThunkDispatch();
  const currentDate = useSelector((state: State) => state.app.currentDate);
  const dateKey = formatUTCDate(currentDate);
  const dataUrl =
    process.env.NODE_ENV === "production"
      ? `https://data.covmap.de/data/graph-${dateKey}.json`
      : "/data/charts-data.json";
  const [data, setData] = useState();

  useEffect(() => {
    dispatch(AppApi.pushLoading("charts-data"));
    fetch(dataUrl)
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        dispatch(AppApi.popLoading("charts-data"));
      });
  }, []);

  if (!data) {
    return null;
  }

  return (
    <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ width: "100%", height: "calc(100vh - 100px)" }}>
        <ResponsiveContainer>
          <LineChart
            data={data}
            margin={{
              top: 20,
              right: 20,
              left: 20,
              bottom: 20,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey={"datum"} interval={"preserveEnd"} angle={-8} />
            <YAxis yAxisId="left" domain={[0, 650]} />
            <YAxis yAxisId="right" domain={[0, 3.21]} orientation="right" />
            <Tooltip />
            <Legend />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey={"CI"}
              stroke="#8884d8"
              strokeWidth="4px"
              name="Kontaktindex C"
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey={"R"}
              stroke="#f01a8d"
              strokeWidth="4px"
              name="Reproduktionszahl R"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
