import { injectable } from "tsyringe";
import { RepositoryInterface } from "../../global/repositories/repository.interface";
import { CreateProductDto } from "../dtos/create-product.dto";
import { Product } from "../product.model";
import { UpdateProductDto } from "../dtos/update-product.dto";

@injectable()
export class ProductRemoteRepository implements RepositoryInterface<Product, CreateProductDto, UpdateProductDto> {
  url: string;
  constructor() {
    this.url = process.env.NEXT_PUBLIC_PRODUCT_API_URL || '';
  }
  async findById(id: string): Promise<Product> {
    throw new Error("Method not implemented.");
  }
  async update(id: string, data: UpdateProductDto): Promise<void> {
    throw new Error("Method not implemented.");
  }

  async create(data: CreateProductDto): Promise<string> {
     return await fetch(`${this.url}/product`, {
      method: 'POST',
      body: JSON.stringify(data),
    })
      .then((response) => {
        return response.text()
      })
  }

  async find(query: object): Promise<Product[]> {
    return await fetch(`${this.url}/product`, {
      method: 'GET',
      body: JSON.stringify(query),
    })
      .then((response) => {
        return response.json()
      })
  }

  async delete(id: string): Promise<void> {
    await fetch(`${this.url}/product/${id}`, {
      method: 'DELETE',
    })
      .then((response) => {
        return response.text()
      })
  }
}