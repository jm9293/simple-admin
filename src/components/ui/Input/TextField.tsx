import { cn } from '@/lib/utils';
import { cva } from 'class-variance-authority';
import { ComponentProps, forwardRef, useEffect, useState } from 'react';

export interface TextFieldProps extends Omit<ComponentProps<'input'>, 'size'> {
  /**
   * 입력 필드의 라벨을 지정합니다.
   */
  label?: string;
  /**
   * 에러 메시지를 지정합니다.
   */
  error?: string;
  /**
   * 도움말 텍스트를 지정합니다.
   */
  helperText?: string;
  /**
   * 입력 필드의 상태를 지정합니다.
   */
  status?: 'default' | 'error' | 'success' | 'warning';
  /**
   * 입력 필드의 크기를 지정합니다.
   */
  size?: 'sm' | 'md' | 'lg';
  /**
   * 입력 필드의 접두 아이콘을 지정합니다.
   */
  prefixIcon?: React.ReactNode;
  /**
   * 입력 필드의 접미 아이콘을 지정합니다.
   */
  suffixIcon?: React.ReactNode;
  /**
   * 라벨 위치를 지정합니다.
   */
  labelPosition?: 'top' | 'left';
  /**
   * 로딩 상태를 지정합니다.
   */
  isLoading?: boolean;
  /**
   * 입력 필드의 초기 값을 지정합니다.
   */
  initialValue?: string;
}

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  (
    {
      label,
      error,
      helperText,
      status = 'default',
      size = 'md',
      className,
      prefixIcon,
      suffixIcon,
      labelPosition = 'top',
      disabled,
      isLoading = false,
      initialValue,
      value,
      onChange,
      ...props
    },
    ref
  ) => {
    // initialValue와 외부 값 동기화를 위한 내부 상태
    const [internalValue, setInternalValue] = useState(initialValue || value || '');

    // 외부 value prop이 변경될 때 내부 상태 업데이트
    useEffect(() => {
      if (value !== undefined) {
        setInternalValue(value as string);
      }
    }, [value]);

    // 내부 상태 변경 핸들러
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setInternalValue(e.target.value);
      if (onChange) {
        onChange(e);
      }
    };

    const inputVariants = cva(
      'block rounded-md border bg-white transition-colors w-auto focus:outline-none focus:ring-1',
      {
        variants: {
          status: {
            default: 'border-gray-300 focus:border-blue-500 focus:ring-blue-500',
            error: 'border-red-500 focus:border-red-500 focus:ring-red-500',
            success: 'border-green-500 focus:border-green-500 focus:ring-green-500',
            warning: 'border-yellow-500 focus:border-yellow-500 focus:ring-yellow-500',
          },
          size: {
            sm: 'h-8 text-xs px-2 py-1',
            md: 'h-10 text-sm px-3 py-2',
            lg: 'h-12 text-base px-4 py-3',
          },
          disabled: {
            true: 'bg-gray-100 text-gray-500 cursor-not-allowed',
          },
          prefixIcon: {
            true: 'pl-8',
          },
          suffixIcon: {
            true: 'pr-8',
          },
        },
        defaultVariants: {
          status: 'default',
          size: 'md',
        },
      }
    );

    // 라벨 크기 클래스
    const labelSizeClasses = {
      sm: 'text-xs',
      md: 'text-sm',
      lg: 'text-base',
    };

    // 라벨 위치에 따른 컨테이너 클래스
    const containerClasses = {
      top: 'flex flex-col gap-1',
      left: 'flex flex-row items-center gap-2',
    };

    // 에러 또는 도움말 텍스트 크기
    const helperTextSizeClasses = {
      sm: 'text-xs',
      md: 'text-xs',
      lg: 'text-sm',
    };

    // 상태에 따른 텍스트 색상
    const statusTextClasses = {
      default: 'text-gray-500',
      error: 'text-red-500',
      success: 'text-green-500',
      warning: 'text-yellow-500',
    };

    // 아이콘 크기
    const iconSizeClasses = {
      sm: 'w-3 h-3',
      md: 'w-4 h-4',
      lg: 'w-5 h-5',
    };

    // 높이 클래스
    const heightClasses = {
      sm: 'h-8',
      md: 'h-10',
      lg: 'h-12',
    };

    // 로딩 스켈레톤 컴포넌트
    const LoadingSkeleton = () => (
      <div className={cn('w-full animate-pulse rounded bg-gray-200', heightClasses[size])}></div>
    );

    // 입력 필드 기본 클래스
    const inputBaseClasses = cn(
      inputVariants({ status, size, disabled, prefixIcon: !!prefixIcon, suffixIcon: !!suffixIcon }),
      className
    );

    return (
      <div className={containerClasses[labelPosition]}>
        {label && (
          <label
            htmlFor={props.id}
            className={cn(
              labelSizeClasses[size],
              'font-medium text-gray-700',
              labelPosition === 'left' && 'min-w-[80px]',
              status === 'error' && 'text-red-500'
            )}
          >
            {label}
          </label>
        )}

        <div className="relative flex-grow">
          {isLoading ? (
            <LoadingSkeleton />
          ) : (
            <>
              {prefixIcon && (
                <div
                  className={cn(
                    'absolute top-1/2 left-2 flex -translate-y-1/2 items-center justify-center text-gray-400',
                    iconSizeClasses[size]
                  )}
                >
                  {prefixIcon}
                </div>
              )}

              <input
                ref={ref}
                disabled={disabled}
                className={inputBaseClasses}
                value={internalValue}
                onChange={handleChange}
                {...props}
              />

              {suffixIcon && (
                <div
                  className={cn(
                    'absolute top-1/2 right-2 flex -translate-y-1/2 items-center justify-center text-gray-400',
                    iconSizeClasses[size]
                  )}
                >
                  {suffixIcon}
                </div>
              )}
            </>
          )}
        </div>

        {(error || helperText) && (
          <div className={cn(helperTextSizeClasses[size], statusTextClasses[status])}>
            {error || helperText}
          </div>
        )}
      </div>
    );
  }
);

TextField.displayName = 'TextField';
