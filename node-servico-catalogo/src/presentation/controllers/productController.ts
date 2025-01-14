import { Request, Response } from 'express';
import ProductModel from '../../infra/database/models/ProductModel';

export async function createProduct(req: Request, res: Response) {
  try {
    const { name, price, stock } = req.body;
    const product = await ProductModel.create({ name, price, stock });
    return res.status(201).json(product);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
}

export async function getProducts(_req: Request, res: Response) {
  try {
    const products = await ProductModel.findAll();
    return res.json(products);
  } catch (error: any) {
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
