import { TextField } from '@/components/ui/Input/TextField';
import { debounce } from '@/lib/utils';
import { Search } from 'lucide-react';
import { ChangeEvent, useCallback } from 'react';
import { ActiveType, SearchType } from '../../../app/users/page';

interface UserSearchFieldProps {
  /** 검색어 */
  searchText: string;
  /** 검색 타입 */
  searchType: SearchType;
  /** 활성 상태 */
  activeType: ActiveType;
  /** 검색어 변경 핸들러 */
  onSearchTextChange: (value: string) => void;
  /** 검색 타입 변경 핸들러 */
  onSearchTypeChange: (type: SearchType) => void;
  /** 활성 상태 변경 핸들러 */
  onActiveTypeChange: (type: ActiveType) => void;
}

export function UserSearchField({
  searchText,
  searchType,
  activeType,
  onSearchTextChange,
  onSearchTypeChange,
  onActiveTypeChange,
}: UserSearchFieldProps) {
  // 검색어 변경의 debounce 적용
  const handleSearchChange = debounce((value: string) => onSearchTextChange(value), 300);

  // 검색 타입 변경 핸들러
  const handleSearchTypeChange = useCallback(
    (e: ChangeEvent<HTMLSelectElement>) => {
      onSearchTypeChange(e.target.value as SearchType);
    },
    [onSearchTypeChange]
  );

  // 활성 상태 변경 핸들러
  const handleActiveTypeChange = useCallback(
    (e: ChangeEvent<HTMLSelectElement>) => {
      onActiveTypeChange(e.target.value as ActiveType);
    },
    [onActiveTypeChange]
  );

  return (
    <div className="flex flex-wrap items-center justify-end gap-3">
      <select
        name="active"
        value={activeType}
        className="rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
        onChange={handleActiveTypeChange}
      >
        <option value={ActiveType.ALL}>모든 상태</option>
        <option value={ActiveType.ACTIVE}>활성</option>
        <option value={ActiveType.INACTIVE}>비활성</option>
      </select>
      <select
        name="searchType"
        value={searchType}
        className="rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
        onChange={handleSearchTypeChange}
      >
        <option value={SearchType.NAME}>이름</option>
        <option value={SearchType.EMAIL}>이메일</option>
        <option value={SearchType.ID}>ID</option>
      </select>
      <TextField
        name="searchText"
        placeholder="검색 내용"
        initialValue={searchText}
        onChange={(e) => handleSearchChange(e.target.value)}
        prefixIcon={<Search />}
      />
    </div>
  );
}
