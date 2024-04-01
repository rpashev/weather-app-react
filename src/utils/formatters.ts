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

type Grouped<T, K extends string | number> = Record<K, T[]>;

export function groupBy<T, K extends string | number>(
  arr: T[],
  getKey: (item: T) => K
): Grouped<T, K> {
  return arr.reduce(
    (acc, item) => {
      const key = getKey(item);
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(item);
      return acc;
    },
    {} as Grouped<T, K>
  );
}

export const getDayOfWeek = (dateString: string): string => {
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const date = new Date(dateString);
  const dayIndex = date.getDay();
  return daysOfWeek[dayIndex];
};

export const getDate = (dateString: string): string => {
  const date = new Date(dateString);
  const month = date.toLocaleString('default', { month: 'long' });
  const day = date.getDate();
  return `${month} ${day}`;
};
