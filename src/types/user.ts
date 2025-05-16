// API 응답 메타 정보 타입
export interface ApiMeta {
  status: number;
  message: string;
}

/**
 * 사용자 정보 타입 정의
 */
export interface User {
  /**
   * 사용자 고유 ID
   */
  id: string;

  /**
   * 사용자 일련번호
   */
  seq_no: string;

  /**
   * 사용자 이름
   */
  name: string;

  /**
   * 직급 (예: 사원, 대리, 과장, 차장, 부장)
   */
  job_rank: string;

  /**
   * 소속 부서 (예: 개발팀, 디자인팀, 마케팅팀)
   */
  position: string;

  /**
   * 이메일 주소
   */
  email: string;

  /**
   * 계정 활성화 상태
   */
  active: boolean;
}

// 사용자 상세 정보 타입 (기본 정보 + 추가 정보)
export interface UserDetail extends User {
  ip_address: string;
  join_date: string;
}

// 사용자 목록 조회 응답 타입
export interface UserListResponse {
  meta: ApiMeta;
  data: {
    page_index: number;
    page_size: number;
    total_count: number;
    result_list: User[];
  };
}

// 사용자 상세 조회 응답 타입
export interface UserDetailResponse {
  meta: ApiMeta;
  data: UserDetail;
}

// 사용자 정보 수정/삭제 응답 타입
export interface UserActionResponse {
  meta: ApiMeta;
}

// 사용자 목록 조회 파라미터 타입
export interface UserListParams {
  page_index: number;
  page_size: number;
  id?: string;
  name?: string;
  email?: string;
  active?: boolean;
}

// 사용자 정보 수정 파라미터 타입
export interface UserUpdateParams {
  name: string;
  job_rank: string;
  position: string;
  email: string;
  ip_address: string;
  active: boolean;
  join_date: string;
}
