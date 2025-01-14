import { Request, Response } from 'express';
import UserModel from '../../infra/database/models/UserModel';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export async function register(req: Request, res: Response) {
  try {
    const { name, email, password } = req.body;

    // testa email duplicado
    const userExists = await UserModel.findOne({ where: { email } });
    if (userExists) {
      return res.status(400).json({ error: 'E-mail já cadastrado.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // cria o usuário
    const user = await UserModel.create({
      name,
      email,
      password: hashedPassword
    });

    return res.status(201).json({ message: 'Usuário cadastrado!', user });
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
}

export async function login(req: Request, res: Response) {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ error: 'Credenciais inválidas' });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ error: 'Credenciais inválidas' });
    }

    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET || 'secret',
      { expiresIn: process.env.JWT_EXPIRES || '1d' }
    );

    return res.json({ message: 'Login bem-sucedido', token });
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
}
