// src/core/services/api/types/errorTypes.ts
export interface ApiError {
  message: string;
  statusCode: number;
};

export interface ApiErrorResponse {
  error: ApiError;
};