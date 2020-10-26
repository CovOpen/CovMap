import React from "react";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import SubtractIcon from "@material-ui/icons/Remove";
import { makeStyles } from "@material-ui/core/styles";

import { useThunkDispatch } from "../useThunkDispatch";
import { zoomIn, zoomOut } from "../state/thunks/handleZoom";

const useStyles = makeStyles((theme) => ({
  zoomIn: {
    position: "absolute",
    bottom: theme.spacing(11),
    right: theme.spacing(2),
    zIndex: 1090,
  },
  zoomOut: {
    position: "absolute",
    bottom: theme.spacing(5),
    right: theme.spacing(2),
    zIndex: 1090,
  },
}));

export function Zoom() {
  const dispatch = useThunkDispatch();
  const classes = useStyles();

  const onZoomInClick = () => {
    dispatch(zoomIn());
  };

  const onZoomOutClick = () => {
    dispatch(zoomOut());
  };

  return (
    <>
      <Fab className={classes.zoomIn} color="primary" aria-label="zoom in" onClick={onZoomInClick} size="small">
        <AddIcon />
      </Fab>
      <Fab className={classes.zoomOut} color="primary" aria-label="zoom out" onClick={onZoomOutClick} size="small">
        <SubtractIcon />
      </Fab>
    </>
  );
}
