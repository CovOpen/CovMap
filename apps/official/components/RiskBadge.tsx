import { makeStyles, Theme } from "@material-ui/core/styles";
import React, { FunctionComponent } from "react";
import { RiskScore } from "app-config/models";
import { Typography } from "@material-ui/core";

const boxColorsByRiskScore = (theme: Theme) => ({
  [RiskScore.Low]: theme.palette.lowRisk.main,
  [RiskScore.Medium]: theme.palette.mediumRisk.main,
  [RiskScore.High]: theme.palette.highRisk.main,
});

const riskNumberByRiskScore = {
  [RiskScore.Low]: 1,
  [RiskScore.Medium]: 2,
  [RiskScore.High]: 3,
};

const useStyles = makeStyles<Theme, Props, string>((theme) => {
  return {
    box: {
      borderRadius: "2px",
      height: "46px",
      width: "27px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "#FFFFFF",
      background: ({ riskScore }) => boxColorsByRiskScore(theme)[riskScore],
    },
  };
});

export interface Props {
  riskScore: RiskScore;
}

export const RiskBadge: FunctionComponent<Props> = ({ riskScore }) => {
  const classes = useStyles({ riskScore });
  return (
    <div className={classes.box}>
      <Typography variant="h3">{riskNumberByRiskScore[riskScore]}</Typography>
    </div>
  );
};
