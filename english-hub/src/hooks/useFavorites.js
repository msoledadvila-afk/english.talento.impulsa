import { useSyncExternalStore } from 'react'

const KEY = 'talento_english_favorites'

function readStorage() {
  try {
    const stored = localStorage.getItem(KEY)
    return stored ? JSON.parse(stored) : []
  } catch {
    return []
  }
}

// Estado compartido a nivel módulo: TODAS las instancias de useFavorites()
// leen y escriben este mismo array, en vez de tener cada una su copia.
let favorites = readStorage()
const listeners = new Set()

function persist() {
  try {
    localStorage.setItem(KEY, JSON.stringify(favorites))
  } catch {
    // storage not available
  }
}

function notify() {
  listeners.forEach((listener) => listener())
}

function subscribe(listener) {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

function getSnapshot() {
  return favorites
}

export default function useFavorites() {
  // useSyncExternalStore re-renderiza ESTA instancia cada vez que
  // cualquier otra instancia cambia el estado compartido.
  const favs = useSyncExternalStore(subscribe, getSnapshot)

  const isFavorite = (id) => favs.includes(id)

  const toggleFavorite = (id) => {
    favorites = favorites.includes(id)
      ? favorites.filter((f) => f !== id)
      : [...favorites, id]
    persist()
    notify()
  }

  const clearFavorites = () => {
    favorites = []
    persist()
    notify()
  }

  return { favorites: favs, isFavorite, toggleFavorite, clearFavorites }
}
