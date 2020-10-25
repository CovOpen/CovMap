import React from "react";
import { Grid, Typography } from "@material-ui/core";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import { useQueryPreservingHistoryPush } from "app-config/components/customHistoryHooks";

export const NavigationTitle: React.FC<{ title: string; backToExpandedFeatureInfo?: boolean }> = (props) => {
  const customHistoryPush = useQueryPreservingHistoryPush();

  return (
    <a
      onClick={() => customHistoryPush("/", { expanded: props.backToExpandedFeatureInfo ? "true" : undefined })}
      style={{ textDecoration: "none", cursor: "pointer" }}
      aria-label="go back to map"
    >
      <Grid container direction="row" alignItems="center">
        <Grid item>
          <ArrowBackIosIcon color="action" />
        </Grid>
        <Grid item>
          <Typography variant="h1">{props.title}</Typography>
        </Grid>
      </Grid>
    </a>
  );
};
