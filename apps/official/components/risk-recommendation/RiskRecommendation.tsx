import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Paper } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import { ContactScore } from "../../models";
import { useTranslation } from "react-i18next";
import { TFunction } from "i18next";

function riscExplanation(t: TFunction, contactScore: number, incidence: number): string {
  if (incidence < 20 && contactScore <= 0) {
    return t("risk-recommendation.low");
  }

  let explanation = "";

  if (incidence >= 50) {
    explanation = t("risk-recommendation.high.intro");
    if (contactScore == 1) {
      explanation += t("risk-recommendation.contact-score-info");
    }
    explanation += t("risk-recommendation.high.outro");
    return explanation;
  }

  if (incidence >= 20) {
    explanation = t("risk-recommendation.medium.intro");
  }
  if (contactScore == 1) {
    explanation += t("risk-recommendation.contact-score-info");
  }
  explanation += t("risk-recommendation.high.outro");
  return explanation;
}

const useStyles = makeStyles((theme) => ({
  paper: {
    background: "#F2F2F2",
    padding: theme.spacing(2),
  },
}));

export const RiskRecommendation: React.FC<{ contactScore: ContactScore; incidence: number }> = ({
  contactScore,
  incidence,
}): JSX.Element => {
  const classes = useStyles();
  const { t } = useTranslation("translation");

  return (
    <Paper className={classes.paper} elevation={0}>
      <Typography>{riscExplanation(t, contactScore, incidence)}</Typography>
    </Paper>
  );
};
