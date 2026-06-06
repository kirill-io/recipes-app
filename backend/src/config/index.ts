import { appConfig } from './app'

export const configLoaders = [appConfig]

export { getAppConfig } from './app'

export type { AppConfig, NodeEnv } from './app'
