import { ForwardRefRenderFunction, forwardRef, useState } from "react";
import Dialog, { TDialogHandle } from "../../../elements/Dialog";
import Header from "./Header";
import Body from "./Body";

type TDatePickerDialog = {
  onOk: (v?: Date) => void;
};
const DatePickerDialog: ForwardRefRenderFunction<
  TDialogHandle,
  TDatePickerDialog
> = ({ onOk }, ref) => {
  const currentDate = new Date();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();

  const [today, setToday] = useState(currentDate);
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth();

  const [isShowYear, setIsShowYear] = useState(false);

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
    <Dialog ref={ref} onOk={() => onOk(selectedDate)}>
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
  );
};
export default forwardRef(DatePickerDialog);
