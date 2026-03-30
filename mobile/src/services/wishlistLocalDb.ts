import SQLite from 'react-native-sqlite-storage';
import {Product} from '../types/product';

SQLite.enablePromise(true);

const DB_NAME = 'wishlist.db';
const TABLE_NAME = 'wishlist';

const openDb = async () => {
  return SQLite.openDatabase({name: DB_NAME, location: 'default'});
};

const ensureTable = async () => {
  const db = await openDb();
  await db.executeSql(
    `CREATE TABLE IF NOT EXISTS ${TABLE_NAME} (
      productId INTEGER NOT NULL,
      userId INTEGER NOT NULL,
      name TEXT,
      image TEXT,
      price REAL,
      PRIMARY KEY (userId, productId)
    )`,
  );
  return db;
};

const mapRowToProduct = (row: any): Product => ({
  id: Number(row.productId),
  name: row.name ?? '',
  description: '',
  image: row.image ?? '',
  price: Number(row.price) || 0,
  priceUnit: '',
  createdAt: '',
  updatedAt: '',
});

export const wishlistLocalDb = {
  async getWishlist(userId: number): Promise<Product[]> {
    const db = await ensureTable();
    const [result] = await db.executeSql(
      `SELECT productId, name, image, price FROM ${TABLE_NAME} WHERE userId = ?`,
      [userId],
    );

    const items: Product[] = [];
    for (let i = 0; i < result.rows.length; i += 1) {
      items.push(mapRowToProduct(result.rows.item(i)));
    }
    return items;
  },

  async isSaved(userId: number, productId: number): Promise<boolean> {
    const db = await ensureTable();
    const [result] = await db.executeSql(
      `SELECT 1 FROM ${TABLE_NAME} WHERE userId = ? AND productId = ? LIMIT 1`,
      [userId, productId],
    );
    return result.rows.length > 0;
  },

  async add(userId: number, product: Product) {
    const db = await ensureTable();
    await db.executeSql(
      `INSERT OR REPLACE INTO ${TABLE_NAME} (productId, userId, name, image, price)
       VALUES (?, ?, ?, ?, ?)`,
      [product.id, userId, product.name, product.image, product.price],
    );
  },

  async remove(userId: number, productId: number) {
    const db = await ensureTable();
    await db.executeSql(
      `DELETE FROM ${TABLE_NAME} WHERE userId = ? AND productId = ?`,
      [userId, productId],
    );
  },
};
