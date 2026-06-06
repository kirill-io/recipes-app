import type { AppConfig } from './app.config.types'
import { parseNodeEnv, parsePort } from './app.config.utils'

export const getAppConfig = (): AppConfig => ({
  nodeEnv: parseNodeEnv(process.env.NODE_ENV),
  port: parsePort(process.env.PORT),
})

const appConfig = () => ({
  app: getAppConfig(),
})

export default appConfig
