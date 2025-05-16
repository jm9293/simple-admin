import { getUserList } from '@/api/server/users';
import { UserListParams } from '@/types/user';
import UserTable from './components/UserTable';

export enum SearchType {
  NAME = 'NAME',
  EMAIL = 'EMAIL',
  ID = 'ID',
}

export enum ActiveType {
  ALL = 'ALL',
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}

interface UsersPageProps {
  searchParams: {
    page?: string;
    pageSize?: string;
    activeType?: ActiveType;
    searchText?: string;
    searchType?: SearchType;
  };
}

export default async function UsersPage({ searchParams }: UsersPageProps) {
  const params = await Promise.resolve(searchParams);

  // URL 파라미터에서 페이지 정보 가져오기
  const page = params.page ? parseInt(params.page, 10) : 1;
  const pageSize = params.pageSize ? parseInt(params.pageSize, 10) : 10;
  const activeType = params.activeType || ActiveType.ALL;
  const searchText = params.searchText || '';
  const searchType = params.searchType || SearchType.NAME;

  // API 요청 파라미터 구성
  const apiParams: UserListParams = {
    page_index: page,
    page_size: pageSize,
    active: activeType === 'ALL' ? undefined : activeType === 'ACTIVE',
  };

  // 검색어가 있는 경우 검색 파라미터 추가
  if (searchText) {
    switch (searchType) {
      case SearchType.NAME:
        apiParams.name = searchText;
        break;
      case SearchType.EMAIL:
        apiParams.email = searchText;
        break;
      case SearchType.ID:
        apiParams.id = searchText;
        break;
    }
  }

  // 서버에서 데이터 가져오기
  const {
    data: { result_list, total_count },
  } = await getUserList(apiParams);

  return (
    <div className="container mx-auto p-6">
      <h1 className="mb-6 text-2xl font-bold text-gray-800">사용자 관리</h1>
      <UserTable
        initialData={{
          data: result_list,
          total: total_count,
          filter: {
            page: page,
            pageSize: pageSize,
            activeType,
            searchText,
            searchType,
          },
        }}
      />
    </div>
  );
}
