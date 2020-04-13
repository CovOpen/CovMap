import React from "react";
import Slider from '@material-ui/core/Slider';
import ValueLabel from '@material-ui/core/Slider/ValueLabel';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { useSelector } from "react-redux";

import { useThunkDispatch } from "../useThunkDispatch";
import { formatNowMinusDays } from '../lib/formatUTCDate.js';
import { State } from "../state";
import { AppApi } from "../state/app";

export type Props = {
  onChange: Function | null;
}

const TouchSlider = withStyles({
  thumb: {
    height: 28,
    width: 28,
    marginTop: -14,
    marginLeft: -14,
  },
  mark: {
    height: 8,
    width: 1,
    marginTop: -3,
  },
})(Slider)

const useStyles = makeStyles((theme) => ({
  slider: {
    position: "absolute",
    left: theme.spacing(12),
    bottom: theme.spacing(4),
    zIndex: 1200,
    width: 'calc(100% - 180px) !important',
    touchAction: 'none',
  },
}));

export function TimeRangeSlider ({ onChange = () => {} }: Props) {
  const classes = useStyles();
  const dispatch = useThunkDispatch();
  const currentDay = useSelector((state: State) => state.app.currentDay);
  
  function valuetext(value) {
    return formatNowMinusDays(value);
  }
  
  let timeout: any = 0;
  function onDayChange(event, value) {
    if (currentDay === value) {
      return
    }
      
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      const dateString = formatNowMinusDays(value);
      dispatch(AppApi.setCurrentDay(value));
      (onChange as Function)(dateString);
    }, 400);
  }

  return (
    <TouchSlider
      className={classes.slider}
      defaultValue={0}
      value={currentDay}
      getAriaValueText={valuetext}
      onChange={onDayChange}
      aria-labelledby="discrete-slider-small-steps"
      step={1}
      marks
      min={-15}
      max={0}
      valueLabelDisplay="auto"
      ValueLabelComponent={ValueLabelComponent}
    />
  );
}

export type ValueLabelComponentProps = {
  children: any;
  open: boolean;
  value: number;
};

const CustomValueLabel = withStyles({
  
})(ValueLabel)

function ValueLabelComponent({ children, open, value }: ValueLabelComponentProps) {
  // TODO: Show selected date in this component
  return (
    <CustomValueLabel open={open} value={value}>
      {children}
    </CustomValueLabel>
  );
}