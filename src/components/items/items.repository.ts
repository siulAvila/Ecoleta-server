import DatabaseConnection from '../../utils/database-connection.utils';

class ItemsRepository extends DatabaseConnection {
  constructor() {
    super('items');
  }
}

export default new ItemsRepository();
