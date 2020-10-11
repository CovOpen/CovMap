import { makeStyles, Theme } from "@material-ui/core/styles";
import React, { FunctionComponent } from "react";

const boxColorsByRiskScore = { 1: "#219653", 2: "#EEC341", 3: "#E84C4C" };

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
  riskScore: 1 | 2 | 3;
}

export const RiskBadge: FunctionComponent<Props> = ({ riskScore }) => {
  const { box, medium } = useStyles({ riskScore });
  return <div className={`${box} ${medium}`}>{riskScore}</div>;
};
