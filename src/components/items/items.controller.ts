import { Request, Response } from 'express';

import { Item } from '../../models/item.model';
import itemsRepository from './items.repository';

import { serialized } from '../../utils/functions';

class ItemsController {
  async index(request: Request, response: Response) {
    try {
      const items: Array<Item> = await itemsRepository.index();
      const serializdeItems = serialized(items, 'image_url');
      return response.json(serializdeItems);
    } catch (error) {
      return response.status(500).json(error);
    }
  }
}

export default new ItemsController();
