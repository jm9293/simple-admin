import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

/**
 * API 클라이언트 설정
 *
 * API 요청을 위한 기본 설정과 유틸리티 함수를 정의합니다.
 */

// 환경 변수에서 API 키와 인증 키를 가져옵니다.
export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || `http://localhost:3000`;

// API 클라이언트 인스턴스 생성
const apiClient: AxiosInstance = axios.create({
  baseURL: `${BASE_URL}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10초 타임아웃
});

// 요청 인터셉터
apiClient.interceptors.request.use(
  (config) => {
    // 요청 전에 수행할 작업
    return config;
  },
  (error) => {
    // 요청 에러 처리
    return Promise.reject(error);
  }
);

// 응답 인터셉터
apiClient.interceptors.response.use(
  (response) => {
    // 응답 데이터 처리
    return response;
  },
  (error) => {
    // 에러 응답 처리
    if (error.response) {
      // 서버가 에러 응답을 반환한 경우
      console.error('API 응답 에러:', error.response.status, error.response.data);
    } else if (error.request) {
      // 요청은 보냈지만 응답을 받지 못한 경우
      console.error('API 요청 에러:', error.request);
    } else {
      // 요청 설정 중에 에러가 발생한 경우
      console.error('API 설정 에러:', error.message);
    }
    return Promise.reject(error);
  }
);

/**
 * GET 요청 헬퍼 함수
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function get<T>(endpoint: string, params?: Record<string, any>): Promise<T> {
  const config: AxiosRequestConfig = { params };
  const response: AxiosResponse<T> = await apiClient.get(endpoint, config);
  return response.data;
}

/**
 * POST 요청 헬퍼 함수
 */
export async function post<T>(endpoint: string, data: unknown): Promise<T> {
  const response: AxiosResponse<T> = await apiClient.post(endpoint, data);
  return response.data;
}

/**
 * PUT 요청 헬퍼 함수
 */
export async function put<T>(endpoint: string, data: unknown): Promise<T> {
  const response: AxiosResponse<T> = await apiClient.put(endpoint, data);
  return response.data;
}

/**
 * DELETE 요청 헬퍼 함수
 */
export async function del<T>(endpoint: string): Promise<T> {
  const response: AxiosResponse<T> = await apiClient.delete(endpoint);
  return response.data;
}

export default apiClient;
