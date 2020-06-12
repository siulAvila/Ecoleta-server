import { Router } from 'express';
import PointsController from './points.controller';
import { celebrate } from 'celebrate';

import multer from 'multer';
import { multerConfig, celebrationConfig } from '../../config';

import { PointValidation } from '../../validations/point.validation';

const routes = Router();

const upload = multer(multerConfig);

const pointsController = new PointsController();
routes.get('/', pointsController.index.bind(pointsController));
routes.get('/:id', pointsController.show.bind(pointsController));
routes.post(
  '/',
  upload.single('image'),
  celebrate(PointValidation, celebrationConfig),
  pointsController.create.bind(pointsController)
);

export default routes;
