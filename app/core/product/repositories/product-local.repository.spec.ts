
import { describe, test, expect, jest, beforeEach } from '@jest/globals';
import { container } from '../product.dependencies';
import { ProductLocalRepository } from './product-local.repository';
import { UuidGenerator } from '@/app/core/global/services/uuid-generator';

describe('ProductLocalRepository', () => {
   const uuidGenerator = jest
   .fn(() => 'generate')
   .mockImplementationOnce(() => '123')
   .mockImplementationOnce(() => '456')
   .mockImplementationOnce(() => '789')
   .mockImplementationOnce(() => '999');

   const repository = container
   .createChildContainer()
   .register<UuidGenerator>("UuidGenerator", { useValue: { generate: uuidGenerator } })
   .resolve(ProductLocalRepository);

   beforeEach(() => {
      uuidGenerator.mockClear();
   });

   test('create product', async () => {
      const id = await repository.create({ name: 'test create', price: 100 });
      expect(id).toBe('123');
   });

   test('update product', async () => {
      await repository.create({ name: 'test update', price: 100 });
      uuidGenerator.mockClear();
      await repository.update('123', { name: 'anime', price: 100 });
      const product = await repository.findById('123');
      expect(uuidGenerator).toBeCalledTimes(0);
      expect(product.name).toBe('anime');
   });

   test('update missing product', async () => {
      await expect(async() => {
         await repository.update('xxxx', { name: 'anime', price: 100 });
      }).rejects.toThrow('Model with id xxxx not found');
   });

   test('find product by id', async () => {
      await repository.create({ name: 'test find', price: 100 });
      const product = await repository.findById('123');
      expect(product.id).toBe('123');
   });

   test('find product by id missing', async () => {
      await expect(async() => {
         await repository.findById('xxxx');
      }).rejects.toThrow('Model with id xxxx not found');
   });

   test('find product by query', async () => {
      await repository.create({ name: 'test find query', price: 100 });
      const products = await repository.find({ name: 'test find query' });
      expect(products.length).toBe(1);
      expect(products[0].name).toBe('test find query');
   });

   test('find missing product by query', async () => {
      const products = await repository.find({ name: 'test find query missing' });
      expect(products.length).toBe(0);
   });


   test('delete product', async () => {
      await repository.create({ name: 'test delete', price: 100 });
      await repository.delete('123');

      await expect(async() => {
         await repository.findById('123')
      }).rejects.toThrow('Model with id 123 not found');
   });

   test('delete missing product', async () => {
      await expect(async() => {
         await repository.delete('xxxx');
      }).rejects.toThrow('Model with id xxxx not found');
   });
});