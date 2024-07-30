import express from 'express';
import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
} from '../controllers/productController';
import { createValidator } from 'express-joi-validation';
import Joi from 'joi';
import authMiddleware from '../middlewares/auth';

const router = express.Router();
const validator = createValidator();

const productSchema = Joi.object({
  productname: Joi.string().required(),
  barcode: Joi.string().required(),
  description: Joi.string().allow(null, ''),
  expiry_date: Joi.date().allow(null),
  purchase_date: Joi.date().required(),
  vatable: Joi.boolean().default(true),
  category: Joi.string().required(),
  price: Joi.number().precision(2).positive().required(),
});

router.get('/', authMiddleware, getAllProducts);
router.get('/:id', authMiddleware, getProductById);
router.post('/', authMiddleware, validator.body(productSchema), createProduct);
router.put('/:id', authMiddleware, validator.body(productSchema), updateProduct);
router.delete('/:id', authMiddleware, deleteProduct);

export default router;
