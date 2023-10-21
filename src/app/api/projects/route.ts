import { NextResponse } from 'next/server'

import { fetchProjects } from '@/lib/fetchProjects'

export const GET = async () => {
  const projects = await fetchProjects()

  return new NextResponse(JSON.stringify(projects, null, 2))
}
