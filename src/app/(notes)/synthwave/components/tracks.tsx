import { tracks } from '@/app/api/synthwave/tracks/data'

export const NoLyrics = () => (
  <table>
    <thead>
      <tr>
        <th>Title</th>
        <th>Artist(s)</th>
        <th>Release Year</th>
      </tr>
    </thead>
    <tbody>
      {tracks
        .filter(({ lyrics }) => !lyrics)
        .sort((a, b) => a.year - b.year)
        .map(({ title, artists, year }) => (
          <tr key={title}>
            <td>{title}</td>
            <td>{artists.join(', ')}</td>
            <td>{year}</td>
          </tr>
        ))}
    </tbody>
  </table>
)

export const Lyrics = () => (
  <table>
    <thead>
      <tr>
        <th>Title</th>
        <th>Artist(s)</th>
        <th>Release Year</th>
      </tr>
    </thead>
    <tbody>
      {tracks
        .filter(({ lyrics }) => lyrics)
        .sort((a, b) => a.year - b.year)
        .map(({ title, artists, year }) => (
          <tr key={title}>
            <td>{title}</td>
            <td>{artists.join(', ')}</td>
            <td>{year}</td>
          </tr>
        ))}
    </tbody>
  </table>
)
