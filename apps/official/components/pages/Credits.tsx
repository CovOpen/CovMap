import React from "react";
import Typography from "@material-ui/core/Typography";
import { Grid, makeStyles } from "@material-ui/core";
import { NavigationTitle } from "app-config/components/NavigationTitle";
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
    "width": "100%",
    "max-width": "140px",
    "height": "auto",
    "display": "block",
    "margin-top": "10px",
    "margin-left": "auto",
    "margin-right": "auto",
    "max-height": "90px",
    "object-fit": "contain",
  },
  logo_container: {},
  logo_small: {
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
          <NavigationTitle title={"Über die CovMap"} />

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
            CovMap ist ein Gemeinschaftsprojekt der Charité - Universitätsmedizin Berlin, des Hasso-Plattner-Instituts
            (HPI) und der Firma NET CHECK.
          </Typography>
          <Typography variant="h2">Projektleitung:</Typography>
          <Typography variant="body1">
            Charité: Dr. med. Alexander H. Thieme, M. Sc. <br />
            Gesamtkonzept, CovMap, Datenanalyse Symptome
            <br />
            <br />
            HPI: Prof. Dr. Christoph Lippert
            <br />
            Datenanalyse, Modellerstellung, Prognosen
            <br />
            <br />
            NET CHECK: PD. Dr. Sten Rüdiger <br />
            Datenanalyse GPS-Daten, Kontakt-Index
          </Typography>
          <Typography variant="h2">
            <br />
            Die CovMap App wurde mit der Unterstützung von zahlreichen Personen und Unternehmen entwickelt. Wir möchten
            an dieser Stelle unseren großen Dank aussprechen.
            <br />
          </Typography>
          <Typography variant="body1">Wir danken den Unternehmen:</Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={3} className={classes.logo_container}>
              <img className={classes.logo_small} src="images/credits/portbluesky.png"></img>
            </Grid>
            <Grid item xs={12} sm={9}>
              <Typography variant="body1">
                Port Blue Sky: für die technische Unterstüzung der App durch Ihre Mitarbeiter sowie das Organisieren von
                weiterer Unterstützung aus der Node.js Community.
              </Typography>
            </Grid>
            <Grid item xs={12} sm={3} className={classes.logo_container}>
              <img className={classes.logo_small} src="images/credits/pwc.png"></img>
            </Grid>
            <Grid item xs={12} sm={9}>
              <Typography variant="body1">PWC: für Lob, Kritik und Rat bei der Umsetzung der CovMap.</Typography>
            </Grid>
            <Grid item xs={12} sm={3} className={classes.logo_container}>
              <img className={classes.logo_small} src="images/credits/maptiler.png"></img>
            </Grid>
            <Grid item xs={12} sm={9}>
              <Typography variant="body1">Maptiler: für die Unterstützung in Form von Kartendaten.</Typography>
            </Grid>
          </Grid>
        </section>
        <section>
          <Typography variant="body1">
            Ganz besonders möchten wir folgenden Personen danken:
            <br />
          </Typography>
          <Typography variant="body1">
            {contributors.contributors.map((el, i) => (
              <p>
                {" - "}
                <a href={el.profile} target="_blank" rel="noopener">
                  {el.name + (i == contributors.contributors.length - 1 ? "" : " ")}
                </a>
              </p>
            ))}
          </Typography>
        </section>
      </main>
    </>
  );
};
