import React, { useEffect, useState } from "react";
import { useThunkDispatch } from "../../../../../src/useThunkDispatch";
import { useSelector } from "react-redux";
import { State } from "../../../../../src/state";
import { AppApi } from "../../../../../src/state/app";

import { formatUTCDate } from "../../../../../src/lib/formatUTCDate";
import { NavigationTitle } from "../../NavigationTitle";
import { Card, Typography } from "@material-ui/core";
import { Chart, ChartData, LineConfig } from "app-config/components/pages/Charts/Chart";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  teaser: {
    border: 0,
    background: "#2979ff",
    color: "white",
    textTransform: "none",
  },
  section: {
    maxWidth: "800px !important",
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
      : "/data/chart1-data.json";
  const data2Url = "/data/chart2-data.json";
  const [data, setData] = useState<ChartData>();
  const [data2, setData2] = useState<ChartData>();

  useEffect(() => {
    dispatch(AppApi.pushLoading("charts-data"));
    fetch(dataUrl)
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        dispatch(AppApi.popLoading("charts-data"));
      });
  }, []);

  useEffect(() => {
    dispatch(AppApi.pushLoading("chart2-data"));
    fetch(data2Url)
      .then((res) => res.json())
      .then((data) => {
        setData2(data);
        dispatch(AppApi.popLoading("chart2-data"));
      });
  }, []);

  if (!data || !data2) {
    return null;
  }

  const ciConfig: LineConfig = { dataKey: "CI", name: "Kontaktindex C", yAxis: [0, 650] };
  const rConfig: LineConfig = { dataKey: "R", name: "Reproduktionszahl R", yAxis: [0, 3.21], ticks: [0, 1, 2, 3] };

  const values: number[] = data2.map(({ Cases, PredictedCases }) => Math.max(Cases ?? 0, PredictedCases ?? 0));
  const yAxisMaxCases = Math.max(...values);
  const casesConfig: LineConfig = { dataKey: "Cases", name: "Fälle", yAxis: [0, yAxisMaxCases] };
  const predictionCasesConfig: LineConfig = {
    dataKey: "PredictedCases",
    name: "Vorhersage",
    yAxis: [0, yAxisMaxCases],
  };

  return (
    <main className="sections">
      <section className={classes.section}>
        <NavigationTitle title={"Deutschlandweite Graphen"} />
      </section>

      <section className={classes.section}>
        <Card className={classes.teaser} elevation={0}>
          <Typography style={{ margin: "8px" }}>Hier steht ein netter Text um die Graphen zu erklären</Typography>
        </Card>
      </section>

      <section className={classes.section}>
        <Typography style={{ margin: "8px" }}>Oder auch ein Text ohne blaue Box</Typography>
      </section>

      <section className={classes.section} style={{ overflowX: "auto" }}>
        <div style={{ minWidth: "450px" }}>
          <Chart data={data} chartConfig={{ line1: ciConfig, line2: rConfig }} />
        </div>
      </section>

      <section className={classes.section}>
        <Typography variant="h1">Zwischenüberschrift</Typography>
        <Typography style={{ margin: "8px" }}>
          Im folgenden Diagram sind die bisherigen und die von unserem Model für die nächste Woche vorhergesagten
          Fallzahlen abgebildet.
        </Typography>
      </section>

      <section className={classes.section} style={{ overflowX: "auto" }}>
        <div style={{ minWidth: "450px" }}>
          <Chart data={data2} chartConfig={{ line1: casesConfig, line2: predictionCasesConfig }} />
        </div>
      </section>
    </main>
  );
};
