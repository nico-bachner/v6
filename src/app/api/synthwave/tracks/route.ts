import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

import { tracks } from './data'

export const GET = async (request: NextRequest) => {
  const lyrics = request.nextUrl.searchParams.get('lyrics')

  if (lyrics == 'true') {
    return new NextResponse(
      JSON.stringify(
        tracks.filter(({ lyrics }) => lyrics == true),
        null,
        2,
      ),
    )
  }

  if (lyrics == 'false') {
    return new NextResponse(
      JSON.stringify(
        tracks.filter(({ lyrics }) => lyrics == false),
        null,
        2,
      ),
    )
  }

  return new NextResponse(JSON.stringify(tracks, null, 2))
}
