import React from "react";
import { FeatureInfoProps } from "../../../src/app-config.types";
import { Card, CardContent, CardHeader, IconButton, Typography } from "@material-ui/core";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import { RiskBadge } from "app-config/components/RiskBadge";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  action: {
    alignSelf: "auto",
    marginTop: 0,
    marginLeft: "8px",
  },
});

const titleByRiskScore = {
  0: "Normales Risiko",
  1: "Mittleres Risiko",
  2: "Hohes Risiko",
};

const descriptionByRiskScore = {
  1: "Ein mittleres Risiko kann bei mehreren Szenarien bestehen: Entweder ist die Zahl der Neuinfektionen über 20 Neuinfektionen pro 100.000 Einwohner oder das Kontaktverhalten der Bevölkerung oder die Symptomlast ist erhöht, so dass die Zahl der Neuinfektionen demnächst weiter ansteigen könnte. Bitte die AHA + L Regeln beachten. Wir empfehlen darüber hinaus, die Anzahl der Kontakte freiwillig weitestgehend zu reduzieren.",
};

export const CovMapFeatureInfo = ({ feature, onClose, rawData }: FeatureInfoProps) => {
  const { action } = useStyles();
  console.log(rawData);
  const { N: locationName, Id: zipCode, R: riskScore } = rawData;
  const title = titleByRiskScore[riskScore];
  const riskDescription = descriptionByRiskScore[riskScore];
  return (
    <Card>
      <CardHeader
        avatar={<RiskBadge riskScore={riskScore} />}
        action={
          <IconButton aria-label="more">
            <ArrowForwardIosIcon />
          </IconButton>
        }
        classes={{ action }}
        title={title}
        /* TODO: Should this be bold? It is bold in the design,
            but not in our theme, so this seems to be the only place
            where we use bold in the app. */
        titleTypographyProps={{ variant: "h1" }}
        subheader={`${zipCode} ${locationName}`}
      />
      <CardContent>
        <Typography>{riskDescription}</Typography>
      </CardContent>
    </Card>
  );
};
