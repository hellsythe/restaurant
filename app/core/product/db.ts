import Dexie, { type EntityTable } from 'dexie';
import { Product } from './product.model';

const db = new Dexie('Database') as Dexie & {
  products: EntityTable<
    Product,
    'id'
  >;
};

db.version(1).stores({
  products: 'id, name, price'
});

export { db };