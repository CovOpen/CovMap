import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Card, CardContent, Button, IconButton, Grid } from "@material-ui/core";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";

import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";

import { RiskScore } from "../../models";
import { RiskTexts } from "../../static/texts/RiskTexts";

const useStyles = makeStyles((theme) => ({
  teaser: {
    "border": 0,
    "background": "#2979ff",
    "color": "white",
    "textTransform": "none",
    "padding": theme.spacing(4, 2),
    "&:last-child": {
      paddingBottom: theme.spacing(4, 2), // make the cards symmetric by removing the huge padding bottom
    },
  },

  centerIcon: {
    margin: "0 auto",
    display: "block",
  },
}));

const Recommendation = ({ recommendation }: { recommendation: string }): JSX.Element => {
  const classes = useStyles();

  return (
    <Link to="/risk-levels" style={{ textDecoration: "none" }} aria-label="go to explanation">
      <Card className={classes.teaser}>
        <Grid container direction="row" alignItems="center" spacing={2}>
          <Grid item xs={10}>
            <Typography variant="body2">{recommendation}</Typography>
          </Grid>
          <Grid item xs={2}>
            <ArrowForwardIosIcon className={classes.centerIcon} fontSize="small" />
          </Grid>
        </Grid>
      </Card>
    </Link>
  );
};

export const RiskRecommendation = ({ riskScore }: { riskScore: RiskScore }) => {
  switch (riskScore) {
    case RiskScore.Low:
      return <Recommendation recommendation={RiskTexts.NORMAL} />;

    case RiskScore.Medium:
      return <Recommendation recommendation={RiskTexts.MEDIUM} />;

    case RiskScore.High:
      return <Recommendation recommendation={RiskTexts.HIGH} />;

    default:
      console.warn("cannot display risk score -- unrecognized score value");
      return null;
  }
};
