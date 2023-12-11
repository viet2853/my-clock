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

export const getTimeByAngle = (angle: number, type: ETime) => {
  let time: number;
  if (type === ETime.HOUR) {
    time = Math.round(angle / 30) === 0 ? 12 : Math.round(angle / 30);
  } else {
    time = Math.round(angle / 6) === 60 ? 0 : Math.round(angle / 6);
  }
  return time;
};

export const generateTime = (type: ETime) => {
  const timeList = [];
  const step = type === ETime.HOUR ? 1 : 5;
  if (type === "H") {
    for (let i = 1; i <= 12; i += step) {
      timeList.push(i);
    }
  } else if (type === "M") {
    for (let i = 0; i < 60; i += step) {
      let minute = i === 60 ? 0 : i;
      timeList.push(minute);
    }
  } else {
    console.log('Invalid type. Please choose "H" or "M".');
  }

  return timeList;
};

export const zeroPad = (num: number) => {
  return num.toString().padStart(2, "0");
};
