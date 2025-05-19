import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import Modal from './Modal';

export interface AlertDialogProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  message: string;
  confirmText?: string;
  size?: 'sm' | 'md' | 'lg';
}

export default function AlertDialog({
  isOpen,
  onClose,
  title = '알림',
  message,
  confirmText = '확인',
  size = 'sm',
}: AlertDialogProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isPersistent={true}>
      <Card
        title={title}
        size={size}
        actions={
          <Button variant="primary" onClick={onClose}>
            {confirmText}
          </Button>
        }
      >
        <div className="space-y-4">
          <p className="text-gray-700">{message}</p>
        </div>
      </Card>
    </Modal>
  );
}
