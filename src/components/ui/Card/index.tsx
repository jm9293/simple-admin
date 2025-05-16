import { cn } from '@/lib/utils';
import { ComponentProps } from 'react';
import { Divider } from '../Divider';

interface CardProps extends ComponentProps<'div'> {
  /**
   * 카드 타이틀을 지정합니다.
   */
  title?: string;
  /**
   * 카드 헤더의 우측에 추가요소를 지정합니다.
   */
  extra?: React.ReactNode;
  /**
   * 카드의 크기를 지정합니다.
   */
  size?: 'sm' | 'md' | 'lg';
  /**
   * 헤더/내용/액션 사이에 구분선을 표시할지 여부를 지정합니다.
   */
  divider?: boolean;
  /**
   * 카드 하단에 액션 영역을 지정합니다.
   */
  actions?: React.ReactNode;
  /**
   * 카드의 내용을 지정합니다.
   */
  children: React.ReactNode;
}

export function Card({
  title,
  extra,
  size = 'md',
  divider = true,
  actions,
  children,
  className,
  ...props
}: CardProps) {
  const contentPaddingClasses = {
    sm: 'p-3',
    md: 'p-4',
    lg: 'p-6',
  };

  const actionsPaddingClasses = {
    sm: 'px-3 py-2',
    md: 'px-4 py-3',
    lg: 'px-6 py-4',
  };

  return (
    <div
      className={cn('rounded-lg border border-gray-200 bg-white shadow-sm', className)}
      {...props}
    >
      {(title || extra) && (
        <>
          <div className={cn('flex items-center justify-between', contentPaddingClasses[size])}>
            {title && <h3 className="text-lg font-medium">{title}</h3>}
            {extra && <div>{extra}</div>}
          </div>
          {divider && <Divider />}
        </>
      )}
      <div className={cn(contentPaddingClasses[size])}>{children}</div>
      {actions && (
        <>
          {divider && <Divider />}
          <div className={cn('flex items-center justify-end gap-2', actionsPaddingClasses[size])}>
            {actions}
          </div>
        </>
      )}
    </div>
  );
}
