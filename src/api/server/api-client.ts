/**
 * API 클라이언트 설정
 *
 * API 요청을 위한 기본 설정과 유틸리티 함수를 정의합니다.
 */

// 환경 변수에서 API 키와 인증 키를 가져옵니다.
// 실제 환경에서는 .env 파일이나 환경 변수를 통해 설정해야 합니다.

const AUTH_KEY = process.env.FABRICATE_AUTH_KEY || 'auth_key';
const BASE_URL = process.env.FABRICATE_BASE_URL || `http://localhost:3001/api`;

// API 요청 옵션 타입
type RequestOptions = {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  headers?: Record<string, string>;
  body?: unknown;
};

/**
 * API 요청 함수
 * @param endpoint API 엔드포인트 경로
 * @param options 요청 옵션
 * @returns 응답 데이터
 */
export async function apiRequest<T>(endpoint: string, options: RequestOptions): Promise<T> {
  const url = `${BASE_URL}${endpoint}`;

  // 기본 헤더 설정
  const headers = {
    Authorization: `Bearer ${AUTH_KEY}`,
    'Content-Type': 'application/json',
    ...options.headers,
  };

  // 요청 옵션 구성
  const requestOptions: RequestInit = {
    method: options.method,
    headers,
    ...(options.body ? { body: JSON.stringify(options.body) } : {}),
  };

  try {
    const response = await fetch(url, requestOptions);

    // 응답이 성공적이지 않은 경우 에러 처리
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `API 요청 실패: ${response.status}`);
    }

    // 응답 데이터 반환
    return (await response.json()) as T;
  } catch (error) {
    throw error;
  }
}

/**
 * GET 요청 헬퍼 함수
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function get<T>(endpoint: string, params?: Record<string, any>): Promise<T> {
  // URL 파라미터 구성
  const queryParams = params
    ? '?' +
      new URLSearchParams(
        Object.entries(params)
          .filter(([, value]) => {
            return value !== undefined && value !== null && value !== '';
          })
          .map(([key, value]) => [key, String(value)])
      ).toString()
    : '';

  return apiRequest<T>(`${endpoint}${queryParams}`, { method: 'GET' });
}

/**
 * POST 요청 헬퍼 함수
 */
export function post<T>(endpoint: string, data: unknown): Promise<T> {
  return apiRequest<T>(endpoint, { method: 'POST', body: data });
}

/**
 * DELETE 요청 헬퍼 함수
 */
export function del<T>(endpoint: string): Promise<T> {
  return apiRequest<T>(endpoint, { method: 'DELETE' });
}
