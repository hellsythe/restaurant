import type { RepositoryInterface } from "@/core/global/repository.interface";
import { inject, injectable } from "tsyringe";
import { CreateProductDto } from "../dtos/create-product.dto";
import { Product } from "../product.model";

@injectable()
export class CreateProduct {
  constructor(
    @inject('ProductLocalRepository') private readonly productLocalRepository: RepositoryInterface<Product, CreateProductDto>,
    @inject('ProductRemoteRepository') private readonly productRemoteRepository: RepositoryInterface<Product, CreateProductDto>
  ) {
  }

  async execute(product: CreateProductDto): Promise<string> {
    const id = await this.productLocalRepository.create(product);
    await this.productRemoteRepository.create(product);

    return id;
  }
}