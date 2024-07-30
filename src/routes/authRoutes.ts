import express from 'express';
import { register, login } from '../controllers/authController';
import { createValidator } from 'express-joi-validation';
import Joi from 'joi';

const router = express.Router();
const validator = createValidator();

const userSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required().min(6),
});

router.post('/register', validator.body(userSchema), register);
router.post('/login', validator.body(userSchema), login);

export default router;
