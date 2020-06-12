import { Request, Response } from 'express';

import pointsRepository from './points.repository';
import { PointFilters } from '../../models';

import { serialized } from '../../utils/functions';

class PointsController {
  async index(request: Request, response: Response) {
    const { items, city, UF } = request.query;
    const parsedItems = String(items)
      .split(',')
      .map((item) => {
        return Number(item.trim());
      });
    const pointFilters: PointFilters = {
      city: String(city),
      UF: String(UF),
      items: parsedItems,
    };
    const points = await pointsRepository.index(pointFilters);

    const serializadeItems = serialized(points, 'image');

    return response.json(serializadeItems);
  }

  async show(request: Request, response: Response) {
    const { id } = request.params;
    const point = await pointsRepository.show(Number(id));
    const serializadePoint = serialized([point], 'image');

    return response.json(serializadePoint[0]);
  }

  async create(request: Request, response: Response) {
    try {
      const { items, ...point } = request.body;
      point.image = request.file.filename;
      const createdPoint = await pointsRepository.create(point, items);

      return response.json(createdPoint);
    } catch (error) {
      return response.status(500).json(error);
    }
  }
}

export default PointsController;
