import { EntityTable } from "dexie";
import { RepositoryInterface } from "./repository.interface";
import type { UuidGeneratorInterface } from "../services/interfaces/uuid-generator.interface";
import { inject, injectable } from "tsyringe"
import { NotFoundError, RepositoryError } from "../erros/common";
import { PaginationResult } from "./pagination-result";

@injectable()
export class LocalRepository<Model extends { id: string }, CreateDto, UpdateDto> implements RepositoryInterface<Model, CreateDto, UpdateDto> {
  protected table!: EntityTable<Model, 'id', CreateDto>;
  private pageSize = 20;

  constructor(@inject('UuidGenerator') private readonly uuidService: UuidGeneratorInterface) { }

  async find(query: object, page: number = 1): Promise<PaginationResult<Model>> {

    const total = await this.countByQuery(query);
    const results = await this.findByQuery(query, page);

    return {
      data: results,
      meta: {
        current_page: page,
        from: page * this.pageSize - this.pageSize + 1,
        last_page: Math.ceil(total / this.pageSize),
        per_page: this.pageSize,
        to: page * this.pageSize,
        total,
      },
    };
  }

  async countByQuery(query: object): Promise<number> {
    if (Object.keys(query).length === 0) {
      return await this.table.count();
    }

    return await this.table.where(query).count();
  }

  async findByQuery(query: object, page: number = 1): Promise<Model[]> {
    if (Object.keys(query).length === 0) {
      return await this.table.limit(this.pageSize).offset((page - 1) * this.pageSize).toArray();
    }

    return await this.table.where(query).limit(this.pageSize).offset((page - 1) * this.pageSize).toArray();
  }

  async findById(id: string): Promise<Model> {
    const result = await this.table.where({id}).first();
    if (!result) {
      throw new NotFoundError(`Model with id ${id} not found`);
    }
    return result;
  }

  async create(data: CreateDto): Promise<string> {
    const entity = { id: this.uuidService.generate(), ...data } as CreateDto;

    const id = await this.table.add(entity);

    if (typeof id == 'string') {
      return id;
    }

    throw new RepositoryError('Failed to create entity');
  }

  async update(id: string, data: UpdateDto): Promise<void> {
    const result = await this.table.where({id}).modify((obj) => {
      Object.assign(obj, data);
    });

    if (result === 0) {
      throw new NotFoundError(`Model with id ${id} not found`);
    }
  }

  async delete(id: string): Promise<void> {
    const result = await this.table.where({id}).delete();

    if (result === 0) {
      throw new NotFoundError(`Model with id ${id} not found`);
    }
  }
}