import { NextResponse } from 'next/server'

import { artists } from './data'

export const GET = async () => {
  return new NextResponse(JSON.stringify(artists, null, 2))
}
