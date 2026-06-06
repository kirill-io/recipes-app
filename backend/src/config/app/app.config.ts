import { DEFAULT_API_PREFIX } from './app.config.constants'
import type { AppConfig } from './app.config.types'
import { parseNodeEnv, parsePort } from './app.config.utils'

export const getAppConfig = (): AppConfig => ({
  nodeEnv: parseNodeEnv(process.env.NODE_ENV),
  port: parsePort(process.env.PORT),
  apiPrefix: process.env.API_PREFIX || DEFAULT_API_PREFIX,
})

const appConfig = () => ({
  app: getAppConfig(),
})

export default appConfig
