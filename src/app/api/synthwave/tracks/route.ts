import { NextResponse } from 'next/server'

import { tracks } from './data'

export const GET = async () => {
  return new NextResponse(JSON.stringify(tracks, null, 2))
}
