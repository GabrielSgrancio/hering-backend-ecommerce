import { Request, Response } from 'express';
import CartItemModel from '../../infra/database/models/CartItemModel';
import ProductModel from '../../infra/database/models/ProductModel';
import axios from 'axios';

export async function addToCart(req: Request, res: Response) {
  try {
    const userId = (req as any).userId;
    const { productId, quantity } = req.body;

    // Verifica se o produto existe
    const product = await ProductModel.findByPk(productId);
    if (!product) {
      return res.status(404).json({ error: 'Produto não encontrado' });
    }

    if (product.stock < quantity) {
      return res.status(400).json({ error: 'Estoque insuficiente' });
    }

    // Verifica se o item já está no carrinho
    let cartItem = await CartItemModel.findOne({ where: { userId, productId } });
    if (cartItem) {
      cartItem.quantity += quantity;
      await cartItem.save();
    } else {
      cartItem = await CartItemModel.create({ userId, productId, quantity });
    }
    // Diminui o estoque
    product.stock -= quantity;
    await product.save();

    return res.status(201).json(cartItem);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
}

export async function getCart(req: Request, res: Response) {
  try {
    const userId = (req as any).userId;
    const cartItems = await CartItemModel.findAll({
      where: { userId },
      include: [
        {
          model: ProductModel,
          as: 'product' 
        }
      ]
    });
    return res.json(cartItems);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
}

export async function removeFromCart(req: Request, res: Response) {
  try {
    const userId = (req as any).userId;
    const { productId } = req.body;

    const cartItem = await CartItemModel.findOne({ where: { userId, productId } });
    if (!cartItem) {
      return res.status(404).json({ error: 'Item não encontrado no carrinho' });
    }
    // Incrementa o estoque
    const product = await ProductModel.findByPk(productId);
    if (product) {
      product.stock += cartItem.quantity;
      await product.save();
    }

    await cartItem.destroy();
    return res.json({ message: 'Item removido do carrinho' });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
}

export async function checkout(req: Request, res: Response) {
  try {
    const userId = (req as any).userId;
    const cartItems = await CartItemModel.findAll({
      where: { userId },
      include: [{ model: ProductModel, as: 'product' }]
    });

    if (cartItems.length === 0) {
      return res.status(400).json({ error: 'Carrinho vazio' });
    }

    // Calcula total
    const totalAmount = cartItems.reduce((acc, item) => {
      const price = item.product?.price || 0;
      return acc + price * item.quantity;
    }, 0);

    // INTEGRAÇÃO COM O SERVIÇO DE PEDIDOS 
    let orderResponse;
    const orderServiceUrl = process.env.ORDER_SERVICE_URL;

    if (orderServiceUrl) {
      const payload = {
        userId,
        totalAmount,
        items: cartItems.map(ci => ({
          productId: ci.productId,
          quantity: ci.quantity
        }))
      };
      const response = await axios.post(orderServiceUrl, payload);
      orderResponse = response.data;
    }

    // Limpa o carrinho 
    await CartItemModel.destroy({ where: { userId } });

    return res.json({
      message: 'Checkout concluído com sucesso!',
      totalAmount,
      orderResponse
    });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
}
