import { useRef, useState } from "react";
import Input from "../../elements/Input";
import DatePickerDialog, { TDatePickerDialogHandle } from "./Dialog";
import { CalendarIcon } from "../../elements/Icon";
import useOnClickOutside from "../../../hooks/userOnClickOutside";
import { formatDateDDMMYYY } from "../../../utils/date-picker";
import "./style.css";

export default function DatePicker() {
  const datePickerRef = useRef<HTMLDivElement>(null);
  const datePickerDialogRef = useRef<TDatePickerDialogHandle>(null);
  const datePickerInputRef = useRef<HTMLInputElement>(null);

  const [value, setValue] = useState<Date>();

  useOnClickOutside(datePickerRef, () =>
    datePickerDialogRef.current?.onOpen(false)
  );

  const onOk = (v: Date) => {
    setValue(v);
    datePickerDialogRef.current?.onOpen(false);
  };

  return (
    <div className="date-picker" ref={datePickerRef}>
      <Input
        ref={datePickerInputRef}
        rightElement={{
          element: <CalendarIcon />,
          onCLick: () => {
            datePickerDialogRef.current?.onOpen(true);
            datePickerInputRef.current?.focus();
          },
        }}
        value={value ? formatDateDDMMYYY(value) : value}
      />
      <DatePickerDialog ref={datePickerDialogRef} onOk={onOk} />
    </div>
  );
}
