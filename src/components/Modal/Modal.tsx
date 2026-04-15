import { useEffect } from "react";
import type { ReactNode } from "react";
import { createPortal } from "react-dom";
import styles from "./Modal.module.css";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
};

/**
 * Компонент Modal для відображення модального вікна.
 * @param {any} {isOpen
 * @param {any} onClose
 * @param {any} children}:ModalProps
 * @returns {any}
 */
const Modal = ({ isOpen, onClose, children }: ModalProps) => {
  if (!isOpen) return null;

  useEffect(() => {
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onEsc);
    return () => window.removeEventListener("keydown", onEsc);
  }, [onClose]);

  return createPortal(
    <div className={styles.backdrop} onClick={onClose}>
      <div
        className={styles.modal}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>,
    document.body
  );
};

export default Modal;
