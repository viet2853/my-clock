import React, { CSSProperties } from "react";
import "./style.css";
import {
  DIAMETER,
  generateTime,
  getMinutePercentageSize,
  toRadians,
} from "../../../../../utils/time-picker";

export enum ETime {
  MINUTE = "M",
  HOUR = "H",
}

type TTimes = {
  duration: number;
  type: ETime;
  onClick?: (m: number) => void;
};

export default function Times({ duration, onClick, type }: TTimes) {
  const center = DIAMETER / 2;
  const radius = center * 0.8;
  const timeNumbers = generateTime(type);
  const size = DIAMETER * getMinutePercentageSize(DIAMETER);

  const moveDistance = size / 2;
  return (
    <>
      {timeNumbers.map((time) => {
        const angleNb =
          type === ETime.HOUR ? Number(time) * 30 : Number(time) * 6;
        const angleRadian = toRadians(angleNb);
        const left = center + radius * Math.sin(angleRadian) - moveDistance;
        const top = center - radius * Math.cos(angleRadian) - moveDistance;
        const style: CSSProperties = {
          top,
          left,
          fontSize: size / 2,
          width: size,
          height: size,
          lineHeight: `${size}px`,
        };

        return (
          <div
            onClick={() => onClick && onClick(Number(time))}
            style={style}
            key={time}
            className={`time ${Number(time) === duration ? "selected" : ""}`}
          >
            {time}
          </div>
        );
      })}
    </>
  );
}
