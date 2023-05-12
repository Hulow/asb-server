const dotenv = require('dotenv');
dotenv.config();
const { DataSource } = require('typeorm');

const dataSource = new DataSource({
  type: 'postgres',
  host: process.env.POSTGRES_DATABASE_HOSTNAME || 'localhost',
  port: +(process.env.POSTGRES_DATABASE_PORT || 5432),
  username: process.env.POSTGRES_DATABASE_USER || 'docker',
  password: process.env.POSTGRES_DATABASE_PASSWORD || 'docker',
  database: process.env.POSTGRES_DATABASE_NAME || 'asb',
  entities: [`src/*/adapters/out/persistence/*.orm-entity.ts`],
  migrations: [`migrations/*.ts`],
  migrationsTransactionMode: 'all',
});

module.exports = { dataSource };
