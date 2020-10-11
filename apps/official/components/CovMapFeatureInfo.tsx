import React from "react";
import { FeatureInfoProps } from "../../../src/app-config.types";
import { Card, CardHeader, IconButton } from "@material-ui/core";
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

export const CovMapFeatureInfo = ({ feature, onClose, rawData }: FeatureInfoProps) => {
  const { action } = useStyles();
  const riskScore = 1;
  const titleByRiskScore = {
    1: "Normales Risiko",
    2: "Mittleres Risiko",
    3: "Hohes Risiko",
  };
  const title = titleByRiskScore[riskScore];
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
        subheader="12345 Berlin (Mitte)"
      />
    </Card>
  );
};
