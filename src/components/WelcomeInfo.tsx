import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import { useSelector } from "react-redux";

import { AppApi } from "../state/app";
import { State } from "../state";
import { useThunkDispatch } from "../useThunkDispatch";
import { config } from "app-config/index";

export const WelcomeInfo = () => {
  const dispatch = useThunkDispatch();
  const currentVisual = useSelector((state: State) => state.app.currentVisual);
  const infoDialogs = useSelector((state: State) => state.app.infoDialogs);
  const InfoComponent = config.visuals[currentVisual].InfoComponent;
  const seen = InfoComponent && infoDialogs[currentVisual] === true;

  const handleClose = () => {
    dispatch(AppApi.setInfoDialog(currentVisual, true));
  };

  return (
    <div>
      <Dialog
        open={InfoComponent !== undefined && !seen}
        scroll={"paper"}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        {InfoComponent && <InfoComponent />}
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Schließen.
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
