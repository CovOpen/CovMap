import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Typography } from "@material-ui/core";
import RiskScoreNormalIcon from "../../static/images/risk-score-1.svg";
import RiskScoreMediumIcon from "../../static/images/risk-score-2.svg";
import RiskScoreHighIcon from "../../static/images/risk-score-3.svg";
import { NavigationTitle } from "app-config/components/NavigationTitle";

// FOR TRANSLATION -->
const NORMAL = "Die Zahl der Neuinfektionen ist niedrig, das Kontaktverhalten ist ausreichend reduziert und die Symptomlast ist normal. Ein normales Risiko bedeutet allerdings nicht, dass gar keine Infektionen in der Region möglich sind";
const MEDIUM = "Die Zahl der Neuinfektionen oder das Kontaktverhalten bzw. die Symptomlast der Bevölkerung ist erhöht, so dass die Zahl der Neuinfektionen demnächst weiter ansteigen könnte. Wir rufen dazu auf, die Anzahl der Kontakte freiwillig zu reduzieren.";
const HIGH = "Die Zahl der Neuinfektionen ist stark erhöht. Wir rufen dazu auf, die Anzahl der Kontakte freiwillig weitestgehend zu reduzieren.";
// <-- FOR TRANSLATION

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
            {NORMAL}
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
            {MEDIUM}
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
            {HIGH}
          </Typography>
        </section>
      </main>
    </>
  );
};
