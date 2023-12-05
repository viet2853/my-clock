import React from "react";
import "./style.css";
import {
  DAY_NAMES,
  MONTH_NAMES,
  generateCalendar,
} from "../../../utils/date-picker";

export default function DatePicker() {
  const [selectedDate, setSelectedDate] = React.useState(new Date());
  const [today, setToday] = React.useState(new Date());
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth();

  const handleNextMonth = () => {
    setToday((prev) => {
      return new Date(prev.setMonth(prev.getMonth() + 1));
    });
  };

  const handlePrevMonth = () => {
    setToday((prev) => new Date(prev.setMonth(prev.getMonth() - 1)));
  };

  const handleSelectDate = (day: string | number) => {
    setSelectedDate(new Date(currentYear, currentMonth, Number(day)));
  };

  const handleSelectMonth = (month: string | number) => {
    setToday((prev) => new Date(prev.setMonth(Number(month))));
  };

  const compareDay = (day: string | number) => {
    const date = new Date(currentYear, currentMonth, Number(day));
    return (
      date.getDate() === selectedDate.getDate() &&
      date.getMonth() === selectedDate.getMonth() &&
      date.getFullYear() === selectedDate.getFullYear()
    );
  };

  return (
    <div className="calendar">
      <div className="calendar-header">
        <div className="month-picker-wrapper">
          <span className="month-picker-label">
            {MONTH_NAMES[currentMonth]} {currentYear}
          </span>
          <ul className="month-picker-dropdown">
            {MONTH_NAMES.map((month, index) => (
              <li
                className={`month-picker-dropdown-item ${
                  currentMonth === index ? "active" : ""
                }`}
                onClick={() => handleSelectMonth(index)}
                key={index}
              >
                {month}
              </li>
            ))}
          </ul>
        </div>
        <div className="month-changer">
          <span className="month-change" onClick={handlePrevMonth}>
            <pre>{`<`}</pre>
          </span>
          <span className="month-change" onClick={handleNextMonth}>
            <pre>{`>`}</pre>
          </span>
        </div>
      </div>
      <div className="calendar-body">
        <div className="calendar-week-day">
          {DAY_NAMES.map((name, index) => (
            <div key={index}>{name}</div>
          ))}
        </div>
        <div className="calendar-days">
          {generateCalendar(currentMonth, currentYear).map((day, index) => (
            <div
              key={index}
              className={
                !!day
                  ? compareDay(day)
                    ? "calendar-day-hover curr-date"
                    : "calendar-day-hover"
                  : ""
              }
              onClick={() => !!day && handleSelectDate(day)}
            >
              {day}
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </div>
          ))}
        </div>
      </div>
      <div className="calendar-footer">
        <div className="btn">Cancel</div>
        <div className="btn">Ok</div>
      </div>
    </div>
  );
}
