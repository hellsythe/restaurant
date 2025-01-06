import { db } from "./db";
import { injectable } from "tsyringe"
import { CreateProductDto } from "../dtos/create-product.dto";
import { Product } from "../product.model";
import { LocalRepository } from "../../global/repositories/local.repository";
import { UpdateProductDto } from "../dtos/update-product.dto";

@injectable()
export class ProductLocalRepository extends LocalRepository<Product, CreateProductDto, UpdateProductDto> {
   protected table = db.products;
}