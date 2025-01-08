import { PaginationResult } from "./pagination-result";

export interface RepositoryInterface<Model, CreateDto, UpdateDto> {
  find(query: object, page: number): Promise<PaginationResult<Model>>;
  findById(id: string): Promise<Model>;
  create(data: CreateDto): Promise<string>;
  update(id: string, data: UpdateDto): Promise<void>;
  delete(id: string): Promise<void>;
}