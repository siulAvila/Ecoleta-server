import DatabaseConnection from '../../utils/database-connection.utils';
import { PointItems } from '../../models';

class PointItemsDao extends DatabaseConnection<PointItems> {
  constructor() {
    super('point_items');
  }
}

export default new PointItemsDao();
