import {
  ForwardRefRenderFunction,
  forwardRef,
  useImperativeHandle,
  useState,
} from "react";
import styles from "./style.module.css";

export type TDialogHandle = {
  onOpen: (x: boolean) => void;
  onToggle: () => void;
};

type TDialog = {
  onOk?: () => void;
  children: JSX.Element;
};

const Dialog: ForwardRefRenderFunction<TDialogHandle, TDialog> = (
  { onOk, children },
  ref
) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useImperativeHandle(ref, () => ({
    onOpen: (x: boolean) => setIsOpen(x),
    onToggle: () => setIsOpen((prev) => !prev),
  }));

  const handleCancel = () => {
    setIsOpen(false);
  };

  const handleOk = () => {
    if (onOk) {
      onOk();
    }
    handleCancel();
  };

  return (
    <div className={`${styles.wrapper} ${isOpen ? styles.visible : ""}`}>
      <div className={styles.content}>{children}</div>
      <div className={styles.footer}>
        <div onClick={handleCancel}>Cancel</div>
        <div onClick={handleOk}>Ok</div>
      </div>
    </div>
  );
};
export default forwardRef(Dialog);
