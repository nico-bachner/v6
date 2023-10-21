import { NextResponse } from 'next/server'

import { fetchNotes } from '@/lib/fetchNotes'

export const GET = async () => {
  const notes = await fetchNotes()

  return new NextResponse(JSON.stringify(notes, null, 2))
}
