import React, { useState } from "react";
import { FeatureInfoProps } from "../../../src/app-config.types";
import { Button, Card, CardContent, CardHeader, Collapse, Grid, IconButton, Typography } from "@material-ui/core";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import { RiskBadge } from "app-config/components/RiskBadge";
import { makeStyles } from "@material-ui/core/styles";
import { ContactScore, RawDataEntry, RiskScore } from "app-config/models";

const useStyles = makeStyles((theme) => ({
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
  const { action, card, container, expand, expandOpen } = useStyles();
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
  return (
    <Card className={container}>
      <CardHeader
        avatar={<RiskBadge riskScore={riskScore} />}
        action={
          <IconButton
            className={`${expand} ${expanded ? expandOpen : ""}`}
            onClick={toggleExpand}
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
      <Collapse in={expanded} timeout="auto" unmountOnExit>
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
            <Grid item>
              <Button href={howToBehaveUrl} fullWidth variant="contained" color="secondary">
                Wie sollte ich mich verhalten?
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Collapse>
    </Card>
  );
};
