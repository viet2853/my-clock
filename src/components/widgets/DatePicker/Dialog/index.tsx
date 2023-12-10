import React, {
  ForwardRefRenderFunction,
  forwardRef,
  useImperativeHandle,
  useState,
} from "react";
import "./style.css";
import {
  DAY_NAMES,
  MONTH_NAMES,
  generateCalendar,
  getListYear,
} from "../../../../utils/date-picker";

export type TDatePickerDialogHandle = { onOpen: (x: boolean) => void };

type TDatePickerDialog = {
  onOk?: (v: Date) => void;
};

const DatePickerDialog: ForwardRefRenderFunction<
  TDatePickerDialogHandle,
  TDatePickerDialog
> = ({ onOk }, ref) => {
  const currentDate = new Date();
  const [selectedDate, setSelectedDate] = useState(currentDate);

  const [today, setToday] = useState(currentDate);
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth();

  const [isShowYear, setIsShowYear] = useState(false);

  const [isOpen, setIsOpen] = useState<boolean>(false);

  useImperativeHandle(ref, () => ({
    onOpen: (x: boolean) => setIsOpen(x),
  }));

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
      date.getDate() === selectedDate.getDate() &&
      date.getMonth() === selectedDate.getMonth() &&
      date.getFullYear() === selectedDate.getFullYear()
    );
  };

  const handleNextMonth = () => {
    setToday((prev) => {
      return new Date(prev.setMonth(prev.getMonth() + 1));
    });
  };

  const handlePrevMonth = () => {
    setToday((prev) => new Date(prev.setMonth(prev.getMonth() - 1)));
  };

  const handleSelectDay = (day: string | number) => {
    setSelectedDate(new Date(currentYear, currentMonth, Number(day)));
  };

  const handleSelectYear = (year: number) => {
    setToday(new Date(year, currentMonth));
    setIsShowYear(false);
  };

  return (
    <div className={`dialog ${isOpen ? "open" : ""}`}>
      <div className="calendar-header">
        <div className="month-picker-wrapper">
          <span
            className="month-picker-label"
            onClick={() => setIsShowYear((prev) => !prev)}
          >
            {MONTH_NAMES[currentMonth]} {currentYear}
          </span>
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
        {isShowYear ? (
          <div className="calendar-years">
            {getListYear().map((year, index) => (
              <div
                key={index}
                className="year"
                onClick={() => handleSelectYear(year)}
              >
                {year}
              </div>
            ))}
          </div>
        ) : (
          <>
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
                      ? isSelectedDay(day)
                        ? "selected-day"
                        : isCurrentDay(day)
                        ? "current-day"
                        : "hover-effect"
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
      <div className="calendar-footer">
        <div className="btn" onClick={() => setIsOpen(false)}>
          Cancel
        </div>
        <div className="btn" onClick={() => onOk && onOk(selectedDate)}>
          Ok
        </div>
      </div>
    </div>
  );
};

export default forwardRef(DatePickerDialog);
