import { cn } from '@/lib/utils';
import { cva } from 'class-variance-authority';
import Link from 'next/link';
import { ComponentProps } from 'react';

interface ButtonProps extends ComponentProps<'button'> {
  /**
   * 버튼의 스타일을 지정합니다.
   */
  variant?: 'primary' | 'secondary' | 'error' | 'success' | 'warning' | 'link' | 'text';
  /**
   * 버튼을 비활성화 합니다.
   */
  isDisabled?: boolean;
  /**
   * 버튼의 사이즈를 지정합니다.
   */
  size?: 'sm' | 'md' | 'lg';
  /**
   * 버튼의 로딩에 애니메이션을 설정합니다. true일 경우 클릭할 수 없습니다.
   */
  isLoading?: boolean;
  /**
   * 버튼의 자식 요소를 지정합니다.
   */
  children?: React.ReactNode;
  /**
   * 버튼의 아이콘을 지정합니다.
   */
  icon?: React.ReactNode;
  /**
   * 버튼의 아이콘 위치를 지정합니다.
   */
  iconPosition?: 'left' | 'right';
  /**
   * 링크로 사용할 경우 이동할 URL을 지정합니다.
   */
  href?: string;
  /**
   * 링크의 target 속성을 지정합니다.
   */
  target?: string;
}

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md font-medium transition-colors disabled:pointer-events-none disabled:opacity-50 cursor-pointer',
  {
    variants: {
      variant: {
        primary: 'bg-blue-600 text-white hover:bg-blue-700',
        secondary: 'bg-gray-100 text-gray-900 hover:bg-gray-200',
        error: 'bg-red-600 text-white hover:bg-red-700',
        success: 'bg-green-600 text-white hover:bg-green-700',
        warning: 'bg-yellow-600 text-white hover:bg-yellow-700',
        text: 'bg-transparent border-none shadow-none text-gray-700 hover:bg-gray-100 hover:text-gray-900',
        link: 'bg-transparent border-none shadow-none text-blue-600 hover:text-blue-600/50 p-0 h-auto',
      },
      size: {
        sm: 'h-8 px-3 text-xs',
        md: 'h-10 px-4 py-2',
        lg: 'h-12 px-6 py-3 text-lg',
      },
    },
    defaultVariants: {
      variant: 'secondary',
      size: 'md',
    },
  }
);

export function Button({
  variant = 'secondary',
  size = 'md',
  isDisabled,
  isLoading,
  className,
  children,
  icon,
  iconPosition = 'left',
  href,
  target,
  ...props
}: ButtonProps) {
  // 로딩 스피너 또는 아이콘 요소
  const iconElement = isLoading ? (
    <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
  ) : (
    icon
  );

  // 최종 렌더링 내용 결정
  const content =
    iconElement && children ? (
      // 아이콘(또는 로딩)과 텍스트가 모두 있는 경우
      <div className="flex items-center gap-2">
        {iconPosition === 'left' && iconElement}
        <span>{children}</span>
        {iconPosition === 'right' && iconElement}
      </div>
    ) : iconElement ? (
      // 아이콘(또는 로딩)만 있는 경우
      iconElement
    ) : (
      // Node만 있는 경우
      children
    );

  const buttonClasses = cn(buttonVariants({ variant, size }), className);

  // href가 있으면 Link 컴포넌트 사용
  if (href) {
    return (
      <Link href={href} className={buttonClasses} target={target}>
        {content}
      </Link>
    );
  }

  // 일반 버튼
  return (
    <button className={buttonClasses} disabled={isDisabled || isLoading} {...props}>
      {content}
    </button>
  );
}
