import knex from '../database/connection';
import { messages } from '../utils/messages.utills';
import Knex from 'knex';

abstract class DatabaseConnection<T, U = {}> {
  connection: Knex = knex;
  constructor(private tableName: string) {}

  async index(filters?: U): Promise<U[]> {
    try {
      const list = await this.connection(this.tableName).select('*');
      return Promise.resolve(list);
    } catch (error) {
      return Promise.reject(messages.dataBaseError);
    }
  }

  async show(id: number): Promise<T> {
    try {
      const item: T = await this.connection(this.tableName)
        .select('*')
        .where('id', id)
        .first();
      return Promise.resolve(item);
    } catch (error) {
      return Promise.reject(messages.dataBaseError);
    }
  }

  async create(data: T, items: string): Promise<string | T> {
    try {
      const id = await this.connection(this.tableName).insert(data);
      return { id, ...data };
    } catch (error) {
      return Promise.reject(messages.dataBaseError);
    }
  }
}

export default DatabaseConnection;
