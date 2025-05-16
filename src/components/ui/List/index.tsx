import { ComponentProps } from 'react';
import { cn } from '../../../lib/utils';
import { Divider } from '../Divider';

interface ListProps<T> extends Omit<ComponentProps<'div'>, 'children'> {
  data: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  rowKey: keyof T | ((item: T, index: number) => React.Key);
  size?: 'sm' | 'md' | 'lg';
  header?: React.ReactNode;
  footer?: React.ReactNode;
}

export function List<T>({
  data,
  renderItem = (item: T) => <div>{String(item)}</div>,
  rowKey = (_, index) => index,
  size = 'md',
  className,
  header,
  footer,
  ...props
}: ListProps<T>) {
  const getKey = (item: T, index: number): React.Key => {
    return typeof rowKey === 'function' ? rowKey(item, index) : String(item[rowKey]);
  };

  const sizeClasses = {
    sm: 'gap-1',
    md: 'gap-2',
    lg: 'gap-3',
  };

  const itemClasses = {
    sm: 'px-3 py-2',
    md: 'px-4 py-3',
    lg: 'px-5 py-4',
  };

  return (
    <div className="rounded-lg border border-gray-200 bg-white shadow-sm">
      {header && (
        <>
          <div className={cn('font-medium', itemClasses[size])}>{header}</div>
          <Divider />
        </>
      )}
      <div className={cn('flex flex-col', sizeClasses[size], className)} {...props}>
        {data.map((item, index) => {
          const key = getKey(item, index);
          return (
            <div key={key} className="flex flex-col">
              {index > 0 && <Divider />}
              <div className={itemClasses[size]}>{renderItem(item, index)}</div>
            </div>
          );
        })}
      </div>
      {footer && (
        <>
          <Divider />
          <div className={cn('font-medium', itemClasses[size])}>{footer}</div>
        </>
      )}
    </div>
  );
}
