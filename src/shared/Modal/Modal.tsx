import React from "react";
import { FaTimes } from "react-icons/fa";
import s from "./Modal.module.scss";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  hideCloseButton?: boolean;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  hideCloseButton,
}) => {
  if (!isOpen) return null;

  return (
    <div className={s.modalOverlay} onClick={onClose}>
      <div className={s.modal} onClick={(e) => e.stopPropagation()}>
        {!hideCloseButton && (
          <FaTimes className={s.modalClose} onClick={onClose} />
        )}
        <h3 className={s.modalTitle}>{title}</h3>
        {children}
      </div>
    </div>
  );
};

export default Modal;
