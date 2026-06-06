import { ConfigService } from '@nestjs/config'
import { TypeOrmModuleOptions } from '@nestjs/typeorm'
import { DATABASE_CONFIG_KEY } from './database.config.constant'
import { DatabaseConfig } from './database.config.type'

export const getRequiredEnv = (key: string): string => {
  const value = process.env[key]

  if (!value) {
    throw new Error(`Environment variable ${key} is required`)
  }

  return value
}

export const getNumberEnv = (key: string, defaultValue?: number): number => {
  const value = process.env[key]

  if (!value) {
    if (defaultValue !== undefined) {
      return defaultValue
    }
    throw new Error(`Environment variable ${key} is required`)
  }

  const numberValue = Number(value)

  if (Number.isNaN(numberValue)) {
    throw new Error(`Environment variable ${key} must be a number`)
  }

  return numberValue
}

export const getTypeOrmConfig = (
  configService: ConfigService,
): TypeOrmModuleOptions => {
  const databaseConfig =
    configService.getOrThrow<DatabaseConfig>(DATABASE_CONFIG_KEY)

  return {
    type: 'postgres',
    host: databaseConfig.host,
    port: databaseConfig.port,
    username: databaseConfig.username,
    password: databaseConfig.password,
    database: databaseConfig.name,
    autoLoadEntities: true,
    synchronize: false,
  }
}
