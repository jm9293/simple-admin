import { Meta, StoryObj } from '@storybook/react';
import { ArrowRight, Mail, Search } from 'lucide-react';
import { Button } from '.';

const meta: Meta<typeof Button> = {
  title: 'Components/ui/Button',
  component: Button,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    variant: 'primary',
    children: '버튼',
    isDisabled: false,
    isLoading: false,
  },
};

export const Secondary: Story = {
  args: {
    ...Primary.args,
    variant: 'secondary',
  },
};

export const Error: Story = {
  args: {
    ...Primary.args,
    variant: 'error',
  },
};

export const Success: Story = {
  args: {
    ...Primary.args,
    variant: 'success',
  },
};

export const Warning: Story = {
  args: {
    ...Primary.args,
    variant: 'warning',
  },
};

export const Text: Story = {
  args: {
    ...Primary.args,
    variant: 'text',
    children: '텍스트 버튼',
  },
};

export const Link: Story = {
  args: {
    ...Primary.args,
    variant: 'link',
    children: '링크 스타일 버튼',
  },
};

export const Small: Story = {
  args: {
    ...Primary.args,
    size: 'sm',
    children: '작은 버튼',
  },
};

export const Medium: Story = {
  args: {
    ...Primary.args,
    size: 'md',
    children: '중간 버튼',
  },
};

export const Large: Story = {
  args: {
    ...Primary.args,
    size: 'lg',
    children: '큰 버튼',
  },
};

export const Disabled: Story = {
  args: {
    ...Primary.args,
    isDisabled: true,
    children: '비활성화 버튼',
  },
};

export const Loading: Story = {
  args: {
    ...Primary.args,
    isLoading: true,
    children: '로딩 버튼',
  },
};

export const WithLeftIcon: Story = {
  args: {
    ...Primary.args,
    children: '검색',
    icon: <Search size={16} />,
    iconPosition: 'left',
  },
};

export const WithRightIcon: Story = {
  args: {
    ...Primary.args,
    children: '다음',
    icon: <ArrowRight size={16} />,
    iconPosition: 'right',
  },
};

export const TextWithIcon: Story = {
  args: {
    ...Primary.args,
    variant: 'text',
    children: '이메일 보내기',
    icon: <Mail size={16} />,
  },
};

export const LinkWithIcon: Story = {
  args: {
    ...Primary.args,
    variant: 'link',
    children: '웹사이트 방문',
    icon: <ArrowRight size={16} />,
    iconPosition: 'right',
  },
};

export const WithIconOnly: Story = {
  args: {
    ...Primary.args,
    children: null,
    icon: <Search size={16} />,
  },
};
