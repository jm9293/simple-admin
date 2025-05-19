import { Meta, StoryObj } from '@storybook/react';
import { UserSearchField } from './';
const meta = {
  title: 'Components/User/UserSearchField',
  component: UserSearchField,
  tags: ['autodocs'],
} as Meta<typeof UserSearchField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    searchText: 'test',
    searchType: 'name',
    activeType: 'all',
    onSearchTextChange: () => {},
    onSearchTypeChange: () => {},
    onActiveTypeChange: () => {},
  },
};
