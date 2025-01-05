import { injectable } from "tsyringe"
import { UuidGeneratorInterface } from "./interfaces/uuid-generator.interface";

@injectable()
export class UuidGenerator implements UuidGeneratorInterface {
  generate(): string {
    return crypto.randomUUID();
  }
}