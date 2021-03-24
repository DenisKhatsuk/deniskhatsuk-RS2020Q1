export function getCurrentDate(timezone, language = 'en-GB') {
  const DATE = new Date();
  const options = {
    timeZone: timezone,
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    // second: '2-digit',
  };
  const localDateString = DATE.toLocaleString(language, options);
  const localDateStringArray = localDateString.split(',');
  const [weekday, monthAndDay, time] = localDateStringArray;
  const [month, day] = monthAndDay.trim().split(' ');
  return `${weekday} ${day} ${month} ${time}`;
}

export function getShortDate(dateUnix, language = 'en-GB') {
  const msInSecond = 1000;
  const dateInMs = dateUnix * msInSecond;
  const DATE = new Date(dateInMs);
  const options = {
    weekday: 'long',
  };
  return DATE.toLocaleString(language, options);
}
