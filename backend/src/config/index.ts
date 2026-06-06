import { appConfig } from './app'

export const configLoaders = [appConfig]

export type { AppConfig, NodeEnv } from './app'
export { getAppConfig } from './app'
