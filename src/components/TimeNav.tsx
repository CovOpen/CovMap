import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import { useSelector } from "react-redux";
import Fab from '@material-ui/core/Fab';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';

import { useThunkDispatch } from "../useThunkDispatch";
import { plusDays } from '../lib/formatUTCDate.js';
import { State } from "../state";
import { AppApi } from "../state/app";
import { config } from 'app-config/index'
import { TimeRangeSlider } from './TimeRangeSlider'

const useStyles = makeStyles((theme) => ({
  root: {
    position: "absolute",
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    left: theme.spacing(11),
    bottom: theme.spacing(5),
    zIndex: 1200,
    width: 'calc(100% - 172px) !important',
    touchAction: 'none',
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingRight: theme.spacing(2),
    width: 110,
  },
  [theme.breakpoints.down('xs')]: {
    root: {
      width: '100vw !important',
      justifyContent: 'center',
      left: 0
    },
    buttonContainer: {
      width: '90',
      paddingRight: 0,
      paddingLeft: theme.spacing(2),
      justifyContent: 'space-between'
    }
  }
}));

export function TimeNav () {
  const classes = useStyles();
  const dispatch = useThunkDispatch();
  const currentDate = useSelector((state: State) => state.app.currentDate);

  const onNextClick = () => {

  }

  const onPrevClick = () => {
    
  }

  return (
    <div className={classes.root}>
      <div className={classes.buttonContainer}>
        <Fab color="primary" aria-label="zoom in" onClick={onPrevClick} size='small' >
          <NavigateBeforeIcon />
        </Fab>
        <Fab color="primary" aria-label="zoom in" onClick={onNextClick} size='small' >
          <NavigateNextIcon />
        </Fab>
      </div>  
      <TimeRangeSlider />
    </div>
  );
}
