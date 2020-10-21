import React, { useState } from "react";
import { FeatureInfoProps } from "../../../src/app-config.types";
import { Link as RouterLink } from "react-router-dom";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Chip,
  Drawer,
  Grid,
  IconButton,
  Theme,
  Typography,
  useTheme,
} from "@material-ui/core";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import { RiskBadge } from "app-config/components/RiskBadge";
import { makeStyles } from "@material-ui/core/styles";
import { ContactScore, RawDataEntry, RiskScore } from "app-config/models";
import { RiskRecommendation } from "./risk-recommendation/RiskRecommendation";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import ContactsLowIcon from "../static/images/contacts-low.svg";
import ContactsMediumIcon from "../static/images/contacts-medium.svg";
import SymptomsLowIcon from "../static/images/symptoms-low.svg";

const useStyles = makeStyles<Theme, { fullScreen: boolean }>((theme) => ({
  category: {},
  action: {
    alignSelf: "auto",
    marginTop: 0,
    marginLeft: "8px",
  },
  container: {
    maxWidth: "350px",
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(90deg)",
  },
  card: {
    // TODO: Extract into theme
    backgroundColor: "#FCFCFC",
  },
  drawerPaper: {
    width: (props) => (props.fullScreen ? "100%" : "450px"),
  },
  drawerRoot: {
    display: "flex",
    justifyContent: "center",
  },
  drawerPaperAnchorBottom: {
    left: "auto",
    right: "auto",
  },
  recommendationsLink: {
    "textAlign": "center",
    "& p": {
      fontWeight: "bold",
      margin: theme.spacing(1, 0),
    },
    "& a": {
      padding: theme.spacing(1.4, 8),
      borderRadius: theme.shape.borderRadius * 2,
    },
  },
}));

const titleByRiskScore = {
  [RiskScore.Low]: "Normales Risiko",
  [RiskScore.Medium]: "Mittleres Risiko",
  [RiskScore.High]: "Hohes Risiko",
};

const titleByContactScore = {
  [ContactScore.Low]: "Reduziert",
  [ContactScore.Medium]: "Zu hoch",
};

export const CovMapFeatureInfo = ({ feature, onClose, rawData }: FeatureInfoProps) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const {
    recommendationsLink,
    action,
    card,
    container,
    expand,
    expandOpen,
    drawerPaper,
    drawerRoot,
    drawerPaperAnchorBottom,
  } = useStyles({
    fullScreen,
  });
  const [expanded, setExpanded] = useState(false);

  function toggleExpand() {
    setExpanded((expanded) => !expanded);
  }

  const {
    locationName,
    IdDistrict: zipCode,
    riskScore,
    howToBehaveUrl,
    contactScore,
    incidence,
  } = rawData as RawDataEntry;
  const title = titleByRiskScore[riskScore];

  const cardHeader = (
    <CardHeader
      onClick={toggleExpand}
      avatar={<RiskBadge riskScore={riskScore} />}
      action={
        <IconButton
          className={`${expand} ${expanded ? expandOpen : ""}`}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ArrowForwardIosIcon />
        </IconButton>
      }
      classes={{ action }}
      title={title}
      titleTypographyProps={{ variant: "h1" }}
      subheader={locationName}
    ></CardHeader>
  );

  const ContactsIcon = ({ score }: { score: ContactScore }) => {
    switch (score) {
      case ContactScore.Low:
        return <ContactsLowIcon />;
      case ContactScore.Medium:
        return <ContactsMediumIcon />;
      default:
        return null;
    }
  };

  const ContactBehaviorCategory = (): JSX.Element => (
    <Card variant="outlined" className={card}>
      <CardContent>
        <Grid container direction="column" spacing={1}>
          <Grid item>
            <Chip size="small" label="beta"></Chip>
          </Grid>
          <Grid item>
            <Grid item>
              <Grid container direction="row" alignItems="center">
                <Grid item xs={8}>
                  <Typography variant="h3">Kontaktverhalten der Bevölkerung</Typography>
                </Grid>
                <Grid item xs={2}>
                  <ContactsIcon score={contactScore} />
                </Grid>
                <Grid item xs={2}>
                  <IconButton
                    color="primary"
                    aria-label="go to contact explanation"
                    component={RouterLink}
                    to="/contact-behavior"
                  >
                    <ArrowForwardIosIcon color="action" />
                  </IconButton>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );

  const SymptomLoadCategory = (): JSX.Element => (
    <Card variant="outlined" className={card}>
      <CardContent>
        <Grid container direction="column" spacing={1}>
          <Grid item>
            <Chip size="small" label="coming soon"></Chip>
          </Grid>
          <Grid item>
            <Grid item>
              <Grid container direction="row" alignItems="center">
                <Grid item xs={8}>
                  <Typography variant="h3">Symptomlast der Bevölkerung</Typography>
                </Grid>
                <Grid item xs={2}>
                  <SymptomsLowIcon />
                </Grid>
                <Grid item xs={2}>
                  <IconButton
                    color="primary"
                    aria-label="go to symptom explanation"
                    component={RouterLink}
                    to="/symptom-level"
                  >
                    <ArrowForwardIosIcon color="action" />
                  </IconButton>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );

  const CaseNumbersCategory = (): JSX.Element => {
    const format = new Intl.NumberFormat("de-de", { maximumFractionDigits: 1, minimumFractionDigits: 1 });

    const incidenceDisplay = format.format(incidence);

    return (
      <Card variant="outlined" className={card}>
        <CardContent>
          <Grid item>
            <Grid item>
              <Grid container direction="row" alignItems="center">
                <Grid item xs={8}>
                  <Typography variant="h3">7-Tages-Inzidenz (RKI)</Typography>
                </Grid>
                <Grid item xs={2}>
                  <Typography>{incidenceDisplay}</Typography>
                </Grid>
                <Grid item xs={2}>
                  <IconButton color="primary" aria-label="go to symptom explanation" component={RouterLink} to="/rki">
                    <ArrowForwardIosIcon color="action" />
                  </IconButton>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    );
  };

  const link = `/recommendations?IdDistrict=${zipCode}`;
  const cardContent = (
    <CardContent>
      <Grid container direction="column" spacing={2}>
        {/* TODO: Comment this back in once the risk descriptions are updated */}
        {/*<Grid item>*/}
        {/*  <Typography>{riskDescription}</Typography>*/}
        {/*</Grid>*/}
        <Grid item>{RiskRecommendation({ riskScore })}</Grid>
        <Grid item>
          <ContactBehaviorCategory />
        </Grid>
        <Grid item>
          <SymptomLoadCategory />
        </Grid>
        <Grid item>
          <CaseNumbersCategory />
        </Grid>
        <Grid item className={recommendationsLink}>
          <Typography>Wie kann ich mich verhalten?</Typography>
          <Button component={RouterLink} to={link} variant="contained" color="secondary">
            Weiter
          </Button>
        </Grid>
      </Grid>
    </CardContent>
  );

  return (
    <div style={{ pointerEvents: "auto" }}>
      <Card className={container}>{cardHeader}</Card>

      <Drawer
        open={expanded}
        variant="temporary"
        anchor="bottom"
        onClose={() => setExpanded(false)}
        classes={{ paper: drawerPaper, root: drawerRoot, paperAnchorBottom: drawerPaperAnchorBottom }}
      >
        {cardHeader}
        {cardContent}
      </Drawer>
    </div>
  );
};
