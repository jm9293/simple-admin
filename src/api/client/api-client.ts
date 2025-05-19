import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

// 환경 변수에서 BaseURL을 가져옵니다.
export const BASE_URL = process.env.BASE_URL || `http://localhost:3000`;

// API 클라이언트 인스턴스 생성
const apiClient: AxiosInstance = axios.create({
  baseURL: `${BASE_URL}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10초 타임아웃
});

// 요청 인터셉터
apiClient.interceptors.request.use((config) => {
  // 요청 전에 수행할 작업
  return config;
});

/**
 * GET 요청
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function get<T>(endpoint: string, params?: Record<string, any>): Promise<T> {
  const config: AxiosRequestConfig = { params };
  const response: AxiosResponse<T> = await apiClient.get(endpoint, config);
  return response.data;
}

/**
 * POST 요청
 */
export async function post<T>(endpoint: string, data: unknown): Promise<T> {
  const response: AxiosResponse<T> = await apiClient.post(endpoint, data);
  return response.data;
}

/**
 * PUT 요청
 */
export async function put<T>(endpoint: string, data: unknown): Promise<T> {
  const response: AxiosResponse<T> = await apiClient.put(endpoint, data);
  return response.data;
}

/**
 * DELETE 요청
 */
export async function del<T>(endpoint: string): Promise<T> {
  const response: AxiosResponse<T> = await apiClient.delete(endpoint);
  return response.data;
}

export default apiClient;
