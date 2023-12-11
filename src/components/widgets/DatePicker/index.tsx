import { useRef, useState } from "react";

import { formatDateDDMMYYY } from "../../../utils/date-picker";
import useOnClickOutside from "../../../hooks/userOnClickOutside";
import Input from "../../elements/Input";
import { CalendarIcon } from "../../elements/Icon";
import { TDialogHandle } from "../../elements/Dialog";
import DatePickerDialog from "./Dialog";

const DatePicker = () => {
  const datePickerRef = useRef<HTMLDivElement>(null);
  const datePickerDialogRef = useRef<TDialogHandle>(null);
  const datePickerInputRef = useRef<HTMLInputElement>(null);

  const [value, setValue] = useState<Date | undefined>();

  const onOk = (v?: Date) => {
    setValue(v);
  };

  useOnClickOutside(datePickerRef, () => {
    datePickerDialogRef.current?.onOpen(false);
  });

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
      <DatePickerDialog ref={datePickerDialogRef} onOk={onOk} />
    </div>
  );
};
export default DatePicker;
