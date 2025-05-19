import { Meta } from '@storybook/react';
import { useState } from 'react';
import { Button } from '../Button';
import { Card } from '../Card';
import { Modal } from './';
import AlertDialog from './AlertDialog';
import ConfirmDialog from './ConfirmDialog';
// Modal 컴포넌트 메타 정보
const meta = {
  title: 'Components/UI/Modal',
  component: Modal,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Modal>;

export default meta;

// 기본 모달 버튼 컴포넌트
export const BasicModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <Button variant="primary" onClick={() => setIsOpen(true)}>
        기본 모달 열기
      </Button>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <Card
          title="기본 모달"
          size="md"
          actions={
            <Button variant="primary" onClick={() => setIsOpen(false)}>
              닫기
            </Button>
          }
        >
          <div className="p-4 text-gray-700">
            <p>이것은 기본 모달 내용입니다.</p>
            <p className="mt-2">모달 외부를 클릭하거나 ESC 키를 눌러 닫을 수 있습니다.</p>
          </div>
        </Card>
      </Modal>
    </div>
  );
};

// 알림 대화상자 컴포넌트
export const Alert = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <Button variant="warning" onClick={() => setIsOpen(true)}>
        알림 대화상자 열기
      </Button>

      <AlertDialog
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="알림"
        message="작업이 성공적으로 완료되었습니다."
        confirmText="확인"
        size="sm"
      />
    </div>
  );
};

// 확인 대화상자 컴포넌트
export const Confirm = () => {
  const [result, setResult] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleConfirm = () => {
    setResult('사용자가 확인을 선택했습니다.');
    setIsOpen(false);
  };

  const handleClose = () => {
    setResult('사용자가 취소를 선택했습니다.');
    setIsOpen(false);
  };

  return (
    <div className="space-y-4">
      <Button variant="error" onClick={() => setIsOpen(true)}>
        확인 대화상자 열기
      </Button>

      {result && (
        <div className="mt-4 rounded-md bg-gray-100 p-2 text-sm text-gray-700">{result}</div>
      )}

      <ConfirmDialog
        isOpen={isOpen}
        onClose={handleClose}
        onConfirm={handleConfirm}
        title="확인"
        message="정말로 이 작업을 수행하시겠습니까?"
        confirmText="확인"
        cancelText="취소"
        size="sm"
      />
    </div>
  );
};
