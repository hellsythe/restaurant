
import { describe, test, expect } from '@jest/globals';
import { container } from '../product.dependencies';
import { ProductLocalRepository } from './product-local.repository';
import { UuidGenerator } from '@/app/core/global/services/uuid-generator';

describe('ProductLocalRepository', () => {
   const repository = container
   .createChildContainer()
   .register<UuidGenerator>("UuidGenerator", { useValue: { generate: () => '123' } })
   .resolve(ProductLocalRepository);

   test('create product', async () => {
      const id = await repository.create({ name: 'test', price: 100 });

      expect(id).toBe('123');
   });

   test('update product', async () => {
      await repository.create({ name: 'test', price: 100 });
      await repository.update('123', { name: 'anime', price: 100 });
      const product = await repository.findById('123');

      expect(product.name).toBe('anime');
   });
});