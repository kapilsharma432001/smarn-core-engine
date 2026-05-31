export type ApiErrorCode = 
    | "VALIDATION_ERROR"
    | "MEMORY_NOT_FOUND"
    | "MEMORY_ALREADY_EXISTS"
    | "MEMORY_ALREADY_DELETED"
    | "UNKNOWN_ERROR";

export type ApiError = {
    code: ApiErrorCode;
    message: string;
    details?: Record<string, string[]>; // detail must have key value as string and value as array of strings (object where key is string and value is array of strings)
}

export type ApiMeta = {
    requestId: string;
    timestamp: string; 
}

export type ApiSuccess<T> = { // <T> means this is generic - so we can reuse it for different types
    success: true;
    data: T;
    meta?: ApiMeta;
}

export type ApiFailure = { // failure does not need generic data because it will always have the same structure (error)
    success: false;
    error: ApiError;
    meta?: ApiMeta;
}

export type ApiResult<T> = ApiSuccess<T> | ApiFailure; // this is discriminated union - this means either success with data or failure with error

