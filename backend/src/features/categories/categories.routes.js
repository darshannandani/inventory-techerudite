import express from 'express';
import * as categoriesController from './categories.controller.js';

const router = express.Router();

router.get('/', categoriesController.getCategories);

export const categoryRoutes = router;
