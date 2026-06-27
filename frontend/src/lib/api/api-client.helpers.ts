import { apiConfig } from '@/config/api'
import type { ApiClientParams } from './api.types'

export const createHeaders = (headers?: HeadersInit) => {
  const requestHeaders = new Headers(headers)

  if (!requestHeaders.has('Accept')) {
    requestHeaders.set('Accept', 'application/json')
  }

  return requestHeaders
}

export const createApiUrl = (path: string, params?: ApiClientParams) => {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`

  const url = new URL(`${apiConfig.baseUrl}${normalizedPath}`)

  Object.entries(params ?? {}).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      url.searchParams.set(key, String(value))
    }
  })

  return url.toString()
}

export const parseResponseBodySafely = async (response: Response): Promise<unknown> => {
  if (response.status === 204) {
    return null
  }

  const contentType = response.headers.get('content-type')

  try {
    if (contentType?.includes('application/json')) {
      return await response.json()
    }

    const text = await response.text()

    return text || null
  } catch {
    return null
  }
}
