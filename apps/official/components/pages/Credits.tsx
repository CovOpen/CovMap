import React from "react";
import Typography from "@material-ui/core/Typography";
import { Grid, makeStyles } from "@material-ui/core";
import { NavigationTitle } from "app-config/components/NavigationTitle";
import { useTranslation } from "react-i18next";
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
  const { t } = useTranslation("translation");

  return (
    <>
      <main className="sections">
        <section>
          <NavigationTitle title={t("pages.about")} />

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
          <Typography variant="body1">{t("credits.project-description")}</Typography>
          <Typography variant="h2">{t("credits.project-management.title")}:</Typography>
          <Typography variant="body1" style={{ whiteSpace: "break-spaces" }}>
            {t("credits.project-management.text")}
          </Typography>
          <Typography variant="h2">
            <br />
            {t("credits.appreciation.title")}
            <br />
          </Typography>
          <Typography variant="body1">{t("credits.appreciation.intro")}:</Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={3} className={classes.logo_container}>
              <img className={classes.logo_small} src="images/credits/portbluesky.png"></img>
            </Grid>
            <Grid item xs={12} sm={9}>
              <Typography variant="body1">{t("credits.appreciation.port-blue-sky")}</Typography>
            </Grid>
            <Grid item xs={12} sm={3} className={classes.logo_container}>
              <img className={classes.logo_small} src="images/credits/pwc.png"></img>
            </Grid>
            <Grid item xs={12} sm={9}>
              <Typography variant="body1">{t("credits.appreciation.pwc")}</Typography>
            </Grid>
            <Grid item xs={12} sm={3} className={classes.logo_container}>
              <img className={classes.logo_small} src="images/credits/maptiler.png"></img>
            </Grid>
            <Grid item xs={12} sm={9}>
              <Typography variant="body1">{t("credits.appreciation.maptiler")}</Typography>
            </Grid>
          </Grid>
        </section>
        <section>
          <Typography variant="body1">
            {t("credits.appreciation.contributors-intro")}:
            <br />
          </Typography>
          <div>
            {contributors.contributors.map((el, i) => (
              <Typography key={el.profile}>
                {" - "}
                <a href={el.profile} target="_blank" rel="noopener">
                  {el.name + (i == contributors.contributors.length - 1 ? "" : " ")}
                </a>
              </Typography>
            ))}
          </div>
        </section>
      </main>
    </>
  );
};
