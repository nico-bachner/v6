import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

import { tracks } from './data'

export const GET = async ({ nextUrl }: NextRequest) => {
  const lyrics = nextUrl.searchParams.get('lyrics')

  if (lyrics && !(lyrics == 'true' || lyrics == 'false')) {
    return NextResponse.json(
      { error: "'lyrics' must be a boolean" },
      { status: 400 },
    )
  }

  return new NextResponse(
    JSON.stringify(
      tracks
        .filter(({ lyrics }) => {
          if (nextUrl.searchParams.get('lyrics') == 'true') {
            return lyrics == true
          }

          if (nextUrl.searchParams.get('lyrics') == 'false') {
            return lyrics == false
          }

          return true
        })
        .filter(({ artists }) => {
          const artist = nextUrl.searchParams.get('artist')

          if (artist) {
            return artists.includes(artist)
          }

          return true
        }),
      null,
      2,
    ),
  )
}
