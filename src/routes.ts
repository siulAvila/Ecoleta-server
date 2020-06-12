import { Router } from 'express';

const routes = Router();

import itemsRoutes from './components/items/items.routes';
import pointsRoutes from './components/points/points.routes';

routes.get('/', (request, response) => {
  return response.json({ message: 'Hello World' });
});

routes.use('/items', itemsRoutes);

routes.use('/points', pointsRoutes);

export default routes;
