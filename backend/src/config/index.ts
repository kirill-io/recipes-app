import { appConfig } from './app'
import { databaseConfig } from './database'

export const configLoaders = [appConfig, databaseConfig]

export type { AppConfig, NodeEnv } from './app'
export { appConfig, getAppConfig } from './app'
export type { DatabaseConfig } from './database'
export { databaseConfig, getTypeOrmConfig } from './database'
export { setupSwagger } from './swagger'
