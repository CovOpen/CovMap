import React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Grid, Card, CardHeader, CardContent, Avatar, IconButton, SvgIcon } from "@material-ui/core";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import { RiskTexts } from "../../static/texts/RiskTexts";
import RiskScoreNormalIcon from "../../static/images/risk-score-1.svg";
import RiskScoreMediumIcon from "../../static/images/risk-score-2.svg";
import RiskScoreHighIcon from "../../static/images/risk-score-3.svg";

const useStyles = makeStyles({
  leftText: {
    textAlign: "left",
  },
});

const RiskLevelHeader = () => (
  <Grid container direction="row" alignItems="center">
    <Grid item>
      <IconButton component={Link} to="/" aria-label="go back to map">
        <ArrowBackIosIcon color="action" />
      </IconButton>
    </Grid>
    <Grid item>
      <Typography variant="h1">Risikostufen</Typography>
    </Grid>
  </Grid>
);

export const RiskLevelsPage = () => {
  const classes = useStyles();

  return (
    <>
      <main className="sections">
        <section>
          <RiskLevelHeader />
        </section>

        <section>
          <Grid container direction="row">
            <Grid item xs={9}>
              <Typography variant="h2" className={classes.leftText}>
                Normales Risiko
              </Typography>
            </Grid>
            <Grid item xs={3}>
              <RiskScoreNormalIcon />
            </Grid>
          </Grid>
          <Typography variant="body1" className={classes.leftText}>
            {RiskTexts.NORMAL}
          </Typography>
        </section>

        <section>
          <Grid container direction="row">
            <Grid item xs={9}>
              <Typography variant="h2" className={classes.leftText}>
                Mittleres Risiko
              </Typography>
            </Grid>
            <Grid item xs={3}>
              <RiskScoreMediumIcon />
            </Grid>
          </Grid>
          <Typography variant="body1" className={classes.leftText}>
            {RiskTexts.MEDIUM}
          </Typography>
        </section>

        <section>
          <Grid container direction="row">
            <Grid item xs={9}>
              <Typography variant="h2" className={classes.leftText}>
                Hohes Risiko
              </Typography>
            </Grid>
            <Grid item xs={3}>
              <RiskScoreHighIcon />
            </Grid>
          </Grid>
          <Typography variant="body1" className={classes.leftText}>
            {RiskTexts.HIGH}
          </Typography>
        </section>
      </main>
    </>
  );
};
