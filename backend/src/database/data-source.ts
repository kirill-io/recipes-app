import { config } from 'dotenv'
import { DataSource, DataSourceOptions } from 'typeorm'
import { databaseConfig } from '../config/database'

config({ path: '.env' })
config({ path: '.env.local', override: true })

const dbConfig = databaseConfig()

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: dbConfig.host,
  port: dbConfig.port,
  username: dbConfig.username,
  password: dbConfig.password,
  database: dbConfig.name,
  entities: ['src/**/*.entity.ts'],
  migrations: ['src/database/migrations/*.ts'],
  synchronize: false,
}

export default new DataSource(dataSourceOptions)
