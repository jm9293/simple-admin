import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import Modal from './Modal';

export interface ConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  size?: 'sm' | 'md' | 'lg';
}

export default function ConfirmDialog({
  isOpen,
  onClose,
  onConfirm,
  title = '확인',
  message,
  confirmText = '확인',
  cancelText = '취소',
  size = 'sm',
}: ConfirmDialogProps) {
  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isPersistent={true}>
      <Card
        title={title}
        size={size}
        actions={
          <>
            <Button variant="error" onClick={onClose}>
              {cancelText}
            </Button>
            <Button variant="primary" onClick={handleConfirm}>
              {confirmText}
            </Button>
          </>
        }
      >
        <div className="space-y-4">
          <p className="text-gray-700">{message}</p>
          <div className="flex justify-end space-x-3"></div>
        </div>
      </Card>
    </Modal>
  );
}
