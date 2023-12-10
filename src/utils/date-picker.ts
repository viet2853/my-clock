export const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const DAY_NAMES = ["S", "M", "T", "W", "T", "F", "S"];

const isLeapYear = (year: number) => {
  return (
    (year % 4 === 0 && year % 100 !== 0 && year % 400 !== 0) ||
    (year % 100 === 0 && year % 400 === 0)
  );
};

const getFebDays = (year: number) => {
  return isLeapYear(year) ? 29 : 28;
};

export const getListYear = (from: number = 1900) =>
  Array.from(new Array(200), (v, i) => i + from);

export const generateCalendar = (month?: number, year?: number) => {
  let currDate = new Date();
  if (!month) month = currDate.getMonth();
  if (!year) year = currDate.getFullYear();

  const daysOfMonth = [
    31,
    getFebDays(year),
    31,
    30,
    31,
    30,
    31,
    31,
    30,
    31,
    30,
    31,
  ];
  const firstDay = new Date(year, month, 1);

  const calendarDays = [];
  for (let i = 0; i < daysOfMonth[month] + firstDay.getDay(); i++) {
    if (i >= firstDay.getDay()) {
      calendarDays.push(i - firstDay.getDay() + 1);
    } else {
      calendarDays.push("");
    }
  }
  return calendarDays;
};

export const formatDateDDMMYYY = (date?: Date) => {
  if (!date) return "";

  let day = "" + date.getDate();
  let month = "" + (date.getMonth() + 1);
  const year = date.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return `${day}/${month}/${year}`;
};
