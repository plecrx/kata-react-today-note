import { vitest} from "vitest";
import {createGetTodayNote, CreateGetTodayNoteDependencies} from "../../src/domain/create-get-today-note";
import {Mocks} from "../test.utils";
describe('Get Today Note', () => {
	let mocks: Mocks<CreateGetTodayNoteDependencies>
	let getTodayNote: ReturnType<typeof createGetTodayNote>

	beforeEach(() => {
		mocks = {
			getTodayNoteFromExternalProvider: vitest.fn()
		}
		getTodayNote = createGetTodayNote(mocks)
	})

	it('should return note if today note is between 1 and 5', async () => {
		// Arrange
		mocks.getTodayNoteFromExternalProvider.mockResolvedValue(1)
		const inputDate = new Date(2024, 1, 1)

		// Act
		const expectedOutput = await getTodayNote({ date: inputDate })

		// Assert
		expect(expectedOutput).toBe(1)
	})

	it('should return null if today note does not exist', async () => {
		mocks.getTodayNoteFromExternalProvider.mockResolvedValue(null)
		const inputDate = new Date(2024, 1, 1)

		const expectedOutput = await getTodayNote({ date: inputDate })

		expect(expectedOutput).toBe(null)
	});

	it('should return error message if today note is up to 5', async () => {
		mocks.getTodayNoteFromExternalProvider.mockResolvedValue(6)
		const inputDate = new Date(2024, 1, 1)

		const expectedOutput = await getTodayNote({ date: inputDate })

		expect(expectedOutput).toBe('Up to 5')
	});

	it('should return error message if today note equals 0', async () => {
		mocks.getTodayNoteFromExternalProvider.mockResolvedValue(0)
		const inputDate = new Date(2024, 1, 1)

		const expectedOutput = await getTodayNote({ date: inputDate })

		expect(expectedOutput).toBe('Equals 0')
	});

	it('should return error message if today is under 0', async () => {
		mocks.getTodayNoteFromExternalProvider.mockResolvedValue(-1)
		const inputDate = new Date(2024, 1, 1)

		const expectedOutput = await getTodayNote({ date: inputDate })

		expect(expectedOutput).toBe('Under 0')
	});

	it('should call httpGet with correct url', async () => {
		const inputDate = new Date(2024, 1, 1)

		await getTodayNote({ date: inputDate })

		expect(mocks.getTodayNoteFromExternalProvider).toHaveBeenCalledWith({url: `http://ma-note.fr/api/${inputDate}`})
	});

});