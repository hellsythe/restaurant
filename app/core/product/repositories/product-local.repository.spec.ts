
import { describe, test, expect, jest } from '@jest/globals';
import { container } from '../product.dependencies';
import { ProductLocalRepository } from './product-local.repository';
import { UuidGenerator } from '@/app/core/global/services/uuid-generator';
import { before } from 'node:test';
jest.mock('@/app/core/global/services/uuid-generator', () => {
   return {
      UuidGenerator: jest.fn().mockImplementation(() => {
       return {generate: () => {'generate'}};
     }),
   };
 });
//  jest.mock('@/app/core/global/services/uuid-generator', () => ({ MyClass: jest.fn() }));


describe('ProductLocalRepository', () => {
   const uuidGenerator = jest
   .fn(() => 'generate')
   .mockImplementationOnce(() => '123')
   .mockImplementationOnce(() => '456');

   const repository = container
   .createChildContainer()
   .register<UuidGenerator>("UuidGenerator", { useValue: { generate: uuidGenerator } })
   .resolve(ProductLocalRepository);

   beforeEach(() => {
      uuidGenerator.mockClear();
   });

   test('create product', async () => {
      // UuidGenerator.mock
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