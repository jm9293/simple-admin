'use client';
import { cn } from '@/lib/utils';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ComponentProps } from 'react';
import { Button } from '../Button';

interface PaginationProps extends Omit<ComponentProps<'div'>, 'onChange'> {
  /**
   * 전체 아이템 수
   */
  total: number;
  /**
   * 현재 페이지 번호 (1부터 시작)
   */
  current: number;
  /**
   * 페이지당 아이템 수
   */
  pageSize: number;
  /**
   * 페이지 크기 옵션
   */
  pageSizeOptions?: number[];
  /**
   * 페이지네이션 크기
   */
  size?: 'sm' | 'md' | 'lg';
  /**
   * 페이지네이션 정렬
   */
  align?: 'left' | 'center' | 'right';
  /**
   * 페이지 크기 변경 옵션 표시 여부
   */
  showSizeChanger?: boolean;
  /**
   * 페이지 크기 변경 이벤트 핸들러
   */
  onShowSizeChange?: (current: number, pageSize: number) => void;
  /**
   * 페이지 변경 이벤트 핸들러
   */
  onChange?: (page: number) => void;
}

export function Pagination({
  total,
  current = 1,
  pageSize = 10,
  pageSizeOptions = [10, 20, 50],
  size = 'md',
  align = 'center',
  showSizeChanger = false,
  onShowSizeChange,
  onChange,
  className,
  ...props
}: PaginationProps) {
  // 전체 페이지 수 계산
  const totalPages = Math.ceil(total / pageSize);

  // 표시할 페이지 번호 범위 계산 (최대 5개)
  const getPageRange = () => {
    const range: number[] = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      // 전체 페이지가 5개 이하면 모두 표시
      for (let i = 1; i <= totalPages; i++) {
        range.push(i);
      }
    } else {
      // 전체 페이지가 5개 초과면 현재 페이지 주변 표시
      let start = Math.max(1, current - 2);
      const end = Math.min(totalPages, start + maxVisiblePages - 1);

      // 끝 페이지가 최대값에 도달하면 시작 페이지 조정
      if (end === totalPages) {
        start = Math.max(1, end - maxVisiblePages + 1);
      }

      for (let i = start; i <= end; i++) {
        range.push(i);
      }
    }

    return range;
  };

  // 페이지 변경 핸들러
  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages || page === current) return;

    onChange?.(page);
  };

  // 페이지 크기 변경 핸들러
  const handleSizeChange = (newSize: number) => {
    if (newSize === pageSize) return;
    const newCurrent = Math.floor(((current - 1) * pageSize) / newSize) + 1;
    onShowSizeChange?.(newCurrent, newSize);
  };

  // 버튼 크기 설정
  const buttonSize = size === 'lg' ? 'md' : 'sm';

  // 정렬 클래스
  const alignClasses = {
    left: 'justify-start',
    center: 'justify-center',
    right: 'justify-end',
  };

  // 아이콘 크기 설정
  const iconSize = size === 'lg' ? 20 : size === 'md' ? 16 : 14;

  return (
    <div
      className={cn('flex flex-wrap items-center gap-1', alignClasses[align], className)}
      {...props}
    >
      {/* 이전 페이지 버튼 */}
      <Button
        variant="text"
        size={buttonSize}
        onClick={() => handlePageChange(current - 1)}
        isDisabled={current <= 1}
        className="transition-all duration-200 active:scale-95"
        aria-label="이전 페이지"
        icon={<ChevronLeft size={iconSize} />}
      />

      {/* 페이지 번호 버튼 */}
      <div className="flex items-center gap-2 overflow-hidden p-1">
        {getPageRange().map((page) => (
          <Button
            key={page}
            variant={page === current ? 'primary' : 'text'}
            size={buttonSize}
            onClick={() => handlePageChange(page)}
            className={cn(
              'transition-all duration-200',
              page === current ? 'scale-95 shadow-sm' : 'active:scale-90'
            )}
          >
            {page}
          </Button>
        ))}
      </div>

      {/* 다음 페이지 버튼 */}
      <Button
        variant="text"
        size={buttonSize}
        onClick={() => handlePageChange(current + 1)}
        isDisabled={current >= totalPages}
        className="transition-all duration-200 active:scale-95"
        aria-label="다음 페이지"
        icon={<ChevronRight size={iconSize} />}
      />

      {/* 페이지 크기 변경 옵션 */}
      {showSizeChanger && (
        <div className="ml-4 flex items-center gap-2 transition-all duration-200">
          <span className="text-sm text-gray-500">페이지당 표시:</span>
          <select
            className="rounded border border-gray-300 px-2 py-1 text-sm transition-all duration-200 hover:border-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
            value={pageSize}
            onChange={(e) => handleSizeChange(Number(e.target.value))}
          >
            {pageSizeOptions.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
}
