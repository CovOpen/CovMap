import React, { useState } from "react";
import { useSelector } from "react-redux";
import Fab from '@material-ui/core/Fab';
import Select from '@material-ui/core/Select';
import AddIcon from '@material-ui/icons/Add'
import SubtractIcon from '@material-ui/icons/Remove'
import { makeStyles } from '@material-ui/core/styles';

import { State } from "../state";
import { useThunkDispatch } from "../useThunkDispatch";
import { zoomIn } from "../state/thunks/handleZoom"

const useStyles = makeStyles((theme) => ({
  zoomIn: {
    position: 'absolute',
    bottom: theme.spacing(14),
    right: theme.spacing(2),
    zIndex: 1100
  },
  zoomOut: {
    position: 'absolute',
    bottom: theme.spacing(8),
    right: theme.spacing(2),
    zIndex: 1100
  }
}));


export function Zoom () {
  const dispatch = useThunkDispatch();
  const classes = useStyles();
  const [settingsAnchorEl, setSettingsAnchorEl] = useState(null);
  
  const onZoomInClick = (event) => {
    dispatch(zoomIn())
  }

  const handleSettingsClose = () => {
    setSettingsAnchorEl(null);
  };
  const settingsOpen = Boolean(settingsAnchorEl);
  
  return (<>
    <Fab className={classes.zoomIn} color="inherit" aria-label="zoom" onClick={onZoomInClick} size='small' >
      { <AddIcon />}
    </Fab>
    <Fab className={classes.zoomOut} color="inherit" aria-label="zoom" onClick={onZoomInClick} size='small' variant='round'>
      { <SubtractIcon />}
    </Fab>
    
  </>)
}