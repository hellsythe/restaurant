import type { RepositoryInterface } from "@/core/global/repository.interface";
import { inject, injectable } from "tsyringe";
import { CreateProductDto } from "../dtos/create-product.dto";
import { Product } from "../product.model";

@injectable()
export class DeleteProduct {
  constructor(
    @inject('ProductLocalRepository') private readonly productLocalRepository: RepositoryInterface<Product, CreateProductDto>,
    @inject('ProductRemoteRepository') private readonly productRemoteRepository: RepositoryInterface<Product, CreateProductDto>
  ) {
  }

  async execute(id: string): Promise<void> {
    await this.productLocalRepository.delete(id);
    // await this.productRemoteRepository.delete(id);
  }
}