export interface PaginationResult<T> {
  data: T[];
  meta: {
    from: number;
    to: number;
    total: number;
    current_page: number;
    last_page: number;
    per_page: number;
  };
}