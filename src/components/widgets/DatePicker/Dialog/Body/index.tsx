import React from "react";
import styles from "./style.module.css";

import {
  DAY_NAMES,
  generateCalendar,
  getListYear,
} from "../../../../../utils/date-picker";

type TBody = {
  isShowYear: boolean;
  currentMonth: number;
  currentYear: number;
  selectedDate?: Date;
  handleSelectYear: (y: number) => void;
  handleSelectDay: (d: number | string) => void;
};

export default function Body({
  handleSelectYear,
  isShowYear,
  currentMonth,
  currentYear,
  selectedDate,
  handleSelectDay,
}: TBody) {
  const currentDate = new Date();

  const isCurrentDay = (day: string | number) => {
    const date = new Date(currentYear, currentMonth, Number(day));
    return (
      date.getDate() === currentDate.getDate() &&
      date.getMonth() === currentDate.getMonth() &&
      date.getFullYear() === currentDate.getFullYear()
    );
  };

  const isSelectedDay = (day: string | number) => {
    const date = new Date(currentYear, currentMonth, Number(day));
    return (
      date.getDate() === selectedDate?.getDate() &&
      date.getMonth() === selectedDate?.getMonth() &&
      date.getFullYear() === selectedDate?.getFullYear()
    );
  };

  return (
    <div className={styles.wrapper}>
      {isShowYear ? (
        <div className={styles.years}>
          {getListYear().map((year, index) => (
            <div
              key={index}
              className={currentYear === year ? styles.selected : ""}
              onClick={() => handleSelectYear(year)}
            >
              {year}
            </div>
          ))}
        </div>
      ) : (
        <>
          <div className={styles.weekDays}>
            {DAY_NAMES.map((name, index) => (
              <div key={index}>{name}</div>
            ))}
          </div>
          <div className={styles.monthDays}>
            {generateCalendar(currentMonth, currentYear).map((day, index) => (
              <div
                key={index}
                className={
                  !!day
                    ? isSelectedDay(day)
                      ? styles.selected
                      : isCurrentDay(day)
                      ? styles.current
                      : styles.hoverEffect
                    : ""
                }
                onClick={() => !!day && handleSelectDay(day)}
              >
                {day}
                <span></span>
                <span></span>
                <span></span>
                <span></span>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
