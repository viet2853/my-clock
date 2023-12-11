import { useRef, useState } from "react";
import Input from "../../elements/Input";
import { ClockIcon } from "../../elements/Icon";
import useOnClickOutside from "../../../hooks/userOnClickOutside";
import { TDialogHandle } from "../../elements/Dialog";
import TimePickerDialog from "./Dialog";

export default function TimePicker() {
  const timePickerRef = useRef<HTMLDivElement>(null);
  const timePickerDialogRef = useRef<TDialogHandle>(null);
  const timePickerInputRef = useRef<HTMLInputElement>(null);

  const [value, setValue] = useState<string>("");

  const onOk = (v: string) => {
    setValue(v);
  };

  useOnClickOutside(timePickerRef, () => {
    timePickerDialogRef.current?.onOpen(false);
  });

  return (
    <div ref={timePickerRef}>
      <Input
        ref={timePickerInputRef}
        placeholder="HH:MM"
        label="Chọn giờ"
        id="time-picker"
        value={value}
        readOnly
        rightElement={{
          element: <ClockIcon />,
          onCLick: () => {
            timePickerDialogRef.current?.onToggle();
            timePickerInputRef.current?.focus();
          },
        }}
      />
      <TimePickerDialog ref={timePickerDialogRef} onOk={onOk} />
    </div>
  );
}
