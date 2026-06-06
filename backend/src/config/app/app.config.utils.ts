import {
  DEFAULT_NODE_ENV,
  DEFAULT_PORT,
  NODE_ENV_VALUES,
} from './app.config.constants'
import type { NodeEnv } from './app.config.types'

export const isNodeEnv = (value: string | undefined): value is NodeEnv => {
  if (!value) {
    return false
  }

  return NODE_ENV_VALUES.some((nodeEnv) => nodeEnv === value)
}

export const parseNodeEnv = (value: string | undefined): NodeEnv => {
  return isNodeEnv(value) ? value : DEFAULT_NODE_ENV
}

export const parsePort = (value: string | undefined): number => {
  const port = Number(value)

  return Number.isInteger(port) && port > 0 ? port : DEFAULT_PORT
}
