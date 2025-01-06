
import { describe, test, expect } from '@jest/globals';
import { container } from '../product.dependencies';
import { ProductLocalRepository } from './product-local.repository';
import { UuidGenerator } from '@/app/core/global/services/uuid-generator';

describe('ProductLocalRepository', () => {
   test('create product', async () => {
      const repository = container
         .createChildContainer()
         .register<UuidGenerator>("UuidGenerator", { useValue: { generate: () => '123' } })
         .resolve(ProductLocalRepository);

      const id = await repository.create({ name: 'test', price: 100 });

      expect(id).toBe('123');
   });
});