import { config } from "app-config/index";
import moment, { Moment } from "moment";

export function formatUTCDate(date: Moment) {
  const shiftedDate = moment(date).add(config.dateOffset || 0, "hours");

  return shiftedDate.format("YYYY-MM-DD");
}

export const formatNowMinusDays = (days) => formatUTCDate(plusDays(days));
export const plusDays = (days) =>
  moment
    .utc()
    .add(config.dateOffset || 0, "hours")
    .add(days, "days");
