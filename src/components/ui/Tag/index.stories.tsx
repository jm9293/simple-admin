import { Meta, StoryObj } from '@storybook/react';
import { Tag } from '.';

const meta = {
  title: 'Components/UI/Tag',
  component: Tag,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'primary', 'success', 'warning', 'danger'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
  },
} as Meta<typeof Tag>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: '태그',
    variant: 'default',
    size: 'md',
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Tag variant="default">기본</Tag>
      <Tag variant="primary">주요</Tag>
      <Tag variant="success">성공</Tag>
      <Tag variant="warning">경고</Tag>
      <Tag variant="danger">위험</Tag>
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-2">
      <Tag variant="primary" size="sm">
        작게
      </Tag>
      <Tag variant="primary" size="md">
        중간
      </Tag>
      <Tag variant="primary" size="lg">
        크게
      </Tag>
    </div>
  ),
};

export const StatusExample: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Tag variant="success">활성</Tag>
      <Tag variant="danger">비활성</Tag>
      <Tag variant="warning">대기중</Tag>
      <Tag variant="primary">검토중</Tag>
    </div>
  ),
};
