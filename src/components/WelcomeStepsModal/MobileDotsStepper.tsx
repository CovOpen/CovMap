import { MobileStepper } from "@material-ui/core";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { StepConfig, welcomeStepsConfig } from "./welcomeStepsConfig";

const useStyles = makeStyles(() => ({
  dot: {
    width: "12px",
    height: "12px",
    backgroundColor: "#E0E0E0",
    margin: "0 4px",
  },
  dotActive: {
    backgroundColor: "#2274E3",
  },
  dotsRoot: {
    background: "#FFFFFF",
    marginBottom: "28px",
  },
}));

export const MobileDotsStepper: React.FC<{ currentStepConfig: StepConfig }> = (props) => {
  const classes = useStyles();

  if (props.currentStepConfig.dotProgressNumber === undefined) {
    return <div style={{ height: "28px" }} />;
  }

  const numberOfStepsWithProgressDots = welcomeStepsConfig.filter(
    ({ dotProgressNumber }) => dotProgressNumber !== undefined,
  ).length;

  return (
    <MobileStepper
      classes={{
        root: classes.dotsRoot,
        dot: classes.dot,
        dotActive: classes.dotActive,
      }}
      variant="dots"
      steps={numberOfStepsWithProgressDots}
      activeStep={props.currentStepConfig.dotProgressNumber}
      position="static"
      backButton={null}
      nextButton={null}
    />
  );
};
