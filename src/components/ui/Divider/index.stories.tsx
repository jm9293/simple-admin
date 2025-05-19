import { Meta, StoryObj } from '@storybook/react';
import { Divider } from '.';

const meta = {
  title: 'Components/UI/Divider',
  component: Divider,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="min-w-lg p-4">
        <Story />
      </div>
    ),
  ],
  argTypes: {
    type: {
      control: 'select',
      options: ['solid', 'dashed', 'dotted'],
      description: '구분선의 스타일을 지정합니다.',
    },
    orientation: {
      control: 'radio',
      options: ['horizontal', 'vertical'],
      description: '구분선의 방향을 지정합니다.',
    },
    className: {
      control: 'text',
      description: '추가적인 CSS 클래스를 지정합니다.',
    },
  },
} satisfies Meta<typeof Divider>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    type: 'solid',
    orientation: 'horizontal',
  },
};

export const Horizontal: Story = {
  args: {
    orientation: 'horizontal',
  },
  render: () => (
    <div className="space-y-6">
      <div>
        <p className="mb-2 text-sm font-medium text-gray-500">Solid</p>
        <Divider type="solid" />
      </div>
      <div>
        <p className="mb-2 text-sm font-medium text-gray-500">Dashed</p>
        <Divider type="dashed" />
      </div>
      <div>
        <p className="mb-2 text-sm font-medium text-gray-500">Dotted</p>
        <Divider type="dotted" />
      </div>
    </div>
  ),
};

export const Vertical: Story = {
  args: {
    orientation: 'vertical',
  },
  render: () => (
    <div className="flex h-32 items-center space-x-6">
      <div className="flex h-full items-center">
        <p className="text-sm font-medium text-gray-500">Solid</p>
        <Divider type="solid" orientation="vertical" className="mx-4" />
        <p className="text-sm font-medium text-gray-500">Content</p>
      </div>
      <div className="flex h-full items-center">
        <p className="text-sm font-medium text-gray-500">Dashed</p>
        <Divider type="dashed" orientation="vertical" className="mx-4" />
        <p className="text-sm font-medium text-gray-500">Content</p>
      </div>
      <div className="flex h-full items-center">
        <p className="text-sm font-medium text-gray-500">Dotted</p>
        <Divider type="dotted" orientation="vertical" className="mx-4" />
        <p className="text-sm font-medium text-gray-500">Content</p>
      </div>
    </div>
  ),
};

export const WithContent: Story = {
  render: () => (
    <div className="relative flex items-center py-5">
      <Divider />
      <span className="absolute left-1/2 -translate-x-1/2 bg-white px-2 text-sm text-gray-500">
        텍스트와 함께 사용
      </span>
    </div>
  ),
};

export const CustomStyles: Story = {
  render: () => (
    <div className="space-y-4">
      <Divider className="bg-blue-500" />
      <Divider type="dashed" className="border-red-500" />
      <Divider type="dotted" className="border-green-500" />
    </div>
  ),
};
