import {vitest} from "vitest";
import {createHttpPost, CreatePostHttpDependencies} from "../../src/infrastructure/postHttp";
import {Mocks} from "../test.utils";
describe('POST Http', () => {
	let mocks: Mocks<CreatePostHttpDependencies>
	let httpPost: ReturnType<typeof createHttpPost>

	beforeEach(() => {
		mocks = {
			httpClient: vitest.fn()
		}
		httpPost = createHttpPost(mocks)
	})

	it('should return data if request succeeds', async () => {
		mocks.httpClient.mockResolvedValue(new Response('1'))

		const expectedOutput = await httpPost({url: 'http://localhost:1234', data: {note: 1}})

		expect(expectedOutput).toEqual(1)
	});
});