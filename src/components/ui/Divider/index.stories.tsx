import { Meta, StoryObj } from '@storybook/react';
import { Divider } from '.';

const meta: Meta<typeof Divider> = {
  title: 'Components/ui/Divider',
  component: Divider,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="min-w-lg p-4">
        <Story />
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof Divider>;

export const Default: Story = {
  args: {},
};
