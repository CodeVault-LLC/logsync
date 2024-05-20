export const formatDate = (date: string) => {
  const d = new Date(date);
  const month = d.toLocaleString("en", { month: "short" });

  const day = d.getDate();
  const dayString = day < 10 ? `0${day}` : day;

  const hours = d.getHours();
  const hoursString = hours < 10 ? `0${hours}` : hours;

  const minutes = d.getMinutes();
  const minutesString = minutes < 10 ? `0${minutes}` : minutes;

  const seconds = d.getSeconds();
  const secondsString = seconds < 10 ? `0${seconds}` : seconds;

  const milliseconds = d.getMilliseconds();

  return `${month} ${dayString} ${hoursString}:${minutesString}:${secondsString}.${milliseconds}`;
};

export const formatMonitorDate = (date: string) => {
  //date: 2024-05-19 23:15:28.075591 +0200 CEST
  console.log(date);
  // to: 19 May 23:15:28 - 2024
  const d = new Date(date);
  const month = d.toLocaleString("en", { month: "short" });

  const day = d.getDate();
  const dayString = day < 10 ? `0${day}` : day;

  const hours = d.getHours();
  const hoursString = hours < 10 ? `0${hours}` : hours;

  const minutes = d.getMinutes();
  const minutesString = minutes < 10 ? `0${minutes}` : minutes;

  return `${dayString} ${month} ${hoursString}:${minutesString} - ${d.getFullYear()}`;
};
