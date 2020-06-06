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
  const localDateString = DATE.toLocaleString(language, options);
  const localDateStringArray = localDateString.split(',');
  const [weekday, monthAndDay, time] = localDateStringArray;
  const [month, day] = monthAndDay.trim().split(' ');
  return `${weekday} ${day} ${month} ${time}`;
}

function getShortDate(dateUnix, language = 'en-US') {
  const dateInMs = dateUnix * 1000;
  const DATE = new Date(dateInMs);
  const options = {
    weekday: 'long',
  };
  return DATE.toLocaleString(language, options);
}

export default {
  getCurrentDate,
  getShortDate,
};
