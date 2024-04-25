import { httpPost } from '../infrastructure/postHttp.ts'

export type CreatePostNoteDependencies = {
  postNoteToExternalProvider: typeof httpPost
}

export const createPostNote =
  ({ postNoteToExternalProvider }: CreatePostNoteDependencies) =>
  async (note: number) => {
    const url = 'http://ma-note.fr/api/'

    if (note > 5) {
      return 'Up to 5'
    }
    if (note === 0) {
      return 'Equals 0'
    }
    if (note < 0) {
      return 'Under 0'
    }

    return postNoteToExternalProvider({ data: { note }, url })
  }

export const postNote = createPostNote({
  postNoteToExternalProvider: httpPost,
})
