import { Request, Response } from 'express';
import ProductModel from '../../infra/database/models/ProductModel';
import PromotionModel from '../../infra/database/models/PromotionModel';
import { Op } from 'sequelize';

export async function createProduct(req: Request, res: Response) {
  try {
    const { name, price, stock } = req.body;
    const product = await ProductModel.create({ name, price, stock });
    return res.status(201).json(product);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
}

export async function getProducts(req: Request, res: Response) {
  try {
    // Existe promoção ativa?
    const today = new Date();
    const activePromotion = await PromotionModel.findOne({
      where: {
        start_date: { [Op.lte]: today },
        end_date: { [Op.gte]: today }
      },
      order: [['id', 'DESC']]
    });

    const products = await ProductModel.findAll();

    // Se houver promoção ativa, calcula promoPrice
    const discount = activePromotion ? Number(activePromotion.discount_percent) : 0;

    const result = products.map((p) => {
      const productData = p.toJSON() as any;
      if (discount > 0) {
        const promoPrice = productData.price * (1 - discount / 100);
        productData.promoPrice = Number(promoPrice.toFixed(2));
      }
      return productData;
    });

    return res.json(result);
  } catch (error: any) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
}

export async function getProductById(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const product = await ProductModel.findByPk(id);
    if (!product) {
      return res.status(404).json({ error: 'Produto não encontrado' });
    }
    return res.json(product);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
}

export async function updateProduct(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const { name, price, stock } = req.body;
    const [updated] = await ProductModel.update({ name, price, stock }, { where: { id } });
    if (!updated) {
      return res.status(404).json({ error: 'Produto não encontrado' });
    }
    return res.json({ message: 'Produto atualizado com sucesso' });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
}

export async function deleteProduct(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const deleted = await ProductModel.destroy({ where: { id } });
    if (!deleted) {
      return res.status(404).json({ error: 'Produto não encontrado' });
    }
    return res.json({ message: 'Produto excluído com sucesso' });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
}
