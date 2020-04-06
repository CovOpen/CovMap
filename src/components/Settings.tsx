import React, { useState } from "react";
import { useSelector } from "react-redux";
import Fab from '@material-ui/core/Fab';
import Popover from '@material-ui/core/Popover';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import LayersIcon from '@material-ui/icons/Layers'
import LayersClearIcon from '@material-ui/icons/LayersClear'
import { makeStyles } from '@material-ui/core/styles';

import { State } from "../state";
import { VisualType, AppApi } from '../state/app';
import { useThunkDispatch } from "../useThunkDispatch";

const useStyles = makeStyles((theme) => ({
  fab: {
    position: 'absolute',
    top: theme.spacing(2),
    left: theme.spacing(2),
    zIndex: 1100
  },
  popoverContent: {
    padding: theme.spacing(2),
  }
}));

export function Settings () {
  const dispatch = useThunkDispatch();
  const classes = useStyles();
  const [settingsAnchorEl, setSettingsAnchorEl] = useState(null);
  const visualType = useSelector((state: State) => state.app.visualType); // TODO
  
  const handleSettingsClick = (event) => {
    setSettingsAnchorEl(event.currentTarget);
  }

  const handleSettingsClose = () => {
    setSettingsAnchorEl(null);
  };
  const settingsOpen = Boolean(settingsAnchorEl);
  
  return (<>
    <Fab className={classes.fab} color="primary" aria-label="settings" onClick={handleSettingsClick}>
      {settingsOpen ? <LayersClearIcon /> : <LayersIcon />}
    </Fab>
    <Popover 
      open={settingsOpen}
      onClose={handleSettingsClose}
      anchorEl={settingsAnchorEl}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'left',
      }}
    >
      <div className={classes.popoverContent}>
        <FormControl>
          <InputLabel id="demo-simple-select-label">Visual Type</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={visualType}
            onChange={(event) => dispatch(AppApi.setVisualType(event.target.value as VisualType))}
          >
            <MenuItem value={VisualType.POSTCODE}>Post Code Areas</MenuItem>
            <MenuItem value={VisualType.HEATMAP}>Heatmap</MenuItem>
          </Select>
        </FormControl>
      </div>
    </Popover>
  </>)
}