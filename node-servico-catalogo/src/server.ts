import dotenv from 'dotenv';
dotenv.config(); 

import app from './app';    
import sequelize from './infra/database'; 


(async () => {
  try {
    await sequelize.authenticate();
    console.log('DB conectado.');

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Servidor rodando em http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Erro ao conectar DB:', error);
  }
})();
