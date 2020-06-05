function getCurrentDate(language = 'en-US') {
  const DATE = new Date();
  const options = {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  };
  return DATE.toLocaleString(language, options);
}

function getShortDate(dateUnix, language = 'en-US') {
  const dateInMs = dateUnix * 1000;
  const DATE = new Date(dateInMs);
  const options = {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  };
  return DATE.toLocaleString(language, options);
}

export default {
  getCurrentDate,
  getShortDate,
};
