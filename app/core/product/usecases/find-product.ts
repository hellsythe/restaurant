import type { RepositoryInterface } from "@/core/global/repository.interface";
import { inject, injectable } from "tsyringe";
import { Product } from "../product.model";
import { CreateProductDto } from "../dtos/create-product.dto";

@injectable()
export class FindProduct {
   constructor(
      @inject('ProductLocalRepository') private readonly productLocalRepository: RepositoryInterface<Product, CreateProductDto>,
      @inject('ProductRemoteRepository') private readonly productRemoteRepository: RepositoryInterface<Product, CreateProductDto>
    ) {
    }

  async execute(query: object): Promise<Product[]> {
    return await this.productLocalRepository.find(query);
  }
}