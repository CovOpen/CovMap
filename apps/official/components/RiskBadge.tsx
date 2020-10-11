import { makeStyles, Theme } from "@material-ui/core/styles";
import React, { FunctionComponent } from "react";

const boxColorsByRiskScore = (theme: Theme) => ({
  0: theme.palette.lowRisk.main,
  1: theme.palette.mediumRisk.main,
  2: theme.palette.highRisk.main,
});

const useStyles = makeStyles<Theme, Props, string>((theme) => {
  return {
    box: {
      borderRadius: "2px",
      height: "46px",
      width: "27px",
      fontSize: "17px",
      lineHeight: "20px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "#FFFFFF",
      background: ({ riskScore }) => boxColorsByRiskScore(theme)[riskScore],
    },
  };
});

export interface Props {
  riskScore: 0 | 1 | 2;
}

export const RiskBadge: FunctionComponent<Props> = ({ riskScore }) => {
  const { box, medium } = useStyles({ riskScore });
  return <div className={`${box} ${medium}`}>{riskScore + 1}</div>;
};
