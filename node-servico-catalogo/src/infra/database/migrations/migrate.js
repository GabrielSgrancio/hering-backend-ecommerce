const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../../../.env') });
const fs = require('fs');
const { Client } = require('pg'); 

const requiredEnvVars = ['DB_HOST', 'DB_PORT', 'DB_USER', 'DB_PASS', 'DB_NAME'];
requiredEnvVars.forEach((varName) => {
  if (!process.env[varName]) {
    console.error(`Erro: A variável de ambiente ${varName} não está definida.`);
    process.exit(1);
  }
});

const client = new Client({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
});

async function runMigrations() {
  try {
    await client.connect();

    // Controle de migrations
    await client.query(`
      CREATE TABLE IF NOT EXISTS migrations (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        executed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    const migrationsDir = path.join(__dirname, 'sql_migrations');
    const files = fs.readdirSync(migrationsDir);

    const sqlFiles = files
      .filter(f => f.endsWith('.sql'))
      .sort();

    for (const file of sqlFiles) {
      const filePath = path.join(migrationsDir, file);

      // Já executou?
      const result = await client.query('SELECT * FROM migrations WHERE name = $1', [file]);
      if (result.rows.length > 0) {
        console.log(`Migration ${file} já foi executada. Pulando...`);
        continue;
      }

      console.log(`Executando migration: ${filePath} ...`);
      const sqlContent = fs.readFileSync(filePath, 'utf8');
      await client.query(sqlContent);

      // Registra que a migration já rodou
      await client.query('INSERT INTO migrations (name) VALUES ($1)', [file]);

      console.log(`Migration ${file} concluída.`);
    }

    await client.end();
    console.log('Todas as migrations foram executadas com sucesso!');
  } catch (err) {
    console.error('Erro ao rodar migrations:', err);
    process.exit(1);
  }
}

runMigrations();