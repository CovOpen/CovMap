export function dateInSecondsTimestamp(dateString: string) {
  return Math.round(Date.parse(dateString) / 1000);
}
