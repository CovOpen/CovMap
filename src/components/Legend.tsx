import React from "react";
import { useSelector } from "react-redux";

import { makeStyles } from "@material-ui/core/styles";
import { Paper, Box } from "@material-ui/core";

import { State } from "../state";
import { formatUTCDate } from "../lib/formatUTCDate.js";
import { config } from "app-config/index";
import { Expression } from "../lib/expression";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "absolute",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    right: theme.spacing(3),
    bottom: theme.spacing(20),
    zIndex: 1200,
    touchAction: "none",
    pointerEvents: "none",
  },
  legendKey: {
    display: "inline-block",
    borderRadius: "20%",
    width: "2ch",
    height: "2ch",
    marginRight: "1ch",
    marginTop: 2,
    verticalAlign: "middle",
  },
}));

export function Legend() {
  const classes = useStyles();
  const currentVisual = useSelector((state: State) => state.app.currentVisual);
  const currentMappable = useSelector((state: State) => state.app.currentMappable);
  const currentDate = useSelector((state: State) => state.app.currentDate);
  const currentLayerGroup = useSelector((state: State) => state.app.currentLayerGroup);
  const visual = config.visuals[currentVisual];
  const timeKey = formatUTCDate(currentDate);
  const mappingId = Object.keys(visual.mappings)[0];
  const activeMapping = visual.mappings[mappingId];

  const datasets = useSelector((state: State) => state.app.datasets);
  const currentDataSet = datasets.get(`${timeKey}-${activeMapping.datasourceId}`);

  if (!currentDataSet || !currentDataSet.data || !activeMapping || !activeMapping.calculateLegend) return null;

  let showLegend = false;

  let legend;

  const filteredLayers = visual.layers.filter((layer) => currentLayerGroup.layers.includes(layer.id));

  for (const layer of filteredLayers) {
    const l = layer.fn(currentMappable.property, timeKey);
    if (layer.showLegend) {
      const paintExpression = Expression.parse((l.paint || {})["fill-color"], "color");

      const legendStops = activeMapping.calculateLegend(currentDataSet.data, currentMappable.property);

      legend = legendStops.map(([y, label]) => {
        const color = paintExpression.evaluate({ properties: { [timeKey]: { [currentMappable.property]: y } } } as any);
        return [color.toString(), label];
      });

      showLegend = true;
      break;
    }
  }

  if (!showLegend) return null;

  return (
    <Paper elevation={3} className={classes.root}>
      <Box p={2}>
        {legend.map(([color, label], index) => (
          <div key={index}>
            <span className={classes.legendKey} style={{ backgroundColor: color }} />
            <span> {label} </span>
          </div>
        ))}
      </Box>
    </Paper>
  );
}
