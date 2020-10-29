import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import moment, { Moment } from "moment";
import type { State } from "../state";
import { useThunkDispatch } from "src/useThunkDispatch";
import { AppApi } from "src/state/app";
import { config } from "app-config/index";

let dayChangeTimeout;
let startDate: Moment;

export const AutoProgressDate = () => {
  const dispatch = useThunkDispatch();
  const currentDate = useSelector((state: State) => state.app.currentDate);

  const setNewDay = () => {
    const newDate = moment().add(1, "minute");
    const offsetCurrent = moment(currentDate).add(config.dateOffset || 0, "hours");

    if (startDate.dayOfYear() === offsetCurrent.dayOfYear()) {
      dispatch(AppApi.setCurrentDate(newDate));
    }

    waitForNewDay(newDate);
  };

  const waitForNewDay = (from: Moment) => {
    startDate = moment(from).add(config.dateOffset || 0, "hours");
    const diff = startDate.diff(moment(from).endOf("day"));
    dayChangeTimeout = setTimeout(setNewDay, Math.abs(diff));
  };

  useEffect(() => {
    if (!dayChangeTimeout) {
      waitForNewDay(currentDate);
    }
  }, []);

  return null;
};
