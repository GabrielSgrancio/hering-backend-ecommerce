import { Request, Response } from 'express';
import PromotionModel from '../../infra/database/models/PromotionModel';

export async function createPromotion(req: Request, res: Response) {
  try {
    const { name, discount_percent, start_date, end_date } = req.body;

    if (!name || !discount_percent || !start_date || !end_date) {
      return res.status(400).json({ error: 'Faltam campos obrigatórios' });
    }

    const promotion = await PromotionModel.create({
      name,
      discount_percent,
      start_date,
      end_date
    });

    return res.status(201).json(promotion);
  } catch (error: any) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
}

export async function listPromotions(req: Request, res: Response) {
  try {
    const promotions = await PromotionModel.findAll();
    return res.json(promotions);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
}

export async function deletePromotion(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const deleted = await PromotionModel.destroy({ where: { id } });
  
      if (!deleted) {
        return res.status(404).json({ error: 'Promoção não encontrada' });
      }
  
      return res.json({ message: 'Promoção excluída com sucesso' });
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }