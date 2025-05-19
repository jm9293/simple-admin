import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

export interface ModalProps {
  /**
   * 모달 열림 여부
   */
  isOpen: boolean;
  /**
   * 모달 닫기 함수
   */
  onClose: () => void;
  /**
   * 모달 내부 컴포넌트
   */
  children: React.ReactNode;
  /**
   * 모달 외부 클릭 시 닫기 여부
   */
  isPersistent?: boolean;
}

export const Modal = ({ isOpen, onClose, children, isPersistent = false }: ModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (isPersistent) return;
      if (e.key === 'Escape') onClose();
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (isPersistent) return;
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEsc);
      document.addEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, isPersistent, onClose]);

  if (!isOpen) return null;

  const ModalContent = (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
      <div ref={modalRef} className="max-h-[90vh] overflow-auto">
        {children}
      </div>
    </div>
  );

  return createPortal(ModalContent, document.body);
};

export default Modal;
