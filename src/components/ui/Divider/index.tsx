import { cn } from '@/lib/utils';

export interface DividerProps {
  /**
   * 라인 타입
   */
  type?: 'solid' | 'dashed' | 'dotted';
  /**
   * 라인 방향
   */
  orientation?: 'horizontal' | 'vertical';
  /**
   * 클래스명
   */
  className?: string;
}

export function Divider({ type = 'solid', orientation = 'horizontal', className }: DividerProps) {
  const styles = {
    solid: 'bg-gray-300',
    dashed: 'border-dashed border-gray-300',
    dotted: 'border-dotted border-gray-300',
  };

  return (
    <div
      className={cn(
        orientation === 'horizontal' ? 'h-[1px] w-full' : 'h-full w-[1px] self-stretch',
        type === 'solid' ? styles.solid : `border-[1px] ${styles[type]}`,
        className
      )}
    />
  );
}
