import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * 클래스 이름을 병합하는 유틸리티 함수
 * @param inputs 병합할 클래스 이름 배열
 * @returns 병합된 클래스 이름
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * 디바운스 함수 - 지정된 시간(ms) 동안 함수 호출을 지연시킵니다.
 * @param func 실행할 함수
 * @param wait 지연 시간 (밀리초)
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number = 500
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;

  return function (...args: Parameters<T>) {
    if (timeout) clearTimeout(timeout);

    timeout = setTimeout(() => {
      func(...args);
    }, wait);
  };
}
