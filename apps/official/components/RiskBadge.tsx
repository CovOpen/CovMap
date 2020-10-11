import { makeStyles, Theme } from "@material-ui/core/styles";
import React, { FunctionComponent } from "react";

const boxColorsByRiskScore = { 0: "#219653", 1: "#EEC341", 2: "#E84C4C" };

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
      background: ({ riskScore }) => boxColorsByRiskScore[riskScore],
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
