import React, {
  ForwardRefRenderFunction,
  InputHTMLAttributes,
  forwardRef,
} from "react";
import "./style.css";

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
    <div className="wrapper">
      <input
        type="text"
        ref={ref}
        id="date"
        className="input"
        autoComplete="off"
        placeholder="DD/MM/YYYY"
        {...props}
      />
      <label htmlFor="date" className="label">
        {label}
      </label>
      {rightElement && (
        <div className="right-element" onClick={rightElement?.onCLick}>
          {rightElement.element}
        </div>
      )}
    </div>
  );
};

export default forwardRef(Input);
