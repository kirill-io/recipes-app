import { NODE_ENV_VALUES } from './app.config.constants'

export type NodeEnv = (typeof NODE_ENV_VALUES)[number]

export type AppConfig = {
  nodeEnv: NodeEnv
  port: number
  apiPrefix: string
}
