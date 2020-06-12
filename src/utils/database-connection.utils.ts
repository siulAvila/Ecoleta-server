import knex from '../database/connection';
import { messages } from '../utils/messages.utills';
import Knex from 'knex';

abstract class DatabaseConnection {
  connection: Knex = knex;
  constructor(private tableName: string) {}

  async index<T>(filters?: T) {
    try {
      const list = await this.connection(this.tableName).select('*');
      return Promise.resolve(list);
    } catch (error) {
      return Promise.reject(messages.dataBaseError);
    }
  }

  async show(id: number) {
    try {
      const item = await this.connection(this.tableName)
        .select('*')
        .where('id', id)
        .first();
      return Promise.resolve(item);
    } catch (error) {
      return Promise.reject(messages.dataBaseError);
    }
  }

  async create<T, U>(data: T, obj?: U[]) {
    try {
      const ids = await this.connection(this.tableName).insert(data);
      return ids;
    } catch (error) {
      return Promise.reject(messages.dataBaseError);
    }
  }
}

export default DatabaseConnection;
