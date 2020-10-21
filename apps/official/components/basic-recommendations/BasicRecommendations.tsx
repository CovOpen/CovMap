import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Link, RouteProps } from "react-router-dom";
import { Card, CardContent, Grid, IconButton, Typography } from "@material-ui/core";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import { useSelector } from "react-redux";

import { State } from "../../../../src/state";
import { formatUTCDate } from "../../../../src/lib/formatUTCDate";
import NoContactsIcon from "../../static/images/no-contacts.svg";
import DistanceIcon from "../../static/images/distance.svg";
import HygieneIcon from "../../static/images/hand-washing.svg";
import MaskIcon from "../../static/images/mask.svg";
import VentilationIcon from "../../static/images/fresh-air.svg";
import RegionalIcon from "../../static/images/checklist.svg";
import { ActionTexts } from "../../static/texts/ActionTexts";

const useStyles = makeStyles({
  teaser: {
    border: 0,
    background: "#2979ff",
    color: "white",
  },
  action: {
    alignSelf: "auto",
    marginTop: "8px",
    marginLeft: "8px",
  },
  leftText: {
    textAlign: "left",
  },
  subHeader: {
    textAlign: "left",
    fontWeight: "bold",
  },
});

const Header = (): JSX.Element => {
  return (
    <Grid container direction="row" alignItems="center">
      <Grid item>
        <IconButton component={Link} to="/" aria-label="go back to map">
          <ArrowBackIosIcon color="action" />
        </IconButton>
      </Grid>
      <Grid item>
        <Typography variant="h1">{ActionTexts.TITLE}</Typography>
      </Grid>
    </Grid>
  );
};

