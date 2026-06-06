import { registerAs } from '@nestjs/config'
import {
  DATABASE_CONFIG_KEY,
  DEFAULT_DATABASE_PORT,
} from './database.config.constant'
import { DatabaseConfig } from './database.config.type'
import { getNumberEnv, getRequiredEnv } from './database.config.utils'

export const databaseConfig = registerAs(
  DATABASE_CONFIG_KEY,
  (): DatabaseConfig => ({
    host: getRequiredEnv('DB_HOST'),
    port: getNumberEnv('DB_PORT', DEFAULT_DATABASE_PORT),
    username: getRequiredEnv('DB_USERNAME'),
    password: getRequiredEnv('DB_PASSWORD'),
    name: getRequiredEnv('DB_NAME'),
  }),
)
