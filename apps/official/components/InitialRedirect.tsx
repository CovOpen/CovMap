import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";

import { welcomeStepsConfig } from "./WelcomeStepsModal/welcomeStepsConfig";
import { State } from "../../../src/state";

export const InitialRedirect: React.FC = () => {
  const history = useHistory();
  const urlParams = useParams<{ subPage?: string }>();
  const userPostalCode = useSelector((state: State) => state.app.userPostalCode);

  const isCurrentPageWelcomeScreen = welcomeStepsConfig.find(({ name }) => name === urlParams.subPage) !== undefined;

  useEffect(() => {
    if (userPostalCode === null && !isCurrentPageWelcomeScreen) {
      history.push(welcomeStepsConfig[0].name);
    }
  }, [userPostalCode, urlParams]);

  return null;
};
