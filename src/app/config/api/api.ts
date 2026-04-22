export const BASE_API_URL: string = 'http://localhost:8080';

export interface ApiResponse<T> {
    code: string;
    message: string;
    data: T;
}