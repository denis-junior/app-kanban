// src/core/services/api/httpService.ts
import { api } from './axiosConfig';

export type ApiResponse<T> = {
  data: T;
  status: number;
};

export const httpService = {
  get: async <T>(url: string): Promise<ApiResponse<T>> => {
    const response = await api.get<T>(url);
    return { data: response.data, status: response.status };
  },

  post: async <T>(url: string, body: unknown): Promise<ApiResponse<T>> => {
    const response = await api.post<T>(url, body);
    return { data: response.data, status: response.status };
  },

  patch: async <T>(url: string, body: unknown): Promise<ApiResponse<T>> => {
    const response = await api.patch<T>(url, body);
    return { data: response.data, status: response.status };
  },

  put: async <T>(url: string, body: unknown): Promise<ApiResponse<T>> => {
    const response = await api.put<T>(url, body);
    return { data: response.data, status: response.status };
  },

  delete: async (url: string): Promise<{ status: number }> => {
    const response = await api.delete(url);
    return { status: response.status };
  },
};