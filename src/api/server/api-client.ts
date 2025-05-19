// 환경 변수에서 API 키와 인증 키를 가져옵니다.
// 실제 환경에서는 .env.local 파일이나 환경 변수를 통해 설정해야 합니다.
// http://localhost:3001/api 은 Mock 서버입니다.

const AUTH_KEY = process.env.FABRICATE_AUTH_KEY || 'auth_key';
const API_KEY = process.env.FABRICATE_API_KEY || 'api_key';

// .env.local에 키가 없다면 Mock 서버를 바라보도록
const BASE_URL =
  (API_KEY != 'api_key' &&
    `https://fabricate.mockaroo.com/api/v1/workspaces/danal/databases/${API_KEY}/api`) ||
  `http://localhost:3001/api`;

// API 요청 옵션 타입
type RequestOptions = {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  headers?: Record<string, string>;
  body?: unknown;
};

// API 에러 클래스
export class ApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
  }
}

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
      const status = response.status;
      let errorMessage = `API 요청 실패: ${status}`;

      try {
        const errorData = await response.json();
        errorMessage = errorData.message || errorMessage;
      } catch {
        // JSON 파싱 실패 시 기본 에러 메시지 사용
      }

      throw new ApiError(errorMessage, status);
    }

    // 응답 데이터 반환
    return (await response.json()) as T;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError((error as Error).message, 500);
  }
}

/**
 * GET 요청
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
 * POST 요청
 */
export function post<T>(endpoint: string, data: unknown): Promise<T> {
  return apiRequest<T>(endpoint, { method: 'POST', body: data });
}

/**
 * DELETE 요청
 */
export function del<T>(endpoint: string): Promise<T> {
  return apiRequest<T>(endpoint, { method: 'DELETE' });
}
