import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector } from "react-redux";
import Fab from "@material-ui/core/Fab";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";
import moment from "moment";

import { useThunkDispatch } from "../useThunkDispatch";
import { plusDays } from "../lib/formatUTCDate";
import { State } from "../state";
import { AppApi } from "../state/app";
import { TimeRangeSlider } from "./TimeRangeSlider";
import { diffDays } from "../lib/diff-days";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "absolute",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    left: theme.spacing(5),
    bottom: theme.spacing(5),
    zIndex: 1200,
    width: "calc(100% - 172px) !important",
    touchAction: "none",
    pointerEvents: "none",
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingRight: theme.spacing(2),
    width: 110,
    pointerEvents: "auto",
  },
  [theme.breakpoints.down("xs")]: {
    root: {
      width: "100vw !important",
      justifyContent: "center",
      left: 0,
    },
    buttonContainer: {
      width: "90",
      paddingRight: 0,
      paddingLeft: theme.spacing(2),
      justifyContent: "space-between",
    },
  },
}));

export function TimeNav() {
  const classes = useStyles();
  const dispatch = useThunkDispatch();
  const currentDate = useSelector((state: State) => state.app.currentDate);
  const [value, setValue] = useState<number>(() => {
    const today = moment.utc();
    const diff = diffDays(today, currentDate);

    return Math.min(diff, 0);
  });

  const onNextClick = () => {
    const newValue = value + 1;
    if (newValue > 0) {
      return;
    }
    setValue(newValue);
    const newDate = plusDays(newValue);
    dispatch(AppApi.setCurrentDate(newDate));
  };

  const onPrevClick = () => {
    const newValue = value - 1;
    if (newValue < -14) {
      return;
    }
    setValue(newValue);
    const newDate = plusDays(newValue);
    dispatch(AppApi.setCurrentDate(newDate));
  };

  return (
    <div className={classes.root}>
      <div className={classes.buttonContainer}>
        <Fab color="primary" aria-label="zoom in" onClick={onPrevClick} size="small">
          <NavigateBeforeIcon />
        </Fab>
        <Fab color="primary" aria-label="zoom in" onClick={onNextClick} size="small">
          <NavigateNextIcon />
        </Fab>
      </div>
      <TimeRangeSlider />
    </div>
  );
}
