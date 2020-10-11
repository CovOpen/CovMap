import React from "react";
import Fab from "@material-ui/core/Fab";
import InfoIcon from "@material-ui/icons/InfoOutlined";
import { useSelector } from "react-redux";

import { useThunkDispatch } from "../useThunkDispatch";
import { AppApi } from "../state/app";
import { State } from "../state";
import { config } from "app-config/index";

export function WelcomeInfoButton() {
  const dispatch = useThunkDispatch();
  const currentVisual = useSelector((state: State) => state.app.currentVisual);
  const InfoComponent = config.visuals[currentVisual].InfoComponent;

  if (InfoComponent === undefined) {
    return null;
  }

  const onInfoClick = () => {
    dispatch(AppApi.setInfoDialog(currentVisual, false));
  };

  return (
    <>
      <Fab color="primary" aria-label="Show welcome info" onClick={onInfoClick} size="small">
        <InfoIcon />
      </Fab>
    </>
  );
}
