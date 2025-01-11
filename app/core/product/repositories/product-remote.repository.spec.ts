import { describe, test, expect, beforeAll } from '@jest/globals';
import { container } from '../product.dependencies';
import { ProductRemoteRepository } from './product-remote.repository';

describe('ProductRemoteRepository', () => {
  beforeAll(() => {
    const repository = container
       .createChildContainer()
       .resolve(ProductRemoteRepository);
       console.log(repository);
       repository.create({ name: 'test', price: 100 });
  });

   test('should be implemented', () => {
      expect(true).toBe(true);
   });
});