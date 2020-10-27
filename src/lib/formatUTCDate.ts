import { config } from "app-config/index";

export function formatUTCDate(date) {
  const shiftedDate = offsetDate(date);
  let month = shiftedDate.getUTCMonth() + 1;
  let day = shiftedDate.getUTCDate();
  const year = shiftedDate.getUTCFullYear();

  if (month < 10) {
    month = "0" + month;
  }
  if (day < 10) {
    day = "0" + day;
  }

  return `${year}-${month}-${day}`;
}

const oneDay = 1000 * 60 * 60 * 24;

export const formatNowMinusDays = (days) => formatUTCDate(plusDays(days));
export const plusDays = (days) => new Date(Date.now() + oneDay * days);
export const offsetDate = (date) => {
  return new Date(date.getTime() - (config.dateOffset || 0))
}
