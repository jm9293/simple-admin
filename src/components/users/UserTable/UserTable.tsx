'use client';

import { getProxyUserList } from '@/api/client/users';
import { Button } from '@/components/ui/Button';
import { Pagination } from '@/components/ui/Pagination';
import { Table, TableColumn } from '@/components/ui/Table';
import { Tag } from '@/components/ui/Tag';
import { User, UserListParams } from '@/types/user';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { ActiveType, SearchType } from '../../../app/users/page';
import { UserSearchField } from '../UserSearchField';

interface UserListFilter {
  page: number;
  pageSize: number;
  activeType: ActiveType;
  searchType: SearchType;
  searchText?: string;
}

interface UserListProps {
  initialData: {
    data: User[];
    total: number;
    filter: UserListFilter;
  };
}

export default function UserList({ initialData }: UserListProps) {
  const [users, setUsers] = useState(initialData.data);
  const [total, setTotal] = useState(initialData.total);
  const [page, setPage] = useState(initialData.filter.page);
  const [pageSize, setPageSize] = useState(initialData.filter.pageSize);
  const [searchText, setSearchText] = useState(initialData.filter.searchText || '');
  const [activeType, setActiveType] = useState(initialData.filter.activeType);
  const [searchType, setSearchType] = useState<SearchType>(initialData.filter.searchType);
  const isInitialRender = useRef(true);
  const router = useRouter();

  // 쿼리스트링 업데이트 함수
  const updateQueryString = useCallback(() => {
    const url = new URL(window.location.href);

    // 페이지 정보
    url.searchParams.set('page', String(page));
    url.searchParams.set('pageSize', String(pageSize));

    // 활성 상태
    if (activeType !== 'ALL') {
      url.searchParams.set('active', activeType);
    } else {
      url.searchParams.delete('active');
    }

    // 검색어
    if (searchText) {
      url.searchParams.set('searchText', searchText);
    } else {
      url.searchParams.delete('searchText');
    }
    // 검색 타입
    url.searchParams.set('searchType', searchType);

    // URL 업데이트 (새로고침 없이)
    window.history.replaceState({}, '', url.toString());
  }, [page, pageSize, activeType, searchText, searchType]);

  // 사용자 데이터 가져오기
  const fetchUsers = useCallback(async () => {
    try {
      const filter: UserListParams = {
        page_index: page,
        page_size: pageSize,
        active: activeType === 'ALL' ? undefined : activeType === 'ACTIVE',
      };

      switch (searchType) {
        case SearchType.NAME:
          filter.name = searchText;
          break;
        case SearchType.EMAIL:
          filter.email = searchText;
          break;
        case SearchType.ID:
          filter.id = searchText;
          break;
      }

      const {
        data: { result_list, total_count },
      } = await getProxyUserList(filter);

      setUsers(result_list);
      setTotal(total_count);

      // 데이터 로드 후 쿼리스트링 업데이트
      updateQueryString();
    } catch {
      alert('사용자 목록을 불러오는 중 오류가 발생했습니다:');
    }
  }, [page, pageSize, activeType, searchType, updateQueryString, searchText]);

  // 검색어 변경 핸들러
  const handleSearchTextChange = useCallback((value: string) => {
    setSearchText(value);
    setPage(1); // 검색어 변경 시 첫 페이지로 이동
  }, []);

  // 검색 타입 변경 핸들러
  const handleSearchTypeChange = useCallback((type: SearchType) => {
    setSearchType(type);
    setPage(1); // 검색 타입 변경 시 첫 페이지로 이동
  }, []);

  // 활성 상태 변경 핸들러
  const handleActiveTypeChange = useCallback((type: ActiveType) => {
    setActiveType(type);
    setPage(1); // 활성 상태 변경 시 첫 페이지로 이동
  }, []);

  // 테이블 컬럼 정의
  const columns: TableColumn<User>[] = useMemo(() => {
    return [
      {
        key: 'id',
        label: 'ID',
        dataIndex: 'id',
        width: '8%',
      },
      {
        key: 'name',
        label: '이름',
        dataIndex: 'name',
        width: '12%',
        render: (name) => <div className="text-sm font-medium text-gray-900">{name}</div>,
      },
      {
        key: 'email',
        label: '로그인 이메일',
        dataIndex: 'email',
        width: '30%',
        render: (email) => {
          return <span className="text-sm text-gray-500">{email}</span>;
        },
      },
      {
        key: 'position',
        label: '소속 부서',
        dataIndex: 'position',
        width: '15%',
        render: (position) => <span className="text-sm text-gray-500">{position}</span>,
      },
      {
        key: 'job_rank',
        label: '직책',
        dataIndex: 'job_rank',
        width: '10%',
        render: (jobRank) => <span className="text-sm text-gray-500">{jobRank}</span>,
      },
      {
        key: 'active',
        label: '상태',
        dataIndex: 'active',
        width: '10%',
        render: (active) =>
          active ? <Tag variant="success">활성</Tag> : <Tag variant="danger">비활성</Tag>,
      },
      {
        key: 'actions',
        label: '',
        dataIndex: 'id',
        width: '15%',
        render: (_, user) => (
          <div className="flex items-center justify-end gap-2">
            <Button
              variant="link"
              size="sm"
              aria-label="상세보기"
              onClick={() => {
                router.push(`/users/${user.id}`);
              }}
            >
              상세 보기
            </Button>
          </div>
        ),
      },
    ];
  }, [router]);

  // filter 변경시 데이터 가져오기
  useEffect(() => {
    // 첫 렌더링 시에는 initialData를 사용
    if (isInitialRender.current) {
      isInitialRender.current = false;
      // 첫 렌더링 시에는 쿼리스트링이 없을수도 있으므로 업데이트
      updateQueryString();
      return;
    }

    // 이후 Filter 상태가 변경될 때 API 호출
    fetchUsers();
  }, [fetchUsers, updateQueryString, searchText]);

  return (
    <>
      <div className="mb-4">
        <UserSearchField
          searchText={searchText}
          searchType={searchType}
          activeType={activeType}
          onSearchTextChange={handleSearchTextChange}
          onSearchTypeChange={handleSearchTypeChange}
          onActiveTypeChange={handleActiveTypeChange}
        />
      </div>

      {/* 테이블 영역 */}
      <div className="mb-4 rounded-lg border border-gray-200 bg-white">
        <Table
          data={users}
          columns={columns}
          rowKey="id"
          headerClassName="bg-gray-50"
          maxHeight="700px"
        />
      </div>

      {/* 페이지네이션 영역 */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-500">
          총 <span className="font-medium">{total}</span>명의 사용자
        </div>
        <Pagination
          total={total}
          current={page}
          pageSize={pageSize}
          pageSizeOptions={[10, 30, 50]}
          showSizeChanger={true}
          onChange={(newPage) => {
            setPage(newPage);
          }}
          onShowSizeChange={(newPage, newPageSize) => {
            setPage(newPage);
            setPageSize(newPageSize);
          }}
        />
      </div>
    </>
  );
}
