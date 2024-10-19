import { Knex } from 'knex';
import * as dotenv from 'dotenv';

dotenv.config();

const config: { [key: string]: Knex.Config } = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: './dev.sqlite', // Banco de dados SQLite no ambiente de desenvolvimento
    },
    useNullAsDefault: true, // Necessário para SQLite
  },

  production: {
    client: 'mysql2', // Use 'mysql' ou 'mysql2' para MySQL
    connection: {
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || 'password',
      database: process.env.DB_NAME || 'my_database',
    },
    pool: {
      min: 2,
      max: 10,
    },
  },
};

export default config;