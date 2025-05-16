import { cn } from '@/lib/utils';
import React from 'react';

export interface TableColumn<T> {
  key: string;
  label: string;
  dataIndex: keyof T;
  width?: string;
  render?: (value: T[keyof T], item: T, index: number) => React.ReactNode;
}

interface TableProps<T> {
  data: T[];
  columns: TableColumn<T>[];
  rowKey: keyof T | ((item: T, index: number) => React.Key);
  headerClassName?: string;
  maxHeight?: string;
}

export function Table<T>({
  data,
  columns,
  rowKey,
  headerClassName,
  maxHeight = '400px',
}: TableProps<T>) {
  const getKey = (item: T, index: number): React.Key => {
    return typeof rowKey === 'function' ? rowKey(item, index) : String(item[rowKey]);
  };

  return (
    <div className="w-full overflow-hidden">
      <div className="w-full">
        <table className="w-full table-fixed border-collapse">
          <colgroup>
            {columns.map((column) => (
              <col key={column.key} style={{ width: column.width || 'auto' }} />
            ))}
          </colgroup>
          <thead className="sticky top-0 z-10">
            <tr className={cn('bg-gray-100', headerClassName)}>
              {columns.map((column) => (
                <th
                  key={column.key}
                  className="border-b border-gray-200 px-4 py-3 text-left text-sm font-medium text-gray-700"
                  style={{ width: column.width || 'auto' }}
                >
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>
        </table>
      </div>

      <div style={{ maxHeight }} className="overflow-y-auto">
        <table className="w-full table-fixed border-collapse">
          <colgroup>
            {columns.map((column) => (
              <col key={column.key} style={{ width: column.width || 'auto' }} />
            ))}
          </colgroup>
          <tbody>
            {data.length > 0 ? (
              data.map((item, rowIndex) => (
                <tr
                  key={getKey(item, rowIndex)}
                  // 마지막 행이 아니라면 border 추가
                  className={cn(
                    'hover:bg-gray-50',
                    rowIndex !== data.length - 1 && 'border-b border-gray-200'
                  )}
                >
                  {columns.map((column) => (
                    <td
                      key={`${column.key}-${getKey(item, rowIndex)}`}
                      className="px-4 py-3 text-sm text-gray-700"
                      style={{ width: column.width }}
                    >
                      {column.render
                        ? column.render(item[column.dataIndex], item, rowIndex)
                        : (item[column.dataIndex] as React.ReactNode)}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length} className="px-4 py-6 text-center text-gray-500">
                  데이터가 없습니다.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
