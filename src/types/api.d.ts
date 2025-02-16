export type BaseApiResponse<T = object> = {
  data: T;
};

export type BasePaginatedApiResponse<T> = BaseApiResponse<T[]> & {
  meta: {
    page: number;
    totalPage: number;
    totalData: number;
  };
};

export type BaseApiErrorType =
  | "clientError"
  | "serverError"
  | "validationError"
  | "unknownError";

export type BaseApiErrorErrors = {
  code: string;
  detail: string;
  attr: string;
};

export type BaseApiErrorResponse = {
  type: BaseApiErrorType;
  errors: BaseApiErrorErrors[];
  path: string;
  timestamp: string;
};
