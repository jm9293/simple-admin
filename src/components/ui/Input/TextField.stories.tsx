import { Meta, StoryObj } from '@storybook/react';
import { Mail, Search } from 'lucide-react';
import { PasswordInput } from './PasswordTextField';
import { TextField } from './TextField';

const meta = {
  title: 'Components/ui/TextField',
  component: TextField,
  tags: ['autodocs'],
  argTypes: {
    status: {
      control: 'select',
      options: ['default', 'error', 'success', 'warning'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    labelPosition: {
      control: 'select',
      options: ['top', 'left'],
    },
  },
} satisfies Meta<typeof TextField>;

export default meta;
type Story = StoryObj<typeof TextField>;
type PasswordStory = StoryObj<typeof PasswordInput>;

export const Default: Story = {
  args: {
    placeholder: '입력해주세요',
  },
};

export const WithLabel: Story = {
  args: {
    label: '이름',
    placeholder: '이름을 입력해주세요',
  },
};

export const WithHelperText: Story = {
  args: {
    label: '이메일',
    placeholder: 'example@email.com',
    helperText: '업무용 이메일을 입력해주세요',
  },
};

export const WithError: Story = {
  args: {
    label: '이메일',
    placeholder: 'example@email.com',
    status: 'error',
    error: '유효한 이메일 주소를 입력해주세요',
  },
};

export const Success: Story = {
  args: {
    label: '사용자 이름',
    placeholder: '사용자 이름을 입력해주세요',
    status: 'success',
    helperText: '사용 가능한 이름입니다',
    value: 'goodusername',
  },
};

export const Warning: Story = {
  args: {
    label: '비밀번호',
    placeholder: '비밀번호를 입력해주세요',
    type: 'password',
    status: 'warning',
    helperText: '비밀번호가 너무 짧습니다',
  },
};

export const Disabled: Story = {
  args: {
    label: '사용자 ID',
    value: 'user123',
    disabled: true,
  },
};

export const Small: Story = {
  args: {
    size: 'sm',
    placeholder: '작은 입력 필드',
  },
};

export const Medium: Story = {
  args: {
    size: 'md',
    placeholder: '중간 입력 필드',
  },
};

export const Large: Story = {
  args: {
    size: 'lg',
    placeholder: '큰 입력 필드',
  },
};

export const CustomWidth: Story = {
  args: {
    label: '주소',
    placeholder: '주소를 입력해주세요',
    className: 'w-64',
  },
};

export const WithPrefixIcon: Story = {
  args: {
    label: '검색',
    placeholder: '검색어를 입력해주세요',
    prefixIcon: <Search size={16} />,
  },
};

export const WithSuffixIcon: Story = {
  args: {
    label: '이메일',
    placeholder: '이메일을 입력해주세요',
    suffixIcon: <Mail size={16} />,
  },
};

export const WithBothIcons: Story = {
  args: {
    label: '검색',
    placeholder: '검색어를 입력해주세요',
    prefixIcon: <Search size={16} />,
    suffixIcon: <Mail size={16} />,
  },
};

export const LabelLeft: Story = {
  args: {
    label: '사용자 이름',
    placeholder: '사용자 이름을 입력해주세요',
    labelPosition: 'left',
  },
};

// Password 스토리
export const Password: PasswordStory = {
  render: (args) => <PasswordInput {...args} />,
  args: {
    label: '비밀번호',
    value: 'password123',
    placeholder: '비밀번호를 입력해주세요',
  },
};
