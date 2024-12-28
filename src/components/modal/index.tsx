import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import classes from "./classes.module.scss";
import Icon from "components/Icon";
import Portal from "components/Portal";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  maxWidth?: number;
  disableFocused?: boolean;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  maxWidth,
  disableFocused = false,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  useEffect(() => {
    if (isOpen && modalRef.current && !disableFocused) {
      modalRef.current.focus();
    }
  }, [isOpen, disableFocused]);

  if (!isOpen) return null;

  return (
    <Portal>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        className={classes["modal-overlay"]}
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className={classes["modal-content"]}
          ref={modalRef}
          tabIndex={-1}
          onClick={(e) => e.stopPropagation()}
          style={{
            maxWidth,
          }}
        >
          <div className={classes["modal-header"]}>
            <h2 id="modal-title">{title}</h2>
            <button
              onClick={onClose}
              aria-label="Close modal"
              className={classes.modal__close_button}
            >
              <Icon name="close" />
            </button>
          </div>
          <div className={classes["modal-body"]}>{children}</div>
        </motion.div>
      </motion.div>
    </Portal>
  );
};

export default Modal;
