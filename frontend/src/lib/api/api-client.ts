import { createApiUrl, createHeaders, parseResponseBodySafely } from './api-client.helpers'
import { ApiError, getPayloadMessage } from './api-error'
import type { ApiClientOptions } from './api.types'

export const apiClient = async <T>(path: string, options: ApiClientOptions = {}): Promise<T> => {
  const { params, headers, ...fetchOptions } = options

  const response = await fetch(createApiUrl(path, params), {
    ...fetchOptions,
    headers: createHeaders(headers),
  })

  if (!response.ok) {
    const payload = await parseResponseBodySafely(response)

    const message =
      getPayloadMessage(payload) ?? `API request failed with status ${response.status}`

    throw new ApiError({
      status: response.status,
      message,
      payload,
    })
  }

  if (response.status === 204) {
    return undefined as T
  }

  return response.json() as Promise<T>
}