const CountyTeaser = ({ county, url }: { county: string; url: string }): JSX.Element => {
  const classes = useStyles();
  const teaser = `${ActionTexts.COUNTY_TEASER_1}${county}${ActionTexts.COUNTY_TEASER_2}`;

  return (
    <Card className={classes.teaser}>
      <CardContent>
        <Grid container direction="row" spacing={2}>
          <Grid item xs={10}>
            <Typography variant="body1" className={classes.leftText}>
              {teaser}
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <IconButton href={url} target="_blank" color="primary" aria-label="show risk level explanations">
              <ArrowForwardIosIcon fontSize="small" />
            </IconButton>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

const FinalTeaser = (): JSX.Element => {
  const classes = useStyles();
  return (
    <Card className={classes.teaser}>
      <CardContent>
        <Typography variant="body1" className={classes.leftText}>
          {ActionTexts.FINAL_TEASER}
        </Typography>
      </CardContent>
    </Card>
  );
};

const Intro = (): JSX.Element => {
  const classes = useStyles();
  return (
    <Grid container direction="column" spacing={4}>
      <Grid item>
        <Typography variant="body1" className={classes.leftText}>
          {ActionTexts.INTRO_TEASER_1}
        </Typography>
      </Grid>
      <Grid item>
        <Typography variant="body1" className={classes.subHeader}>
          {ActionTexts.INTRO_TEASER_2}
        </Typography>
      </Grid>
    </Grid>
  );
};

const ContactSection = (): JSX.Element => {
  const classes = useStyles();
  return (
    <div>
      <Grid container direction="row">
        <Grid item xs={3}>
          <NoContactsIcon />
        </Grid>
        <Grid item xs={9}>
          <Typography variant="h1" className={classes.leftText}>
            {ActionTexts.CONTACT_HEADLINE}
          </Typography>
        </Grid>
      </Grid>
      <Typography variant="body1" className={classes.leftText}>
        {ActionTexts.CONTACT_TEXT}
      </Typography>
    </div>
  );
};

const DistanceSection = (): JSX.Element => {
  const classes = useStyles();
  return (
    <div>
      <Grid container direction="row">
        <Grid item xs={3}>
          <DistanceIcon />
        </Grid>
        <Grid item xs={9}>
          <Typography variant="h1" className={classes.leftText}>
            {ActionTexts.DISTANCE_HEADLINE}
          </Typography>
        </Grid>
      </Grid>
      <Typography variant="body1" className={classes.leftText}>
        {ActionTexts.DISTANCE_TEXT}
      </Typography>
    </div>
  );
};

const MaskSection = (): JSX.Element => {
  const classes = useStyles();
  return (
    <div>
      <Grid container direction="row">
        <Grid item xs={3}>
          <MaskIcon />
        </Grid>
        <Grid item xs={9}>
          <Typography variant="h1" className={classes.leftText}>
            {ActionTexts.MASK_HEADLINE}
          </Typography>
        </Grid>
      </Grid>
      <Typography variant="body1" className={classes.leftText}>
        {ActionTexts.MASK_TEXT}
      </Typography>
    </div>
  );
};

const VentilationSection = (): JSX.Element => {
  const classes = useStyles();
  return (
    <div>
      <Grid container direction="row">
        <Grid item xs={3}>
          <VentilationIcon />
        </Grid>
        <Grid item xs={9}>
          <Typography variant="h1" className={classes.leftText}>
            {ActionTexts.VENTILATION_HEADLINE}
          </Typography>
        </Grid>
      </Grid>
      <Typography variant="body1" className={classes.leftText}>
        {ActionTexts.VENTILATION_TEXT}
      </Typography>
    </div>
  );
};

const HygieneSection = (): JSX.Element => {
  const classes = useStyles();
  return (
    <div>
      <Grid container direction="row">
        <Grid item xs={3}>
          <HygieneIcon />
        </Grid>
        <Grid item xs={9}>
          <Typography variant="h1" className={classes.leftText}>
            {ActionTexts.HYGIENE_HEADLINE}
          </Typography>
        </Grid>
      </Grid>
      <Typography variant="body1" className={classes.leftText}>
        {ActionTexts.HYGIENE_TEXT}
      </Typography>
    </div>
  );
};

const RegionalSection = (): JSX.Element => {
  const classes = useStyles();
  return (
    <div>
      <Grid container direction="row">
        <Grid item xs={3}>
          <RegionalIcon />
        </Grid>
        <Grid item xs={9}>
          <Typography variant="h1" className={classes.leftText}>
            {ActionTexts.REGIONAL_HEADLINE}
          </Typography>
        </Grid>
      </Grid>
      <Typography variant="body1" className={classes.leftText}>
        {ActionTexts.REGIONAL_TEXT}
      </Typography>
    </div>
  );
};

interface DistrictData {
  county: string;
  howToBehaveUrl: string;
}

function loadDistrictData(location): DistrictData {
  const id = new URLSearchParams(location?.search).get("IdDistrict");
  const dataSets = useSelector((state: State) => state.app.datasets);
  const currentDate = useSelector((state: State) => state.app.currentDate);

  const dateKey = formatUTCDate(currentDate);
  const set = dataSets.get(`${dateKey}-contact-index`);
  const current = set?.data[id as string];

  return {
    county: `${current.locationName}`,
    howToBehaveUrl: `${current.howToBehaveUrl}`,
  };
}

export const BasicRecommendations = ({ location }: RouteProps): JSX.Element => {
  const { county, howToBehaveUrl } = loadDistrictData(location);

  return (
    <>
      <main className="sections">
        <section>
          <Header />
        </section>
        <section>{<CountyTeaser county={county} url={howToBehaveUrl} />}</section>
        <section>
          <Intro />
        </section>
        <section>
          <ContactSection />
        </section>
        <section>
          <DistanceSection />
        </section>
        <section>
          <MaskSection />
        </section>
        <section>
          <VentilationSection />
        </section>
        <section>
          <HygieneSection />
        </section>
        <section>
          <RegionalSection />
        </section>
        <section>
          <FinalTeaser />
        </section>
      </main>
    </>
  );
};
