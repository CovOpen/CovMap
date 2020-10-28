import { config } from "app-config/index";
import moment from "moment";

export function formatUTCDate(date) {
  const shiftedDate = moment(date).add((config.dateOffset || 0), 'hours');
  
  return shiftedDate.format('YYYY-MM-DD')
}

const oneDay = 1000 * 60 * 60 * 24;

export const formatNowMinusDays = (days) => formatUTCDate(plusDays(days));
export const plusDays = (days) => new Date(Date.now() + oneDay * days);
