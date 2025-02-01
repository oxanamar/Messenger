import React from "react";
import { FaTimes } from "react-icons/fa";
import s from "./Modal.module.scss";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  closable?: boolean;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  closable = true,
}) => {
  if (!isOpen) return null;

  return (
    <div className={s.modalOverlay} onClick={closable ? onClose : undefined}>
      <div className={s.modal} onClick={(e) => e.stopPropagation()}>
        {closable && <FaTimes className={s.modalClose} onClick={onClose} />}
        <h3>{title}</h3>
        {children}
      </div>
    </div>
  );
};

export default Modal;
