import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Card, CardContent, IconButton } from "@material-ui/core";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";

import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";

import { RiskScore } from "../../models";
import { RiskTexts } from "../../static/texts/RiskTexts";

const useStyles = makeStyles({
  root: {
    border: 0,
    background: "#2979ff",
    color: "white",
  },
});

const renderRecommendation = (recommendation: () => any) => () => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardContent>
        <Grid container direction="row" spacing={2}>
          <Grid item xs={10}>
            {recommendation()}
          </Grid>
          <Grid item xs={2}>
            <IconButton component={Link} to="/risk-levels" color="primary" aria-label="show risk level explanations">
              <ArrowForwardIosIcon fontSize="small" />
            </IconButton>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

const renderNormalRiskRecommendation = renderRecommendation(() => (
  <Typography variant="body2">{RiskTexts.NORMAL}</Typography>
));

const renderMediumRiskRecommendation = renderRecommendation(() => (
  <Typography variant="body2">{RiskTexts.MEDIUM}</Typography>
));

const renderHighRiskRecommendation = renderRecommendation(() => (
  <Typography variant="body2">{RiskTexts.HIGH}</Typography>
));

export const RiskRecommendation = ({ riskScore }: { riskScore: RiskScore }) => {
  switch (riskScore) {
    case RiskScore.Low:
      return renderNormalRiskRecommendation();

    case RiskScore.Medium:
      return renderMediumRiskRecommendation();

    case RiskScore.High:
      return renderHighRiskRecommendation();

    default:
      console.warn("cannot display risk score -- unrecognized score value");
      return <></>;
  }
};
