export const API_BASE_URL: string = 'http://localhost:8080/api';

export interface ApiResponse<T> {
  code: string;
  message: string;
  data: T;
}

export interface ApiErrorResponse {
  error: {
    code: string;
    message: string;
    data: null;
  };
}
