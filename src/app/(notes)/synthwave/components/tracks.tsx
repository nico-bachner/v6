import { Track } from '@/types/music'

export const Tracks = async () => {
  const res = await fetch('https://synthwave.wiki/api/tracks')
  const tracks: Track[] = await res.json()

  return (
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
}
