import React, { useState } from "react";
import Slider from "@material-ui/core/Slider";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { useSelector } from "react-redux";
import Tooltip from "@material-ui/core/Tooltip";
import moment from "moment";
import { useTranslation } from "react-i18next";

import { useThunkDispatch } from "../useThunkDispatch";
import { formatNowMinusDays, plusDays } from "../lib/formatUTCDate";
import { State } from "../state";
import { AppApi } from "../state/app";
import { config } from "app-config/index";
import { diffDays } from "../lib/diff-days";

export type Props = {
  onChange?: Function | null;
};

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
})(Slider);

const useStyles = makeStyles((theme) => ({
  slider: {
    touchAction: "none",
    pointerEvents: "initial",
  },
  [theme.breakpoints.down("xs")]: {
    slider: {
      display: "none",
    },
  },
}));

const MAX_SLIDER_VALUE = 0;
let timeout: any = 0;

export function TimeRangeSlider({ onChange = () => {} }: Props) {
  const classes = useStyles();
  const dispatch = useThunkDispatch();
  const currentDate = useSelector((state: State) => state.app.currentDate);
  const [value, setValue] = useState<number>(() => {
    const today = moment.utc();
    const diff = diffDays(today, currentDate);

    return Math.min(diff, MAX_SLIDER_VALUE);
  });

  function valuetext(value) {
    return formatNowMinusDays(value);
  }

  function onSliderChange(event, value) {
    setValue(value);
  }

  function onDayChange(event, value) {
    const newDate = plusDays(value);
    const diff = diffDays(newDate, currentDate);

    if (diff === 0) {
      return;
    }

    clearTimeout(timeout);
    timeout = setTimeout(
      (t) => {
        (onChange as Function)(newDate);
        dispatch(AppApi.setCurrentDate(newDate));
      },
      150,
      timeout,
    );
  }

  return (
    <TouchSlider
      className={classes.slider}
      defaultValue={0}
      value={value}
      getAriaValueText={valuetext}
      onChange={onSliderChange}
      onChangeCommitted={onDayChange}
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

const SliderLabelTooltip = withStyles({
  tooltip: {
    fontSize: 20,
    marginBottom: 30,
  },
})(Tooltip);

function ValueLabelComponent({ children, open, value }: ValueLabelComponentProps) {
  const currentVisual = useSelector((state: State) => state.app.currentVisual);
  const visual = config.visuals[currentVisual];
  const { t } = useTranslation(["translation"]);
  const dateValue =
    typeof visual.dateFormat === "function"
      ? visual.dateFormat(t, { date: plusDays(value).toDate() })
      : moment(plusDays(value)).format(visual.dateFormat);

  return (
    <SliderLabelTooltip open={open} enterTouchDelay={0} placement="top" title={dateValue}>
      {children}
    </SliderLabelTooltip>
  );
}
