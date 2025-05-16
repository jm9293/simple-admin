import { Meta, StoryObj } from '@storybook/react';
import { XIcon } from 'lucide-react';
import { Card } from '.';
import { Button } from '../Button';
const meta: Meta<typeof Card> = {
  title: 'Components/ui/Card',
  component: Card,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof Card>;

export const Default: Story = {
  args: {
    title: '카드 제목',
    children: '카드 내용입니다. 여기에 다양한 컨텐츠가 들어갈 수 있습니다.',
  },
};

export const WithDivider: Story = {
  args: {
    title: '구분선이 있는 카드',
    divider: true,
    children: '헤더와 내용 사이에 구분선이 있는 카드입니다.',
  },
};

export const WithActions: Story = {
  args: {
    title: '액션이 있는 카드',
    children: '하단에 액션 버튼이 있는 카드입니다.',
    actions: (
      <>
        <Button variant="secondary" size="sm">
          취소
        </Button>
        <Button variant="primary" size="sm">
          확인
        </Button>
      </>
    ),
  },
};

export const CompleteExample: Story = {
  args: {
    title: '사용자 정보 수정',
    extra: <Button variant="text" size="sm" icon={<XIcon className="h-4 w-4" />} />,
    children: (
      <div className="flex flex-col gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">이름</label>
          <input
            type="text"
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none"
            defaultValue="홍길동"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">이메일</label>
          <input
            type="email"
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none"
            defaultValue="hong@example.com"
          />
        </div>
      </div>
    ),
    actions: (
      <>
        <Button variant="error" size="sm">
          취소
        </Button>
        <Button variant="success" size="sm">
          저장
        </Button>
      </>
    ),
  },
};

export const WithExtra: Story = {
  args: {
    title: '사용자 정보',
    divider: true,
    extra: (
      <Button variant="primary" size="sm">
        편집
      </Button>
    ),
    children: (
      <div className="flex flex-col gap-2">
        <p>이름: 홍길동</p>
        <p>이메일: hong@example.com</p>
        <p>역할: 관리자</p>
      </div>
    ),
  },
};

export const Small: Story = {
  args: {
    title: '작은 카드',
    size: 'sm',
    children: '작은 크기의 카드입니다.',
  },
};

export const Large: Story = {
  args: {
    title: '큰 카드',
    size: 'lg',
    children: '큰 크기의 카드입니다. 더 많은 내용을 표시하기에 적합합니다.',
  },
};

export const NoHeader: Story = {
  args: {
    children: '헤더 없이 내용만 표시하는 카드입니다.',
  },
};
