import { Meta, StoryObj } from '@storybook/react';
import { List } from '.';

// 샘플 데이터 타입 정의
interface SampleItem {
  id: number;
  name: string;
}

const meta = {
  title: 'Components/ui/List',
  component: List,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="min-w-lg">
        <Story />
      </div>
    ),
  ],
} as Meta<typeof List>;

export default meta;

// 스토리 타입 정의
type Story = StoryObj<typeof List<SampleItem>>;

// 샘플 데이터
const sampleItems: SampleItem[] = [
  { id: 1, name: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.' },
  { id: 2, name: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.' },
  { id: 3, name: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.' },
];

const sampleRenderItem = (item: SampleItem) => <>{`[ITEM-${item.id}] ${item.name}`}</>;

export const Default: Story = {
  args: {
    header: '헤더',
    data: sampleItems,
    footer: '푸터',
    renderItem: sampleRenderItem,
    rowKey: 'id',
  },
};

export const SmallSize: Story = {
  args: {
    ...Default.args,
    size: 'sm',
  },
};

export const MediumSize: Story = {
  args: {
    ...Default.args,
    size: 'md',
  },
};

export const LargeSize: Story = {
  args: {
    ...Default.args,
    size: 'lg',
  },
};
