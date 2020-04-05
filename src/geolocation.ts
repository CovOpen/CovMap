export let hasGeolocation = false;
if (navigator && navigator.geolocation) {
  hasGeolocation = true;
}

export async function promiseCurrentPosition(options) {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject, options);
  });
}

export function getCurrentPosition(success, error, options = {
  enableHighAccuracy: true,
  timeout: 60000,
  maximumAge: 0
}) {
  navigator.geolocation.getCurrentPosition(success, error, options);
}