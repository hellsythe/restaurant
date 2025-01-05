import { container } from "tsyringe"
import { ProductLocalRepository } from "./product-local.repository"
import { UuidGenerator } from "../global/services/uuid-generator"
import { ProductRemoteRepository } from "./product-remote.repository"
import { CreateProduct } from "./usecases/create-product"
import { FindProduct } from "./usecases/find-product"
import { DeleteProduct } from "./usecases/delete-product"

container.register("UuidGenerator", {useClass: UuidGenerator})
container.register("ProductLocalRepository", { useClass: ProductLocalRepository})
container.register("ProductRemoteRepository", { useClass: ProductRemoteRepository})
container.register("CreateProduct", { useClass: CreateProduct})
container.register("FindProduct", { useClass: FindProduct})
container.register("DeleteProduct", { useClass: DeleteProduct})


export { container }