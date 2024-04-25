export type CreateHttpClientDependencies = { httpFetch: typeof fetch }

type CreateHttpClientParams = {
  url: string
  options?: RequestInit
}

type CreateHttpClientResponse = Promise<Response>

export const createHttpClient = ({
  httpFetch,
}: CreateHttpClientDependencies): (({
  url,
  options,
}: CreateHttpClientParams) => CreateHttpClientResponse) => {
  return async ({ url, options }) => await httpFetch(url, options)
}

export const httpClient = createHttpClient({ httpFetch: fetch })
