import React from "react";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { useSelector } from "react-redux";

import type { State } from "../state";
import { useThunkDispatch } from "src/useThunkDispatch";
import { AppApi } from "src/state/app";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export const GlobalSnackbar = () => {
  const dispatch = useThunkDispatch();
  const snackbarMessage = useSelector((state: State) => state.app.snackbarMessage);

  return (
    <Snackbar
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
      open={!snackbarMessage.done}
      autoHideDuration={snackbarMessage.duration || 6000}
      onClose={() => {
        dispatch(
          AppApi.setSnackbarMessage({
            ...snackbarMessage,
            done: true,
          }),
        );
      }}
    >
      <Alert severity={snackbarMessage.type}>{snackbarMessage.text}</Alert>
    </Snackbar>
  );
};
