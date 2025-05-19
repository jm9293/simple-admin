import type {
  UserActionResponse,
  UserDetailResponse,
  UserListParams,
  UserListResponse,
  UserUpdateParams,
} from '@/types/user';
import { del, get, post } from './api-client';

/**
 * 사용자 목록 조회 API
 * @param params 조회 파라미터
 * @returns 사용자 목록 응답
 */
export async function getUserList(params: UserListParams): Promise<UserListResponse> {
  return await get<UserListResponse>('/users', params);
}

/**
 * 사용자 상세 조회 API
 * @param id 사용자 ID
 * @returns 사용자 상세 정보 응답
 */
export async function getUserDetail(id: string): Promise<UserDetailResponse> {
  return await get<UserDetailResponse>(`/users/${id}`);
}

/**
 * 사용자 정보 수정 API
 * @param id 사용자 ID
 * @param data 수정할 사용자 정보
 * @returns 응답 결과
 */
export async function updateUser(id: string, data: UserUpdateParams): Promise<UserActionResponse> {
  return await post<UserActionResponse>(`/users/${id}`, data);
}

/**
 * 사용자 삭제 API
 * @param id 삭제할 사용자 ID
 * @returns 응답 결과
 */
export async function deleteUser(id: string): Promise<UserActionResponse> {
  return await del<UserActionResponse>(`/users/${id}`);
}
