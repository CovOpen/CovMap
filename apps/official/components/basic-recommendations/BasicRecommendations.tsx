import React, { ReactElement } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useLocation } from "react-router-dom";
import { 
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button, 
  Card, 
  CardContent, 
  CircularProgress, 
  Grid, 
  Typography,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
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
import { NavigationTitle } from "app-config/components/NavigationTitle";

const useStyles = makeStyles({
  measurePanel: {

  },
  teaser: {
    border: 0,
    background: "#2979ff",
    color: "white",
    textTransform: "none",
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

const CountyTeaser = ({ county, url }: { county: string; url: string }): JSX.Element => {
  const classes = useStyles();
  
  const COUNTY_TEASER = "Informiere Dich hier über aktuelle Verhaltensregeln für ";  
  const teaser = `${COUNTY_TEASER}${county}`;

  return (
    <Button href={url} target="_blank" disableRipple>
      <Card className={classes.teaser}>
        <CardContent>
          <Grid container direction="row" alignItems="center" spacing={2}>
            <Grid item xs={10}>
              <Typography variant="body1" className={classes.leftText}>
                {teaser}
              </Typography>
            </Grid>
            <Grid item xs={2}>
              <ArrowForwardIosIcon fontSize="small" />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Button>
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

  const INTRO_TEASER_2 = "In den letzten Monaten konnte immer wieder gezeigt werden, dass ganz einfache Maßnahmen, die von jedem umgesetzt werden können, sehr viel Wirkung haben. ";

  return (
    <Grid item>
      <Typography variant="h2" className={classes.subHeader}>
        {INTRO_TEASER_2}
      </Typography>
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

function loadDistrictData(location): DistrictData | undefined {
  const id = new URLSearchParams(location?.search).get("IdDistrict");
  const dataSets = useSelector((state: State) => state.app.datasets);
  const currentDate = useSelector((state: State) => state.app.currentDate);

  const dateKey = formatUTCDate(currentDate);
  const set = dataSets.get(`${dateKey}-contact-index`);
  const current = set?.data[id as string];

  if (current === undefined) {
    return undefined;
  }

  return {
    county: `${current.locationName}`,
    howToBehaveUrl: `${current.howToBehaveUrl}`,
  };
}

export const BasicRecommendations = (): JSX.Element => {
  const location = useLocation();
  const districtData = loadDistrictData(location);
  
  const TITLE = "Wie kann ich mich verhalten?";

  return (
    <>
      <main className="sections">
        <section>
          <NavigationTitle title={TITLE} backToExpandedFeatureInfo={true} />
        </section>
        <section>
          {districtData !== undefined ? (
            <CountyTeaser county={districtData.county} url={districtData.howToBehaveUrl} />
          ) : (
            <div style={{ display: "flex", justifyContent: "center" }}>
              <CircularProgress />
            </div>
          )}
        </section>
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
