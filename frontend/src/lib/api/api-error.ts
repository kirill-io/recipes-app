import type { ApiErrorParams } from './api.types'

const isRecord = (value: unknown): value is Record<string, unknown> => {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

export const getPayloadMessage = (payload: unknown): string | null => {
  if (typeof payload === 'string') {
    return payload || null
  }

  if (!isRecord(payload)) {
    return null
  }

  if (!('message' in payload)) {
    return null
  }

  const { message } = payload

  if (Array.isArray(message)) {
    const messages = message.filter((item): item is string => typeof item === 'string')

    return messages.length > 0 ? messages.join(', ') : null
  }

  if (typeof message === 'string') {
    return message
  }

  return null
}

export class ApiError extends Error {
  readonly status: number
  readonly payload: unknown

  constructor({ status, message, payload = null }: ApiErrorParams) {
    super(message)

    this.name = 'ApiError'
    this.status = status
    this.payload = payload

    Object.setPrototypeOf(this, ApiError.prototype)
  }
}

export const isApiError = (error: unknown): error is ApiError => {
  return error instanceof ApiError
}

export const getApiErrorMessage = (
  error: unknown,
  fallback = 'Произошла ошибка при выполнении запроса',
): string => {
  if (isApiError(error)) {
    return getPayloadMessage(error.payload) ?? error.message ?? fallback
  }

  if (error instanceof Error) {
    return error.message
  }

  return fallback
}
