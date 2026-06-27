export type ApiClientParamValue = string | number | boolean | null | undefined

export type ApiClientParams = Record<string, ApiClientParamValue>

export type ApiClientOptions = RequestInit & {
  params?: ApiClientParams
}

export type ApiErrorPayload = {
  statusCode?: number
  message?: string | string[]
  error?: string
  [key: string]: unknown
}

export type ApiErrorParams = {
  status: number
  message: string
  payload?: unknown
}
