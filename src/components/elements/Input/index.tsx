import React, {
  ForwardRefRenderFunction,
  InputHTMLAttributes,
  forwardRef,
} from "react";
import styles from "./style.module.css";

interface IInput extends InputHTMLAttributes<{}> {
  rightElement?: {
    element: React.JSX.Element;
    onCLick: () => void;
  };
  label?: string;
}

const Input: ForwardRefRenderFunction<any, IInput> = (
  { rightElement, label = "Chọn ngày", ...props },
  ref
) => {
  return (
    <div className={styles.wrapper}>
      <input
        type="text"
        ref={ref}
        id="date"
        className={styles.input}
        autoComplete="off"
        placeholder="DD/MM/YYYY"
        {...props}
      />
      <label htmlFor="date" className={styles.label}>
        {label}
      </label>
      {rightElement && (
        <div className={styles.rightElement} onClick={rightElement?.onCLick}>
          {rightElement.element}
        </div>
      )}
    </div>
  );
};

export default forwardRef(Input);
