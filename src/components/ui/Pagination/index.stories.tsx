import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Pagination } from '.';

const meta = {
  title: 'Components/ui/Pagination',
  component: Pagination,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <div className="min-w-3xl">
        <Story />
      </div>
    ),
  ],
} as Meta<typeof Pagination>;

export default meta;

type Story = StoryObj<typeof Pagination>;

export const Default: Story = {
  args: {
    total: 100,
    current: 1,
    pageSize: 10,
  },
};

export const WithSizeChanger: Story = {
  args: {
    total: 100,
    current: 1,
    pageSize: 10,
    showSizeChanger: true,
    pageSizeOptions: [10, 20, 50],
  },
};

export const LeftAlign: Story = {
  args: {
    total: 100,
    current: 1,
    pageSize: 10,
    align: 'left',
  },
};

export const RightAlign: Story = {
  args: {
    total: 100,
    current: 1,
    pageSize: 10,
    align: 'right',
  },
};

export const SmallSize: Story = {
  args: {
    total: 100,
    current: 1,
    pageSize: 10,
    size: 'sm',
  },
};

export const LargeSize: Story = {
  args: {
    total: 100,
    current: 1,
    pageSize: 10,
    size: 'lg',
  },
};

export const FewPages: Story = {
  args: {
    total: 30,
    current: 1,
    pageSize: 10,
  },
};

export const ManyPages: Story = {
  args: {
    total: 500,
    current: 25,
    pageSize: 10,
  },
};

// 인터랙티브 예제
export const Interactive = () => {
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="text-sm">
        현재 페이지: {current}, 페이지 크기: {pageSize}
      </div>
      <Pagination
        total={200}
        current={current}
        pageSize={pageSize}
        showSizeChanger={true}
        pageSizeOptions={[10, 20, 50]}
        onChange={(page) => setCurrent(page)}
        onShowSizeChange={(page, size) => {
          setCurrent(page);
          setPageSize(size);
        }}
      />
    </div>
  );
};
