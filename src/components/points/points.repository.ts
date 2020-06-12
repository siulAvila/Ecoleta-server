import DatabaseConnection from '../../utils/database-connection.utils';
import { Point, PointItems, PointFilters } from '../../models';
import { messages } from '../../utils/messages.utills';

class PointsRepository extends DatabaseConnection {
  constructor() {
    super('points');
  }

  async index<PointFilters>(filters: PointFilters) {
    try {
      const points = await this.connection('points')
        .join('point_items', 'points.id', '=', 'point_items.point_id')
        .whereIn('point_items.item_id', filters.items || [])
        .where('city', filters.city || null)
        .where('uf', filters.UF || null)
        .distinct()
        .select('points.*');

      return Promise.resolve(points);
    } catch (error) {
      return Promise.reject(messages.dataBaseError);
    }
  }

  async show(id: number) {
    const trx = await this.connection.transaction();

    try {
      const items = await trx('items')
        .join('point_items', 'items.id', '=', 'point_items.item_id')
        .where('point_items.point_id', id);
      const point = await trx('points').select('*').where('id', id).first();
      await trx.commit();
      return Promise.resolve({ ...point, items });
    } catch (error) {
      return Promise.reject(messages.dataBaseError);
    }
  }

  async create<Point, Number>(point: Point, items: string) {
    const trx = await this.connection.transaction();

    try {
      const insertId = await trx('points').insert(point);
      const point_id = insertId[0];

      const arrItems = items
        .split(',')
        .map((item: string) => Number(item.trim()))
        .map((item_id: number) => {
          return {
            item_id,
            point_id,
          };
        });
      await trx('point_items').insert(arrItems);
      await trx.commit();
      return Promise.resolve({ ...point, point_id });
    } catch (error) {
      await trx.rollback();
      return Promise.reject(messages.dataBaseError);
    }
  }
}

export default new PointsRepository();
