import React from 'react';
import { useSelector } from "react-redux";
import LinearProgress from '@material-ui/core/LinearProgress';
import { makeStyles } from '@material-ui/core/styles';

import { State } from "../state";

const useStyles = makeStyles((theme) => ({
  progress: {
    width: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 1200,
    height: '5px'
  },
}));

export function IntermediateProgress () {
  const classes = useStyles();
  const loading = useSelector((state: State) => state.app.isLoading);
  
  if (!loading) {
    return null;
  }

  return (<LinearProgress color="secondary" className={classes.progress} />);
}