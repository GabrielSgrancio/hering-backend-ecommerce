import { Router } from 'express';
import { createPromotion, listPromotions, deletePromotion } from '../controllers/promotionController';
import { authMiddleware } from '../../infra/auth/authMiddleware';

const router = Router();


router.post('/', authMiddleware, createPromotion);
router.get('/', listPromotions);
router.delete('/:id', authMiddleware, deletePromotion);



export default router;
