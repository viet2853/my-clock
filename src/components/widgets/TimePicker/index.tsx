import React, { useRef } from "react";
import Input from "../../elements/Input";
import Dialog, { TTimePickerDialogHandle } from "./Dialog";
import { ClockIcon } from "../../elements/Icon";
import useOnClickOutside from "../../../hooks/userOnClickOutside";

export default function TimePicker() {
  const timePickerRef = useRef<HTMLDivElement>(null);
  const timePickerDialogRef = useRef<TTimePickerDialogHandle>(null);
  const timePickerInputRef = useRef<HTMLInputElement>(null);

  useOnClickOutside(timePickerRef, () =>
    timePickerDialogRef.current?.onOpen(false)
  );

  return (
    <div className="time-picker" ref={timePickerRef}>
      <Input
        ref={timePickerInputRef}
        placeholder="Chọn giờ"
        label="Chọn giờ"
        rightElement={{
          element: <ClockIcon />,
          onCLick: () => {
            timePickerInputRef.current?.focus();
            timePickerDialogRef.current?.onOpen(true);
          },
        }}
      />
      <Dialog ref={timePickerDialogRef} />
    </div>
  );
}
