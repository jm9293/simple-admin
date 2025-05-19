import { useCallback, useState } from 'react';

interface ConfirmOptions {
  title?: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  variant?: 'primary' | 'error' | 'warning' | 'success';
}

interface AlertOptions {
  title?: string;
  message: string;
  confirmText?: string;
  variant?: 'primary' | 'error' | 'warning' | 'success';
}

export function useModal() {
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [confirmResolve, setConfirmResolve] = useState<((value: boolean) => void) | null>(null);
  const [alertResolve, setAlertResolve] = useState<(() => void) | null>(null);

  const [confirmOptions, setConfirmOptions] = useState<ConfirmOptions>({
    title: '확인',
    message: '',
    confirmText: '확인',
    cancelText: '취소',
    variant: 'primary',
  });

  const [alertOptions, setAlertOptions] = useState<AlertOptions>({
    title: '알림',
    message: '',
    confirmText: '확인',
    variant: 'primary',
  });

  // 확인 모달 표시 (Promise 반환)
  const confirm = useCallback(
    (options: ConfirmOptions): Promise<boolean> => {
      return new Promise((resolve) => {
        setConfirmOptions({ ...confirmOptions, ...options });
        setConfirmResolve(() => resolve);
        setIsConfirmOpen(true);
      });
    },
    [confirmOptions]
  );

  // 알림 모달 표시 (Promise 반환)
  const alert = useCallback(
    (options: AlertOptions): Promise<void> => {
      return new Promise((resolve) => {
        setAlertOptions({ ...alertOptions, ...options });
        setAlertResolve(() => resolve);
        setIsAlertOpen(true);
      });
    },
    [alertOptions]
  );

  // 확인 모달 핸들러
  const handleConfirm = useCallback(() => {
    setIsConfirmOpen(false);
    if (confirmResolve) {
      confirmResolve(true);
      setConfirmResolve(null);
    }
  }, [confirmResolve]);

  // 취소 모달 핸들러
  const handleCancel = useCallback(() => {
    setIsConfirmOpen(false);
    if (confirmResolve) {
      confirmResolve(false);
      setConfirmResolve(null);
    }
  }, [confirmResolve]);

  // 알림 모달 확인 핸들러
  const handleAlertConfirm = useCallback(() => {
    setIsAlertOpen(false);
    if (alertResolve) {
      alertResolve();
      setAlertResolve(null);
    }
  }, [alertResolve]);

  return {
    // 모달 상태
    isConfirmOpen,
    isAlertOpen,

    // 모달 옵션
    confirmOptions,
    alertOptions,

    // 모달 함수
    confirm,
    alert,

    // 모달 핸들러
    handleConfirm,
    handleCancel,
    handleAlertConfirm,
  };
}
