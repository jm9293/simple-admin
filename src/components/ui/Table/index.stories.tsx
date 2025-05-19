import { Meta, StoryObj } from '@storybook/react';
import { Table, TableColumn } from '.';
import { Tag } from '../Tag';

// 샘플 데이터 타입 정의
interface SampleData {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
}

// 샘플 데이터
const sampleData: SampleData[] = [
  { id: 1, name: '김철수', email: 'kim@example.com', role: '관리자', status: '활성' },
  { id: 2, name: '이영희', email: 'lee@example.com', role: '사용자', status: '활성' },
  { id: 3, name: '박지민', email: 'park@example.com', role: '사용자', status: '비활성' },
  { id: 4, name: '최민준', email: 'choi@example.com', role: '관리자', status: '활성' },
  { id: 5, name: '정서연', email: 'jung@example.com', role: '사용자', status: '비활성' },
];

const meta = {
  title: 'Components/UI/Table',
  component: Table,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="min-w-lg">
        <Story />
      </div>
    ),
  ],
} as Meta<typeof Table<SampleData>>;

export default meta;
type Story = StoryObj<typeof meta>;

// 기본 컬럼 정의
const columns: TableColumn<SampleData>[] = [
  { key: 'id', label: 'ID', dataIndex: 'id' },
  { key: 'name', label: '이름', dataIndex: 'name' },
  { key: 'email', label: '이메일', dataIndex: 'email' },
  { key: 'role', label: '역할', dataIndex: 'role' },
  {
    key: 'status',
    label: '상태',
    dataIndex: 'status',
    render: (value) => <Tag variant={value === '활성' ? 'success' : 'danger'}>{value}</Tag>,
  },
];

// 작업 버튼이 있는 컬럼 정의
const columnsWithActions: TableColumn<SampleData>[] = [
  ...columns,
  {
    key: 'actions',
    label: '작업',
    dataIndex: 'id',
    render: () => (
      <div className="flex space-x-2">
        <button className="px-2 py-1 text-xs text-blue-600 hover:text-blue-800">수정</button>
        <button className="px-2 py-1 text-xs text-red-600 hover:text-red-800">삭제</button>
      </div>
    ),
  },
];

// 스토리 정의
export const Default: Story = {
  args: {
    data: sampleData,
    columns: columns,
    rowKey: 'id',
  },
};

export const Empty: Story = {
  args: {
    ...Default.args,
    data: [],
  },
};

export const WithActions: Story = {
  args: {
    ...Default.args,
    columns: columnsWithActions,
  },
};
