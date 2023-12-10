import React, {
  ForwardRefRenderFunction,
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from "react";

import "./style.css";
import Times, { ETime } from "./Times";
import Line from "./Line";
import { DIAMETER, getMouseAngle } from "../../../../utils/time-picker";

export type TTimePickerDialogHandle = { onOpen: (x: boolean) => void };

type TTimePickerDialog = {
  onOk?: (v: string) => void;
};

const DialogTimePicker: ForwardRefRenderFunction<
  TTimePickerDialogHandle,
  TTimePickerDialog
> = ({ onOk }, ref) => {
  useImperativeHandle(ref, () => ({
    onOpen: (x: boolean) => setIsOpen(x),
  }));
  const containerRef = useRef<HTMLDivElement>(null);

  const [isOpen, setIsOpen] = useState<boolean>(true);
  const [type, setType] = useState<ETime>(ETime.HOUR);

  const [hours, setHours] = useState(3);
  const [minutes, setMinutes] = useState(30);
  const [touching, setTouching] = useState(false);

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

    const rect = containerRef.current?.getBoundingClientRect();
    const { pageX, pageY } = e.pageX ? e : e.changedTouches[0];
    const x = pageX - Number(rect?.left);
    const y = pageY - Number(rect?.top);

    const center = DIAMETER / 2;
    const mouseAngle = getMouseAngle(center, center, x, y);

    const time =
      type === ETime.HOUR
        ? Math.round(mouseAngle / 30)
        : Math.round(mouseAngle / 6);
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

  return (
    <div className={`dialog ${isOpen ? "open" : ""}`}>
      <div className="time-label">
        <span
          className={type === ETime.HOUR ? "active" : ""}
          onClick={() => setType(ETime.HOUR)}
        >
          {hours}
        </span>
        <span className="">:</span>
        <span
          className={type === ETime.MINUTE ? "active" : ""}
          onClick={() => setType(ETime.MINUTE)}
        >
          {minutes}
        </span>
        <div className="meridiem">
          <span>AM</span>
          <span>PM</span>
        </div>
      </div>
      <div className="circle-wrapper">
        <div
          className="circle"
          ref={containerRef}
          onMouseDown={onMouseDown}
          onTouchStart={onMouseDown}
          onMouseMove={onMouseMove}
          onTouchMove={onMouseMove}
          onMouseUp={onMouseUp}
          onTouchEnd={onMouseUp}
        >
          <Times type={type} duration={duration} onClick={onChangeDuration} />
          <Line duration={duration} type={type} />
          <div className="dot" />
        </div>
      </div>
      <div className="calendar-footer">
        <div className="btn" onClick={() => setIsOpen(false)}>
          Cancel
        </div>
        <div className="btn" onClick={() => onOk && onOk("hours")}>
          Ok
        </div>
      </div>
    </div>
  );
};
export default forwardRef(DialogTimePicker);
