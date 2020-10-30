import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import { useSelector } from "react-redux";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core";
import { Link, useHistory } from "react-router-dom";
import { State } from "../../state";
import { StepConfig, welcomeStepsConfig } from "./welcomeStepsConfig";
import { MobileDotsStepper } from "./MobileDotsStepper";
import { useCommonWelcomeModalStyles } from "./useCommonWelcomeModalStyles";

function getStepConfig(stepName?: string): StepConfig | undefined {
  return welcomeStepsConfig.find(({ name }) => name === stepName);
}

export const WelcomeStepsModal: React.FC<{ subPage?: string }> = (props) => {
  const classes = useCommonWelcomeModalStyles();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const history = useHistory();

  const userPostalCode = useSelector((state: State) => state.app.userPostalCode);

  const currentStepConfig = getStepConfig(props.subPage);

  if (currentStepConfig === undefined) {
    return null;
  }

  const renderNextButton = () =>
    currentStepConfig.next ? (
      <div>
        <Button
          className={`${classes.primaryButton} ${classes.largeText}`}
          variant="contained"
          color="primary"
          component={Link}
          to={currentStepConfig.next}
        >
          Weiter
        </Button>
      </div>
    ) : null;

  const renderSkipButton = () =>
    currentStepConfig.skip ? (
      <div>
        <Button
          className={`${classes.secondaryButton} ${classes.largeText}`}
          variant="contained"
          component={Link}
          to={currentStepConfig.skip}
        >
          Überspringen
        </Button>
      </div>
    ) : null;

  const onClose = () => {
    if (currentStepConfig.closeable) {
      history.goBack();
    }
  };

  return (
    <div>
      <Dialog open={userPostalCode === null} fullScreen={fullScreen} onClose={onClose}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <currentStepConfig.Component />
          {renderNextButton()}
          {renderSkipButton()}
          <MobileDotsStepper currentStepConfig={currentStepConfig} />
        </div>
      </Dialog>
    </div>
  );
};
