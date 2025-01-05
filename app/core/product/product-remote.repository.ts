import { injectable } from "tsyringe";
import { RepositoryInterface } from "../global/repository.interface";
import { CreateProductDto } from "./dtos/create-product.dto";
import { Product } from "./product.model";

@injectable()
export class ProductRemoteRepository implements RepositoryInterface<Product, CreateProductDto> {
  url: string;
  constructor() {
    this.url = process.env.NEXT_PUBLIC_PRODUCT_API_URL || '';
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