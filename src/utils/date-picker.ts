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
