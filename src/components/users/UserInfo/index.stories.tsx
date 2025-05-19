import { Meta, StoryObj } from '@storybook/react';
import UserInfo from '.';

const meta = {
  title: 'Components/User/UserInfo',
  component: UserInfo,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="min-w-lg">
        <Story />
      </div>
    ),
  ],
} as Meta<typeof UserInfo>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    user: {
      id: '35',
      seq_no: '035',
      name: '정우진',
      job_rank: '대리',
      position: '영업팀',
      email: 'woojin.jung@example.com',
      ip_address: '192.168.1.135',
      active: false,
      join_date: '2024-02-01',
    },
  },
};
