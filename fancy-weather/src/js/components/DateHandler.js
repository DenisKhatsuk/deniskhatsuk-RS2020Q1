function getCurrentDate(language = 'en-US') {
  const DATE = new Date();
  const options = {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  };
  return DATE.toLocaleString(language, options);
}

export default {
  getCurrentDate,
};
