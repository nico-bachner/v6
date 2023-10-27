export type Artist = {
  name: string
  country?: string
}

export type Track = {
  title: string
  artists: string[]
  year: number
  lyrics: boolean
}
