import React from 'react';
import { useSelector } from "react-redux";
import LinearProgress from '@material-ui/core/LinearProgress';
import { makeStyles } from '@material-ui/core/styles';

import { State } from "../state";

const useStyles = makeStyles((theme) => ({
  progress: {
    width: '100%',
    position: 'absolute',
    bottom: 0,
    left: 0,
    zIndex: 1200
  },
}));

export function IntermediateProgress () {
  const classes = useStyles();
  const loading = useSelector((state: State) => state.app.loading);
  
  if (loading.size === 0) {
    return null;
  }

  return (<LinearProgress className={classes.progress} />);
}