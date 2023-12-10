import { useRef, useState } from "react";
import Input from "../../elements/Input";
import { ClockIcon } from "../../elements/Icon";
import useOnClickOutside from "../../../hooks/userOnClickOutside";
import Dialog, { TDialogHandle } from "../../elements/Dialog";
import Times, { ETime } from "./Times";
import Line from "./Line";
import {
  DIAMETER,
  getMouseAngle,
  getTimeByAngle,
  zeroPad,
} from "../../../utils/time-picker";

import styles from "./style.module.css";
import Header from "./Header";

export default function TimePicker() {
  const timePickerRef = useRef<HTMLDivElement>(null);
  const timePickerDialogRef = useRef<TDialogHandle>(null);
  const timePickerInputRef = useRef<HTMLInputElement>(null);
  const circleRef = useRef<HTMLDivElement>(null);

  const [value, setValue] = useState<string>("");

  useOnClickOutside(timePickerRef, () =>
    timePickerDialogRef.current?.onOpen(false)
  );
  const [type, setType] = useState<ETime>(ETime.HOUR);

  const [hours, setHours] = useState<number>(3);
  const [minutes, setMinutes] = useState<number>(30);

  const [meridiem, setMeridiem] = useState<"AM" | "PM">("AM");
  const [touching, setTouching] = useState<boolean>(false);

  const duration = type === ETime.HOUR ? hours : minutes;

  const onChangeDuration = (v: number) => {
    if (type === ETime.HOUR) {
      setHours(v);
      return;
    }
    setMinutes(v);
  };

  const updatePosition = (e: any) => {
    if (!e.pageX && !e.changedTouches) return;

    const rect = circleRef.current?.getBoundingClientRect();
    const { pageX, pageY } = e.pageX ? e : e.changedTouches[0];
    const x = pageX - Number(rect?.left);
    const y = pageY - Number(rect?.top);

    const center = DIAMETER / 2;
    const mouseAngle = getMouseAngle(center, center, x, y);

    const time = getTimeByAngle(mouseAngle, type);
    onChangeDuration(time);
  };

  const onMouseDown = (e: any) => {
    updatePosition(e);
    setTouching(true);
  };

  const onMouseMove = (e: any) => {
    if (touching) {
      updatePosition(e);
    }
  };

  const onMouseUp = () => {
    setTouching(false);
    if (type === ETime.HOUR) {
      setType(ETime.MINUTE);
    }
  };

  const onOk = () => {
    setValue(`${zeroPad(hours)}:${zeroPad(minutes)} ${meridiem}`);
  };

  return (
    <div ref={timePickerRef}>
      <Input
        ref={timePickerInputRef}
        placeholder="HH:MM"
        label="Chọn giờ"
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
      <Dialog ref={timePickerDialogRef} onOk={onOk}>
        <>
          <Header
            hours={hours}
            minutes={minutes}
            meridiem={meridiem}
            type={type}
            setMeridiem={setMeridiem}
            setType={setType}
          />
          <div className={styles.circleWrapper}>
            <div
              className={styles.circle}
              ref={circleRef}
              onMouseDown={onMouseDown}
              onTouchStart={onMouseDown}
              onMouseMove={onMouseMove}
              onTouchMove={onMouseMove}
              onMouseUp={onMouseUp}
              onTouchEnd={onMouseUp}
            >
              <Times
                type={type}
                duration={duration}
                onClick={onChangeDuration}
              />
              <Line duration={duration} type={type} />
              <div className={styles.pin} />
            </div>
          </div>
        </>
      </Dialog>
    </div>
  );
}
