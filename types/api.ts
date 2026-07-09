/** Represents a generic API response */
export interface ApiResponse<T> {
  readonly success: boolean;
  readonly data?: T;
  readonly error?: ApiError;
}

/** Represents an API error */
export interface ApiError {
  readonly code: string;
  readonly message: string;
}

/** Represents a successful API response */
export interface ApiSuccess<T> extends ApiResponse<T> {
  readonly success: true;
  readonly data: T;
}
