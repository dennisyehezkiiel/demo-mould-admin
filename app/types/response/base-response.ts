export interface PaginatingResponse {
  page: number;
  limit: number;
  total: number;
  totalPage: number
}

export interface PaginationResponse<T> {
  data: T[];
  pagination: PaginatingResponse
}