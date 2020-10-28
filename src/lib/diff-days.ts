import { Moment } from "moment";

export const diffDays = (date1: Moment, date2: Moment): number => {
  const diffTime = Math.abs(date2.valueOf() - date1.valueOf());
  return Math.round(diffTime / (1000 * 60 * 60 * 24));
};
