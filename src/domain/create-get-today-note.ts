import { httpGet } from '../infrastructure/getHttp.ts'

export interface CreateGetTodayNoteDependencies {
  getTodayNoteFromExternalProvider: typeof httpGet
}

type CreateGetTodayNoteResponse = Promise<
  number | 'Equals 0' | 'Under 0' | 'Up to 5' | null
>

type CreateGetTodayParams = { date: Date }
export const createGetTodayNote =
  ({
    getTodayNoteFromExternalProvider,
  }: CreateGetTodayNoteDependencies): (({
    date,
  }: CreateGetTodayParams) => CreateGetTodayNoteResponse) =>
  async ({ date }) => {
    const url = `http://ma-note.fr/api/${date}`
    const note = await getTodayNoteFromExternalProvider({ url })

    if (note === null) {
      return note
    }

    if (note === 0) {
      return 'Equals 0'
    }

    if (note < 0) {
      return 'Under 0'
    }

    if (note > 5) {
      return 'Up to 5'
    }

    return note
  }

export const getTodayNote = createGetTodayNote({
  getTodayNoteFromExternalProvider: httpGet,
})
