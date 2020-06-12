import { Router } from 'express';
import itemsController from './items.controller';

const routes = Router();

routes.get('/', itemsController.index.bind(itemsController));

export default routes;
