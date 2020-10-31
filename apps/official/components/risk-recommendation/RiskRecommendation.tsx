import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Accordion, AccordionDetails, AccordionSummary } from "@material-ui/core";

import Typography from "@material-ui/core/Typography";

import { ContactScore, RiskScore } from "../../models";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { titleByRiskScore } from "app-config/components/CovMapFeatureInfo";

function riscExplanation(contactScore: number, incidence: number): string {
  if (incidence < 20 && contactScore <= 0) {
    return "Die Zahl der Neuinfektionen ist niedrig und das Kontaktverhalten ist ausreichend reduziert. Ein normales Risiko bedeutet nicht, dass keine Neuinfektionen in der Region möglich sind.";
  }

  let explanation = "";

  if (incidence >= 50) {
    explanation = "Die Zahl der Neuinfektionen ist stark erhöht. ";
    if (contactScore == 1) {
      explanation +=
        "Aufgrund eines erhöhten Kontaktverhalten gehen wir von einem weiteren Anstieg der Neuinfektionen aus. ";
    }
    explanation += "Wir rufen dazu auf, Kontakte freiwillig auf das Allernötigste zu reduzieren.";
    return explanation;
  }

  if (incidence >= 20) {
    explanation = "Die Zahl der Neuinfektionen ist mäßig erhöht. ";
  }
  if (contactScore == 1) {
    explanation +=
      "Aufgrund eines erhöhten Kontaktverhalten gehen wir von einem weiteren Anstieg der Neuinfektionen aus. ";
  }
  explanation += "Wir rufen dazu auf, Kontakte freiwillig zu reduzieren.";
  return explanation;
}

const useStyles = makeStyles((theme) => ({
  accordion: {
    background: "#F2F2F2",
    padding: theme.spacing(1),
  },
  summary: {
    padding: theme.spacing(1),
  },
  expandIcon: {
    margin: "0 auto",
    display: "block",
  },
}));

export const RiskRecommendation: React.FC<{ contactScore: ContactScore; incidence: number; riskScore: RiskScore }> = ({
  contactScore,
  incidence,
  riskScore,
}): JSX.Element => {
  const classes = useStyles();

  return (
    <Accordion className={classes.accordion}>
      <AccordionSummary
        classes={{ expandIcon: classes.expandIcon, root: classes.summary }}
        expandIcon={<ExpandMoreIcon />}
      >
        <Typography variant="h3">Was bedeutet {titleByRiskScore[riskScore]}?</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography>{riscExplanation(contactScore, incidence)}</Typography>
      </AccordionDetails>
    </Accordion>
  );
};
