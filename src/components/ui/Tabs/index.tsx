import { cn } from '@/lib/utils';

interface TabsProps {
  defaultActiveKey: string;
  activeKey: string;
  onChange: (key: string) => void;
  items: {
    key: string;
    label: string;
  }[];
}

export function Tabs({ activeKey, onChange, items }: TabsProps) {
  // 활성 탭의 인덱스를 찾습니다
  const activeIndex = items.findIndex((item) => item.key === activeKey);

  return (
    <div className="w-full">
      <div className="relative flex border-b border-gray-200">
        {/* 애니메이션이 있는 인디케이터 */}
        <div
          className="absolute bottom-0 h-0.5 bg-blue-500 transition-all duration-300 ease-in-out"
          style={{
            left: `${(100 / items.length) * activeIndex}%`,
            width: `${100 / items.length}%`,
          }}
        />

        {items.map((item) => (
          <button
            key={item.key}
            type="button"
            onClick={() => onChange(item.key)}
            className={cn(
              'flex-1 px-4 py-2 text-sm font-medium transition-colors duration-200',
              activeKey === item.key ? 'text-blue-600' : 'text-gray-500 hover:text-blue-500'
            )}
          >
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
}
