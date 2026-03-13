import { useState, useEffect } from 'react'

const KEY = 'talento_english_favorites'

export default function useFavorites() {
  const [favorites, setFavorites] = useState(() => {
    try {
      const stored = localStorage.getItem(KEY)
      return stored ? JSON.parse(stored) : []
    } catch {
      return []
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(favorites))
    } catch {
      // storage not available
    }
  }, [favorites])

  const isFavorite = (id) => favorites.includes(id)

  const toggleFavorite = (id) => {
    setFavorites(prev =>
      prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
    )
  }

  const clearFavorites = () => setFavorites([])

  return { favorites, isFavorite, toggleFavorite, clearFavorites }
}
