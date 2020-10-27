import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Card, Grid } from "@material-ui/core";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";

import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";

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
  teaser: {
    "border": 0,
    "background": "#2979ff",
    "color": "white",
    "textTransform": "none",
    "padding": theme.spacing(4, 2),
    "&:last-child": {
      paddingBottom: theme.spacing(4, 2), // make the cards symmetric by removing the huge padding bottom
    },
  },

  centerIcon: {
    margin: "0 auto",
    display: "block",
  },
}));

export const RiskRecommendation: React.FC<{ contactScore: ContactScore; incidence: number }> = ({
  contactScore,
  incidence,
}): JSX.Element => {
  const classes = useStyles();

  return (
    <Link to="/risk-levels" style={{ textDecoration: "none" }} aria-label="go to explanation">
      <Card className={classes.teaser}>
        <Grid container direction="row" alignItems="center" spacing={2}>
          <Grid item xs={10}>
            <Typography variant="body2">{riscExplanation(contactScore, incidence)}</Typography>
          </Grid>
          <Grid item xs={2}>
            <ArrowForwardIosIcon className={classes.centerIcon} fontSize="small" />
          </Grid>
        </Grid>
      </Card>
    </Link>
  );
};
