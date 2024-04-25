import {vitest} from "vitest";
import {createHttpClient, CreateHttpClientDependencies} from "../../src/infrastructure/http";
import {Mocks} from "../test.utils";

describe('Http Client', () => {
	let mocks: Mocks<CreateHttpClientDependencies>
	let httpClient: ReturnType<typeof createHttpClient>

	beforeEach(() => {
		mocks = { httpFetch: vitest.fn()}
		httpClient = createHttpClient(mocks)
	})

	afterEach(() => {
		vitest.clearAllMocks()
	})

	it('should send GET request', async () => {
		await httpClient({ url: 'fake-url' })

		expect(mocks.httpFetch).toHaveBeenCalledWith('fake-url', undefined)
	});

	it('should send POST request with body', async () => {
		const input = {
			method: 'POST',
			body: JSON.stringify({ note: 1 })
		}

		await httpClient({ url: 'fake-url', options: input })

		expect(mocks.httpFetch).toHaveBeenCalledWith('fake-url', { method: 'POST', body: JSON.stringify({note: 1})})
	});
})