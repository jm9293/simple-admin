import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Tabs } from './index';

const meta: Meta<typeof Tabs> = {
  title: 'components/ui/Tabs',
  component: Tabs,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof Tabs>;

// 기본 탭 예제
export const Default: Story = {
  args: {
    defaultActiveKey: 'tab1',
    activeKey: 'tab1',
    onChange: () => {},
    items: [
      { key: 'tab1', label: '첫 번째 탭' },
      { key: 'tab2', label: '두 번째 탭' },
      { key: 'tab3', label: '세 번째 탭' },
    ],
  },
};

// 인터랙티브 탭을 위한 컴포넌트
function InteractiveTabsDemo() {
  const [activeKey, setActiveKey] = useState('tab1');

  const items = [
    { key: 'tab1', label: '첫 번째 탭' },
    { key: 'tab2', label: '두 번째 탭' },
    { key: 'tab3', label: '세 번째 탭' },
  ];

  return (
    <div className="w-full max-w-md">
      <Tabs defaultActiveKey="tab1" activeKey={activeKey} onChange={setActiveKey} items={items} />
      <div className="mt-2 text-center">
        <p>현재 선택된 탭의 Key: {activeKey}</p>
      </div>
    </div>
  );
}

// 인터랙티브 탭 예제
export const Interactive: Story = {
  render: () => <InteractiveTabsDemo />,
};

// 많은 탭 예제
export const ManyTabs: Story = {
  args: {
    defaultActiveKey: 'tab1',
    activeKey: 'tab1',
    onChange: () => {},
    items: [
      { key: 'tab1', label: '탭 1' },
      { key: 'tab2', label: '탭 2' },
      { key: 'tab3', label: '탭 3' },
      { key: 'tab4', label: '탭 4' },
      { key: 'tab5', label: '탭 5' },
      { key: 'tab6', label: '탭 6' },
      { key: 'tab7', label: '탭 7' },
    ],
  },
  decorators: [
    (Story) => (
      <div className="w-full min-w-xl">
        <Story />
      </div>
    ),
  ],
};
