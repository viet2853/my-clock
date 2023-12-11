import { DIAMETER, toRadians } from "../../../../../utils/time-picker";
import { ETime } from "../Times";

type TLine = {
  duration: number;
  type: ETime;
};
export default function Line({ duration, type }: TLine) {
  const angleNb = type === ETime.HOUR ? duration * 30 : duration * 6;
  const angleRadian = toRadians(angleNb);
  const radius = DIAMETER / 2;

  const lineProps = {
    x1: radius,
    y1: radius,
    x2: radius + radius * 0.8 * Math.sin(angleRadian),
    y2: radius - radius * 0.8 * Math.cos(angleRadian),
  };

  const circleProps = {
    cx: radius + radius * 0.8 * Math.sin(angleRadian),
    cy: radius - radius * 0.8 * Math.cos(angleRadian),
  };

  return (
    <svg height={DIAMETER} width={DIAMETER} style={{ position: "absolute" }}>
      <line
        strokeWidth={2}
        stroke="#90caf9"
        {...lineProps}
        style={{ transition: "all 200ms ease" }}
      />
      <circle {...circleProps} r="18" fill="#90caf9" />
    </svg>
  );
}
