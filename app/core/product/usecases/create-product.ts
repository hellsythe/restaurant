import type { RepositoryInterface } from "@/app/core/global/repositories/repository.interface";
import { inject, injectable } from "tsyringe";
import { CreateProductDto } from "../dtos/create-product.dto";
import { Product } from "../product.model";
import { UpdateProductDto } from "../dtos/update-product.dto";

@injectable()
export class CreateProduct {
  constructor(
    @inject('ProductLocalRepository') private readonly productLocalRepository: RepositoryInterface<Product, CreateProductDto, UpdateProductDto>,
    @inject('ProductRemoteRepository') private readonly productRemoteRepository: RepositoryInterface<Product, CreateProductDto, UpdateProductDto>
  ) {
  }

  async execute(product: CreateProductDto): Promise<string> {
    const id = await this.productLocalRepository.create(product);
    await this.productRemoteRepository.create(product);

    return id;
  }
}