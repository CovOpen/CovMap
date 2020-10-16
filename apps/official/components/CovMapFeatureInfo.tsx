import React, { useState } from "react";
import { FeatureInfoProps } from "../../../src/app-config.types";
import { Link as RouterLink } from 'react-router-dom';
import { Card, Button, CardContent, CardHeader, Drawer, Grid, IconButton, Theme, Typography, useTheme } from "@material-ui/core";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import { RiskBadge } from "app-config/components/RiskBadge";
import { makeStyles } from "@material-ui/core/styles";
import { ContactScore, RawDataEntry, RiskScore } from "app-config/models";
import useMediaQuery from "@material-ui/core/useMediaQuery";

const useStyles = makeStyles<Theme, { fullScreen: boolean }>((theme) => ({
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
    textAlign: "center",
    "& p": {
      fontWeight: "bold",
      margin: theme.spacing(1, 0)
    },
    "& a": {
      padding: theme.spacing(1.4, 8),
      borderRadius: theme.shape.borderRadius * 2
    }
  }
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

const descriptionByRiskScore = {
  // TODO: Add missing descriptions
  // TODO: Update description with shorter text
  [RiskScore.Medium]:
    "Ein mittleres Risiko kann bei mehreren Szenarien bestehen: Entweder ist die Zahl der Neuinfektionen über 20 Neuinfektionen pro 100.000 Einwohner oder das Kontaktverhalten der Bevölkerung oder die Symptomlast ist erhöht, so dass die Zahl der Neuinfektionen demnächst weiter ansteigen könnte. Bitte die AHA + L Regeln beachten. Wir empfehlen darüber hinaus, die Anzahl der Kontakte freiwillig weitestgehend zu reduzieren.",
};

export const CovMapFeatureInfo = ({ feature, onClose, rawData }: FeatureInfoProps) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const { recommendationsLink, action, card, container, expand, expandOpen, drawerPaper, drawerRoot, drawerPaperAnchorBottom } = useStyles({
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
  const riskDescription = descriptionByRiskScore[riskScore];

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
      subheader={`${zipCode} ${locationName}`}
    />
  );

  const cardContent = (
    <CardContent>
      <Grid container direction="column" spacing={2}>
        {/* TODO: Comment this back in once the risk descriptions are updated */}
        {/*<Grid item>*/}
        {/*  <Typography>{riskDescription}</Typography>*/}
        {/*</Grid>*/}
        <Grid item>
          <Card variant="outlined" className={card}>
            <CardHeader
              title="Kontaktverhalten der Bevölkerung"
              titleTypographyProps={{ variant: "h3" }}
              action={titleByContactScore[contactScore]}
              classes={{ action }}
            />
          </Card>
        </Grid>
        <Grid item>
          <Card variant="outlined" className={card}>
            <CardHeader
              title="Symptomlast der Bevölkerung"
              titleTypographyProps={{ variant: "h3" }}
              subheader="Bald verfügbar!"
            // TODO: Instead of subheader, show actual data
            // action={symptomIndex}
            // classes={{ action }}
            />
          </Card>
        </Grid>
        <Grid item>
          <Card variant="outlined" className={card}>
            <CardHeader
              title="Fallzahlen RKI"
              titleTypographyProps={{ variant: "h3" }}
              action={new Intl.NumberFormat("de-de", { maximumFractionDigits: 1, minimumFractionDigits: 1 }).format(
                incidence,
              )}
              classes={{ action }}
            />
          </Card>
        </Grid>
        <Grid item className={recommendationsLink}>
          <Typography>
            Wie kann ich mich verhalten?
          </Typography>
          <Button component={RouterLink} to="/recommendations" variant="contained" color="secondary">
            Weiter
          </Button>
        </Grid>
      </Grid>
    </CardContent>
  );

  return (
    <>
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
    </>
  );
};
