import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Typography } from "@material-ui/core";
import { RiskTexts } from "../../static/texts/RiskTexts";
import RiskScoreNormalIcon from "../../static/images/risk-score-1.svg";
import RiskScoreMediumIcon from "../../static/images/risk-score-2.svg";
import RiskScoreHighIcon from "../../static/images/risk-score-3.svg";
import { NavigationTitle } from "app-config/components/NavigationTitle";
import ContactsMediumBackgroundIcon from "../../static/images/contacts-medium-background.svg";

const useStyles = makeStyles({
  leftText: {
    textAlign: "left",
  },
});

export const RiskLevelsPage = () => {
  const classes = useStyles();

  return (
    <>
      <main className="sections">
        <section>
          <NavigationTitle title="Risikostufen" backToExpandedFeatureInfo={true} />
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
