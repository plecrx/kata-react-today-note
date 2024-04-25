import { httpClient } from './http.ts'

export interface CreateHttpGetDependencies {
  httpClient: typeof httpClient
}

type CreateHttpGetParams = { url: string }

type CreateHttpGetResponse = Promise<number | null>

export const createHttpGet = ({
  httpClient,
}: CreateHttpGetDependencies): (({
  url,
}: CreateHttpGetParams) => CreateHttpGetResponse) => {
  return async ({ url }) => {
    const response = await httpClient({ url })

    return response.json()
  }
}

export const httpGet = createHttpGet({ httpClient })
