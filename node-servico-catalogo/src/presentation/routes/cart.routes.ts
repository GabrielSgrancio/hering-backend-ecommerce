import { Router } from 'express';
import { authMiddleware } from '../../infra/auth/authMiddleware';
import {
  addToCart,
  getCart,
  removeFromCart,
  checkout
} from '../controllers/cartController';

const router = Router();

router.post('/', authMiddleware, addToCart);
router.get('/', authMiddleware, getCart);
router.delete('/', authMiddleware, removeFromCart);

router.post('/checkout', authMiddleware, checkout);

export default router;
