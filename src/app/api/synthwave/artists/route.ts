import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

import { artists } from './data'

export const GET = async ({ nextUrl }: NextRequest) => {
  return new NextResponse(
    JSON.stringify(
      artists.filter(({ country }) => {
        const countryFilter = nextUrl.searchParams.get('country')

        if (countryFilter) {
          return country == countryFilter
        }

        return true
      }),
      null,
      2,
    ),
  )
}
