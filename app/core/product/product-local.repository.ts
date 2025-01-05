import { db } from "./db";
import { injectable } from "tsyringe"
import { CreateProductDto } from "./dtos/create-product.dto";
import { Product } from "./product.model";
import { LocalRepository } from "../global/local.repository";

@injectable()
export class ProductLocalRepository extends LocalRepository<Product, CreateProductDto> {
   protected table = db.products;
}