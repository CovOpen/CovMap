import React from "react";
import { useHistory } from "react-router-dom";
import { Grid, Typography } from "@material-ui/core";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";

export const DetailPageNavigateBackHeader: React.FC<{ title: string }> = (props) => {
  const history = useHistory();

  return (
    <a
      onClick={() => history.goBack()}
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
