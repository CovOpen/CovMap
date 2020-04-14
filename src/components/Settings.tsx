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
import { VisualId, AppApi } from '../state/app';
import { useThunkDispatch } from "../useThunkDispatch";
import { config } from "../../app-config/index"
import { Mappable, LayerGroup } from "app-config.types";

const useStyles = makeStyles((theme) => ({
  fab: {
    position: 'absolute',
    bottom: theme.spacing(4),
    left: theme.spacing(2),
    zIndex: 1100
  },
  popoverContent: {
    padding: theme.spacing(2),
    touchAction: 'none',
  }
}));

export function Settings () {
  const dispatch = useThunkDispatch();
  const classes = useStyles();
  const [settingsAnchorEl, setSettingsAnchorEl] = useState(null);
  const currentVisual = useSelector((state: State) => state.app.currentVisual);
  const currentMappable = useSelector((state: State) => state.app.currentMappable);
  const currentLayerGroup = useSelector((state: State) => state.app.currentLayerGroup);
  const visual = config.visuals[currentVisual]
  const currentMapping = visual.mappings[visual.defaultMapping]
  
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
      id="settings-popover"
      style={{ touchAction: 'none' }} 
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
        <div>
          <FormControl>
            <InputLabel id="visual-type-label">Visual Type</InputLabel>
            <Select
              style={{ touchAction: 'none' }}
              labelId="visual-type-label"
              id="visual-type-select"
              value={currentVisual}
              onChange={(event) => dispatch(AppApi.setCurrentVisual(event.target.value as VisualId))}
            >
              {Object.keys(config.visuals).map(key => (
                <MenuItem key={key} style={{ touchAction: 'none' }} value={key}>{config.visuals[key].name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div style={{ marginTop: 16 }}>
          <FormControl>
            <InputLabel id="mappable-label">Karten Wert</InputLabel>
            <Select
              style={{ touchAction: 'none' }}
              labelId="mappable-label"
              id="mappable-select"
              value={currentMappable.property}
              onChange={(event) => dispatch(AppApi.setCurrentMappable(
                currentMapping.mappables.find(mappable => (mappable.property === event.target.value)) as Mappable
              ))}
            >
              {currentMapping.mappables.map(mappable => (
                <MenuItem key={mappable.property} style={{ touchAction: 'none' }} value={mappable.property}>{mappable.title}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        {visual.layerGroups &&
          <div style={{ marginTop: 16 }}>
            <FormControl>
              <InputLabel id="layer-group-label">Karten Wert</InputLabel>
              <Select
                style={{ touchAction: 'none' }}
                labelId="layer-group-label"
                id="layer-group-select"
                value={currentLayerGroup.title}
                onChange={(event) => {
                  const group = visual.layerGroups?.find(group => (group.title === event.target.value)) as LayerGroup
                  dispatch(AppApi.setLayerGroup(group))
                  dispatch(AppApi.mergeViewport({
                    pitch: group.pitch || 0,
                    bearing: group.bearing || 0
                  }))
                }}
              >
                {visual.layerGroups?.map(group => (
                  <MenuItem key={group.title} style={{ touchAction: 'none' }} value={group.title}>{group.title}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
        }
      </div>
    </Popover>
  </>)
}