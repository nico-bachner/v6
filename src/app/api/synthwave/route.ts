import { NextResponse } from 'next/server'

import { artists } from './artists/data'
import { tracks } from './tracks/data'

export const GET = async () => {
  return new NextResponse(
    JSON.stringify(
      {
        artists: {
          count: artists.length,
          url: 'https://nicobachner.com/api/synthwave/artists',
        },
        tracks: {
          count: tracks.length,
          url: 'https://nicobachner.com/api/synthwave/tracks',
        },
      },
      null,
      2,
    ),
  )
}
