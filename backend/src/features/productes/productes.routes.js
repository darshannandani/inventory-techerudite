import express from 'express';
import * as productsController from './productes.controller.js';

const router = express.Router();

router.get('/', productsController.getAllProductsController);
router.post('/', productsController.createProductController);
router.delete('/:id', productsController.deleteProductController);
router.put('/:id', productsController.updateProductController);

export const productRoutes = router;
