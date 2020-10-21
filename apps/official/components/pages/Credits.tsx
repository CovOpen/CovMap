import React from "react";
import Typography from "@material-ui/core/Typography";
import { Grid, makeStyles, Paper } from "@material-ui/core";
const contributors = require("json-loader!./../../../../.all-contributorsrc");
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  logobar: {
    padding: theme.spacing(2),
  },
  logo: {
    "textAlign": "center",
    "width": "80px",
    "height": "auto",
    "display": "block",
    "margin": "auto",
    "margin-right": "auto",
  },
  centered: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}));
export const Credits = () => {
  const classes = useStyles();

  return (
    <>
      <main className="sections">
        <section>
          <Typography variant="h1">Über die CovMap</Typography>
          <div className={(classes.root, classes.logobar)}>
            <Grid container spacing={3}>
              <Grid item xs={4} className={classes.centered}>
                <img className={classes.logo} src="images/credits/charite.svg"></img>
              </Grid>
              <Grid item xs={4} className={classes.centered}>
                <img className={classes.logo} src="images/credits/hpi.jpg"></img>
              </Grid>
              <Grid item xs={4} className={classes.centered}>
                <img className={classes.logo} src="images/credits/netcheck.png"></img>
              </Grid>
            </Grid>
          </div>
          <Typography variant="body1">
            CovMap ist ein Gemeinschaftsprojekt der Charité, des Hasso Plattner Instituts und der Firma NETCHECK.
          </Typography>
        </section>
        <section>
          <Typography variant="body1">
            An der Entwicklung dieser App sind und waren verschiedene Personen und Unternehmen beteiligt, diesen möchten
            wir an dieser Stelle danken.
          </Typography>
          <Typography variant="h2">Personen</Typography>
          {contributors.contributors.map((el, i) => (
            <p>
              {" - "}
              <a href={el.profile} target="_blank" rel="noopener">
                {el.name + (i == contributors.contributors.length - 1 ? "" : "\n")}
              </a>
            </p>
          ))}
          <Typography variant="body1"></Typography>
        </section>
        <section>
          <Typography variant="h2">Unternehmen</Typography>
          <Typography variant="body1">
            <div className={classes.root}>
              <Grid container spacing={3}>
                <Grid item xs={2} className={classes.centered}>
                  <img className={classes.logo} src="images/credits/PortBlueSky.png"></img>
                </Grid>
                <Grid item xs={10}>
                  Port Blue Sky für die technische Unterstüzung der App durch Ihre Mitarbeiter sowie das Organisieren
                  von weiterer Unterstützung durch Voluntäre aus der Node.js Community.
                </Grid>
                <Grid item xs={2} className={classes.centered}>
                  <img className={classes.logo} src="images/credits/pwc.jpg"></img>
                </Grid>
                <Grid item xs={10}>
                  PWC - Für Lob, Kritik und Rat bei der Umsetzung der CovMap.
                </Grid>
                <Grid item xs={2} className={classes.centered}>
                  <img className={classes.logo} src="images/credits/maptiler.png"></img>
                </Grid>
                <Grid item xs={10}>
                  Maptiler für die Unterstützung in Form von Kartendaten.
                </Grid>
              </Grid>
            </div>
          </Typography>
          <Typography variant="body1"></Typography>
        </section>
      </main>
    </>
  );
};
