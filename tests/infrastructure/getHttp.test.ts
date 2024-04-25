import {vitest} from "vitest";
import {createHttpGet, CreateHttpGetDependencies} from "../../src/infrastructure/getHttp";
import {Mocks} from "../test.utils";

describe('GET Http', () => {
	let mocks: Mocks<CreateHttpGetDependencies>
	let httpGet: ReturnType<typeof createHttpGet>

	beforeEach(() => {
		mocks = {
			httpClient: vitest.fn()
		}
		httpGet = createHttpGet(mocks)
	})

	it('should return data if request succeeds', async () => {
		mocks.httpClient.mockResolvedValue(new Response('1'))

		const expectedOutput = await httpGet({ url: 'http://localhost:1234' })

		expect(expectedOutput).toEqual(1)
	});
});