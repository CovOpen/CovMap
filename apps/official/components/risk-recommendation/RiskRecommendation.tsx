import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Paper } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import { ContactScore } from "../../models";

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

  return (
    <Paper className={classes.paper} elevation={0}>
      <Typography>{riscExplanation(contactScore, incidence)}</Typography>
    </Paper>
  );
};
