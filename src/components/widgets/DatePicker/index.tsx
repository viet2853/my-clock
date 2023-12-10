import { useRef, useState } from "react";
import Input from "../../elements/Input";
import { CalendarIcon } from "../../elements/Icon";
import useOnClickOutside from "../../../hooks/userOnClickOutside";
import { formatDateDDMMYYY } from "../../../utils/date-picker";
import Dialog, { TDialogHandle } from "../../elements/Dialog";
import Header from "./Header";
import Body from "./Body";

export default function DatePicker() {
  const datePickerRef = useRef<HTMLDivElement>(null);
  const datePickerDialogRef = useRef<TDialogHandle>(null);
  const datePickerInputRef = useRef<HTMLInputElement>(null);

  const [value, setValue] = useState<Date>(new Date()); // value of input

  const currentDate = new Date();
  const [selectedDate, setSelectedDate] = useState(currentDate);

  const [today, setToday] = useState(currentDate);
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth();

  const [isShowYear, setIsShowYear] = useState(false);

  useOnClickOutside(datePickerRef, () =>
    datePickerDialogRef.current?.onOpen(false)
  );

  const onOk = () => {
    setValue(selectedDate);
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
    <div ref={datePickerRef}>
      <Input
        ref={datePickerInputRef}
        readOnly
        rightElement={{
          element: <CalendarIcon />,
          onCLick: () => {
            datePickerDialogRef.current?.onToggle();
            datePickerInputRef.current?.focus();
          },
        }}
        value={formatDateDDMMYYY(value)}
      />
      <Dialog ref={datePickerDialogRef} onOk={onOk}>
        <>
          <Header
            currentMonth={currentMonth}
            currentYear={currentYear}
            onMonthPicker={() => setIsShowYear((prev) => !prev)}
            onNextMonth={handleNextMonth}
            onPrevMonth={handlePrevMonth}
          />
          <Body
            isShowYear={isShowYear}
            selectedDate={selectedDate}
            currentMonth={currentMonth}
            currentYear={currentYear}
            handleSelectDay={handleSelectDay}
            handleSelectYear={handleSelectYear}
          />
        </>
      </Dialog>
    </div>
  );
}
