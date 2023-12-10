import React from "react";

import styles from "./style.module.css";
import { ChevronLeft, ChevronRight } from "../../../elements/Icon";
import { MONTH_NAMES } from "../../../../utils/date-picker";

type THeader = {
  currentMonth: number;
  currentYear: number;
  onMonthPicker: () => void;
  onPrevMonth: () => void;
  onNextMonth: () => void;
};

export default function Header({
  onMonthPicker,
  onNextMonth,
  onPrevMonth,
  currentMonth,
  currentYear,
}: THeader) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.monthPicker}>
        <span onClick={onMonthPicker}>
          {MONTH_NAMES[currentMonth]} {currentYear}
        </span>
      </div>
      <div className={styles.monthChanger}>
        <span onClick={onPrevMonth}>
          <ChevronLeft />
        </span>
        <span onClick={onNextMonth}>
          <ChevronRight />
        </span>
      </div>
    </div>
  );
}
