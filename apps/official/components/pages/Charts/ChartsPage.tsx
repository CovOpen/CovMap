import React, { useEffect, useState } from "react";
import { useThunkDispatch } from "../../../../../src/useThunkDispatch";
import { useSelector } from "react-redux";
import { State } from "../../../../../src/state";
import { AppApi } from "../../../../../src/state/app";

import { formatUTCDate } from "../../../../../src/lib/formatUTCDate";
import { NavigationTitle } from "../../NavigationTitle";
import { Card, FormControl, InputLabel, MenuItem, Select, Typography } from "@material-ui/core";
import { Chart, ChartData } from "app-config/components/pages/Charts/Chart";
import { chartConfigs } from "app-config/components/pages/Charts/ChartConfig";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  teaser: {
    border: 0,
    background: "#2979ff",
    color: "white",
    textTransform: "none",
  },
}));

export const ChartsPage: React.FC = () => {
  const classes = useStyles();
  const dispatch = useThunkDispatch();
  const currentDate = useSelector((state: State) => state.app.currentDate);
  const dateKey = formatUTCDate(currentDate);
  const dataUrl =
    process.env.NODE_ENV === "production"
      ? `https://data.covmap.de/data/graph-${dateKey}.json`
      : "/data/charts-data.json";
  const [data, setData] = useState<ChartData>();
  const [chartConfigKey, setChartConfigKey] = useState<string>(Object.keys(chartConfigs)[0]);

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
    <main className="sections">
      <section>
        <NavigationTitle title={"Deutschlandweite Graphen"} />
      </section>
      <section>
        <Card className={classes.teaser}>
          <Typography style={{ margin: "8px" }}>Hier steht ein netter Text um die Graphen zu erklären</Typography>
        </Card>
      </section>
      <section>
        <FormControl style={{ minWidth: "300px" }}>
          <InputLabel id="chart-select-label">Welche Graphen soll angezeigt werden?</InputLabel>
          <Select
            labelId="chart-select-label"
            value={chartConfigKey}
            onChange={(event) => setChartConfigKey(event.target.value as string)}
          >
            {Object.keys(chartConfigs).map((key) => (
              <MenuItem key={key} value={key}>
                {key}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </section>
      <section style={{ overflowX: "auto" }}>
        <div style={{ minWidth: "450px" }}>
          <div style={{ position: "relative", width: "100%", height: "auto", padding: "62% 0 0 0" }}>
            <div style={{ position: "absolute", width: "100%", height: "100%", top: 0, left: 0 }}>
              <Chart data={data} chartConfig={chartConfigs[chartConfigKey]} />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};
