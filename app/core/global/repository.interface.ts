export interface RepositoryInterface<Model, CreateDto, UpdateDto> {
  find(query: object): Promise<Model[]>;
  findById(id: string): Promise<Model>;
  create(data: CreateDto): Promise<string>;
  update(id: string, data: UpdateDto): Promise<void>;
  delete(id: string): Promise<void>;
}