import SQLite from 'react-native-sqlite-storage';
import {User} from '../types/user';

SQLite.enablePromise(true);

const DB_NAME = 'profile.db';
const TABLE_NAME = 'user_profile';

const openDb = async () => {
  return SQLite.openDatabase({name: DB_NAME, location: 'default'});
};

const ensureTable = async () => {
  const db = await openDb();
  await db.executeSql(
    `CREATE TABLE IF NOT EXISTS ${TABLE_NAME} (
      id INTEGER PRIMARY KEY NOT NULL,
      email TEXT,
      username TEXT,
      firstName TEXT,
      lastName TEXT,
      age INTEGER,
      role TEXT,
      createdAt TEXT,
      updatedAt TEXT
    )`,
  );
  return db;
};

const mapRowToUser = (row: any): User => ({
  id: Number(row.id),
  email: row.email ?? '',
  username: row.username ?? '',
  firstName: row.firstName ?? '',
  lastName: row.lastName ?? '',
  age: Number(row.age) || 0,
  role: row.role ?? '',
  createdAt: row.createdAt ?? '',
  updatedAt: row.updatedAt ?? '',
});

export const profileLocalDb = {
  async upsertProfile(profile: User) {
    const db = await ensureTable();
    await db.executeSql(
      `INSERT OR REPLACE INTO ${TABLE_NAME} (id, email, username, firstName, lastName, age, role, createdAt, updatedAt)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        profile.id,
        profile.email,
        profile.username,
        profile.firstName,
        profile.lastName,
        profile.age,
        profile.role,
        profile.createdAt,
        profile.updatedAt,
      ],
    );
  },

  async getProfile(): Promise<User | null> {
    const db = await ensureTable();
    const [result] = await db.executeSql(
      `SELECT id, email, username, firstName, lastName, age, role, createdAt, updatedAt FROM ${TABLE_NAME} LIMIT 1`,
    );

    if (result.rows.length === 0) {
      return null;
    }

    return mapRowToUser(result.rows.item(0));
  },

  async clear() {
    const db = await ensureTable();
    await db.executeSql(`DELETE FROM ${TABLE_NAME}`);
  },
};
