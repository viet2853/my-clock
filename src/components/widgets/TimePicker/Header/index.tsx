import React from "react";
import { zeroPad } from "../../../../utils/time-picker";
import { ETime } from "../Times";

import styles from "./style.module.css";

type THeader = {
  type: ETime;
  hours: number;
  minutes: number;
  meridiem: "AM" | "PM";
  setType: (v: ETime) => void;
  setMeridiem: (v: "AM" | "PM") => void;
};
export default function Header({
  type,
  hours,
  minutes,
  meridiem,
  setMeridiem,
  setType,
}: THeader) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.time}>
        <span
          className={type === ETime.HOUR ? styles.active : ""}
          onClick={() => setType(ETime.HOUR)}
        >
          {zeroPad(hours)}
        </span>
        <span className={styles.dots}>:</span>
        <span
          className={type === ETime.MINUTE ? styles.active : ""}
          onClick={() => setType(ETime.MINUTE)}
        >
          {zeroPad(minutes)}
        </span>
      </div>
      <div className={styles.meridiem}>
        <span
          className={`${meridiem === "AM" ? styles.active : ""}`}
          onClick={() => setMeridiem("AM")}
        >
          AM
        </span>
        <span
          className={`${meridiem === "PM" ? styles.active : ""}`}
          onClick={() => setMeridiem("PM")}
        >
          PM
        </span>
      </div>
    </div>
  );
}
