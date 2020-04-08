import React from "react";
import Slider from '@material-ui/core/Slider';
import { makeStyles } from '@material-ui/core/styles';

import { useThunkDispatch } from "../useThunkDispatch";
import { formatNowMinusDays } from '../lib/formatUTCDate.js';
import { fetchDataset } from "../state/thunks/fetchDataset"

export type Props = {
  onChange: Function | null;
}

const useStyles = makeStyles((theme) => ({
  slider: {
    position: "absolute",
    bottom: theme.spacing(4),
    right: theme.spacing(2),
    // marginLeft: theme.spacing(4),
    top: theme.spacing(4),
    zIndex: 1200,
    height: 'calc(100% - 100px) !important',
    touchAction: 'none',
  },
}));

export function TimeRangeSlider ({ onChange = () => {} }: Props) {
  const classes = useStyles();
  const dispatch = useThunkDispatch();
  
  function valuetext(value) {
    return formatNowMinusDays(value);
  }
  
  let timeout: any = 0;
  function onDayChange(event, value) {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      const dateString = formatNowMinusDays(value);
      dispatch(fetchDataset(dateString));
      (onChange as Function)(dateString);
    }, 400);
  }

  return (
    <Slider
      orientation="vertical" 
      className={classes.slider}
      defaultValue={0}
      getAriaValueText={valuetext}
      onChange={onDayChange}
      aria-labelledby="discrete-slider-small-steps"
      step={1}
      marks
      min={-30}
      max={0}
      valueLabelDisplay="auto"
    />
  );
}