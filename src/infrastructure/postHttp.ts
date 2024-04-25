import { httpClient } from './http.ts'

export type CreatePostHttpDependencies = {
  httpClient: typeof httpClient
}

type CreateHttpPostParams = {
  url: string
  data: Record<string, unknown>
}

type CreateHttpPostResponse = Promise<number | null>

export const createHttpPost = ({
  httpClient,
}: CreatePostHttpDependencies): (({
  url,
}: CreateHttpPostParams) => CreateHttpPostResponse) => {
  return async ({ url, data }) => {
    const options = {
      method: 'POST',
      body: JSON.stringify(data),
    }
    const response = await httpClient({ url, options })

    return response.json()
  }
}

export const httpPost = createHttpPost({ httpClient })
