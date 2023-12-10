import { ETime } from "../components/widgets/TimePicker/Dialog/Times";

export const DIAMETER = 220;

export const toRadians = (angle: number) => angle * (Math.PI / 180);

export const getMouseAngle = (
  centerX: number,
  centerY: number,
  x: number,
  y: number
) => {
  const mainVector = {
    x: 0,
    y: -1,
  };
  const mouseVector = {
    x: x - centerX,
    y: y - centerY,
  };
  const crossProduct =
    mainVector.x * mouseVector.y - mouseVector.x * mainVector.y;
  const dotProduct =
    mainVector.x * mouseVector.x + mainVector.y * mouseVector.y;
  const angle = (Math.atan2(crossProduct, dotProduct) * 180) / Math.PI;
  return angle > 0 ? angle : 360 + angle;
};

export const getMinutePercentageSize = (diameter: number) => {
  if (diameter < 400) {
    return 0.1;
  }
  if (diameter < 320) {
    return 0.12;
  }
  return 0.09;
};

export function generateTime(type: ETime) {
  const timeList = [];
  const step = type === ETime.HOUR ? 1 : 5;
  if (type === "H") {
    for (let i = 1; i <= 12; i += step) {
      timeList.push(i);
    }
  } else if (type === "M") {
    for (let i = 0; i < 60; i += step) {
      let minute = i === 60 ? "00" : i < 10 ? `0${i}` : `${i}`;
      timeList.push(minute);
    }
  } else {
    console.log('Invalid type. Please choose "H" or "M".');
  }

  return timeList;
}
