import type { RepositoryInterface } from "@/app/core/global/repositories/repository.interface";
import { inject, injectable } from "tsyringe";
import { Product } from "../product.model";
import { CreateProductDto } from "../dtos/create-product.dto";
import { UpdateProductDto } from "../dtos/update-product.dto";

@injectable()
export class FindProduct {
   constructor(
      @inject('ProductLocalRepository') private readonly productLocalRepository: RepositoryInterface<Product, CreateProductDto, UpdateProductDto>,
      @inject('ProductRemoteRepository') private readonly productRemoteRepository: RepositoryInterface<Product, CreateProductDto, UpdateProductDto>
    ) {
    }

  async execute(query: object): Promise<Product[]> {
    return await this.productLocalRepository.find(query);
  }
}