const optionsTime: Intl.DateTimeFormatOptions = {
  hour: '2-digit',
  minute: '2-digit',
  hour12: false, // Display time in 24-hour format
};

const optionsDate: Intl.DateTimeFormatOptions = {
  month: 'short',
  day: '2-digit',
};

export const formatUnixTimestamp = (
  timestamp: number,
  timezoneOffset: number = 0,
  onlyTime = false
): string | undefined => {
  if (!timestamp) return;

  const defaultTimezoneOffset = new Date().getTimezoneOffset() * 60;
  const adjustedTimestamp = (timestamp + timezoneOffset + defaultTimezoneOffset) * 1000;

  const date = new Date(adjustedTimestamp);
  const formattedTime = new Intl.DateTimeFormat('en-US', optionsTime).format(date);
  const formattedDate = new Intl.DateTimeFormat('en-US', optionsDate).format(date);
  if (onlyTime) {
    return formattedTime;
  }
  return `${formattedTime}, ${formattedDate}`;
};

export const formatTimezoneOffset = (offsetSeconds: number): string => {
  const offsetHours = offsetSeconds / 3600;
  const sign = offsetHours >= 0 ? '+' : '-';
  const absoluteOffsetHours = Math.abs(offsetHours);
  const hours = Math.floor(absoluteOffsetHours);
  const minutes = Math.floor((absoluteOffsetHours - hours) * 60);
  return `GMT${sign}${hours}:${String(minutes).padStart(2, '0')}`;
};
