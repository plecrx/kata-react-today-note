import {vitest} from "vitest";
import {createPostNote, CreatePostNoteDependencies} from "../../src/domain/create-post-note";
import {Mocks} from "../test.utils";

describe('Post Note', () => {
	let mocks: Mocks<CreatePostNoteDependencies>
	let postNote: ReturnType<typeof createPostNote>

	beforeEach(() => {
		mocks = {
			postNoteToExternalProvider: vitest.fn()
		}
		postNote = createPostNote(mocks)
	})

	it('should post note if note is between 1 and 5', async () => {
		mocks.postNoteToExternalProvider.mockResolvedValue(1)

		const expectedOutput = await postNote(1)

		expect(expectedOutput).toEqual(1)
	});

	it('should return an error if note is up to 5', async () => {
		const expectedOutput = await postNote(6)

		expect(expectedOutput).toBe('Up to 5')
	});

	it('should return error message if today note equals 0', async () => {
		const expectedOutput = await postNote(0)

		expect(expectedOutput).toBe('Equals 0')
	});

	it('should return error message if today is under 0', async () => {
		const expectedOutput = await postNote(-1)

		expect(expectedOutput).toBe('Under 0')
	});

	it('should call httpPost with right url', async () => {
		await postNote(1)

		expect(mocks.postNoteToExternalProvider).toHaveBeenCalledWith({ data: { note: 1 }, url: 'http://ma-note.fr/api/' })
	});
});