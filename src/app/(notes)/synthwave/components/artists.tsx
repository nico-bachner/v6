import type { Artist } from '@/types/music'

type Country = {
  name: string
  artists: string[]
}

export const Artists = async () => {
  const res = await fetch('https://synthwave.wiki/api/artists')
  const artists: Artist[] = await res.json()

  const countries: Country[] = []

  artists.forEach(({ name, country }) => {
    const index = countries
      .map(({ name }) => name)
      .indexOf(country ?? 'Unknown')

    if (index == -1) {
      countries.push({ name: country ?? 'Unknown', artists: [name] })
    } else {
      countries[index] = {
        name: country ?? 'Unknown',
        artists: [...countries[index].artists, name],
      }
    }
  })

  return (
    <table>
      <thead>
        <tr>
          <th>Artist</th>
          <th>Origin</th>
        </tr>
      </thead>
      <tbody>
        {countries
          .sort((a, b) => (a.name > b.name ? 1 : -1))
          .sort((a, b) => b.artists.length - a.artists.length)
          .sort((a, b) => {
            if (a.name == 'Unknown' && b.name == 'Unknown') {
              return 0
            }

            if (a.name == 'Unknown') {
              return 1
            }

            if (b.name == 'Unknown') {
              return -1
            }

            return 0
          })
          .map(({ name }) =>
            artists
              .filter(({ country }) => name == (country ?? 'Unknown'))
              .map(({ name, country }) => (
                <tr key={name}>
                  <td>{name}</td>
                  <td>{country}</td>
                </tr>
              )),
          )}
      </tbody>
    </table>
  )
}

export const Countries = async () => {
  const res = await fetch('https://synthwave.wiki/api/artists')
  const artists: Artist[] = await res.json()

  const countries: Country[] = []

  artists.forEach(({ name, country }) => {
    const index = countries
      .map(({ name }) => name)
      .indexOf(country ?? 'Unknown')

    if (index == -1) {
      countries.push({ name: country ?? 'Unknown', artists: [name] })
    } else {
      countries[index] = {
        name: country ?? 'Unknown',
        artists: [...countries[index].artists, name],
      }
    }
  })

  return (
    <table>
      <thead>
        <tr>
          <th>Country</th>
          <th>Artists</th>
        </tr>
      </thead>
      <tbody>
        {countries
          .sort((a, b) => (a.name > b.name ? 1 : -1))
          .sort((a, b) => b.artists.length - a.artists.length)
          .filter(({ artists }) => artists.length > 1)
          .filter(({ name }) => name != 'Unknown')
          .map(({ name, artists }) => (
            <tr key={name}>
              <td>{name}</td>
              <td>{artists.length}</td>
            </tr>
          ))}
      </tbody>
    </table>
  )
}
