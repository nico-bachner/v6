import { useEffect, useState } from 'react'

import { Note } from '@/types/note'

export const useNotes = () => {
  const [notes, setNotes] = useState<Note[]>()

  useEffect(() => {
    const fetchNotes = async () => {
      const res = await fetch('/api/notes')
      const notes = await res.json()

      setNotes(notes)
    }

    fetchNotes()
  }, [])

  return notes
}
