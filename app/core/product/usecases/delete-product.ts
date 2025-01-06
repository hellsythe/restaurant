import type { RepositoryInterface } from "@/app/core/global/repositories/repository.interface";
import { inject, injectable } from "tsyringe";
import { CreateProductDto } from "../dtos/create-product.dto";
import { Product } from "../product.model";
import { UpdateProductDto } from "../dtos/update-product.dto";

@injectable()
export class DeleteProduct {
  constructor(
    @inject('ProductLocalRepository') private readonly productLocalRepository: RepositoryInterface<Product, CreateProductDto, UpdateProductDto>,
    @inject('ProductRemoteRepository') private readonly productRemoteRepository: RepositoryInterface<Product, CreateProductDto, UpdateProductDto>
  ) {
  }

  async execute(id: string): Promise<void> {
    await this.productLocalRepository.delete(id);
    // await this.productRemoteRepository.delete(id);
  }
}