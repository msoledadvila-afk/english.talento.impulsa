import { useNavigate } from 'react-router-dom'
import useFavorites from '../hooks/useFavorites.js'
import WordCard from '../components/WordCard.jsx'
import { useState, useEffect } from 'react'
import CATEGORIES from '../data/categories.js'

export default function Favorites() {
  const { favorites, clearFavorites } = useFavorites()
  const navigate = useNavigate()
  const [words, setWords] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (favorites.length === 0) { setWords([]); setLoading(false); return }
    const categoryIds = [...new Set(favorites.map(id => id.split('_')[0]))]
    Promise.all(
      categoryIds.map(cat =>
        import(`../data/vocabulary/${cat}.json`).then(m => m.default).catch(() => [])
      )
    ).then(results => {
      const all = results.flat()
      setWords(all.filter(w => favorites.includes(w.id)))
      setLoading(false)
    })
  }, [favorites])

  return (
    <div className="container">
      <div style={s.top}>
        <button className="back-btn" onClick={() => navigate('/')}>← Back</button>
        <div style={s.titleRow}>
          <h1 style={s.title}>⭐ My Favorites</h1>
          {favorites.length > 0 && (
            <button onClick={() => { if (confirm('Clear all favorites?')) clearFavorites() }} style={s.clearBtn}>
              Clear all
            </button>
          )}
        </div>
        <p style={s.sub}>{favorites.length} saved word{favorites.length !== 1 ? 's' : ''}</p>
      </div>

      {loading && <div className="empty-state"><div className="icon">⏳</div><p>Loading…</p></div>}

      {!loading && favorites.length === 0 && (
        <div className="empty-state">
          <div className="icon">⭐</div>
          <h3>No favorites yet</h3>
          <p>Tap the star on any word to save it here.</p>
        </div>
      )}

      {!loading && words.length > 0 && (
        <div style={s.grid}>
          {words.map(w => <WordCard key={w.id} word={w} />)}
        </div>
      )}
    </div>
  )
}

const s = {
  top: { padding: '24px 0 20px', borderBottom: '1px solid var(--border)', marginBottom: 24 },
  titleRow: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 6, marginBottom: 4 },
  title: { fontFamily: 'var(--font-display)', fontSize: 24, fontWeight: 600, color: 'var(--navy)' },
  sub: { fontSize: 13, color: 'var(--text-muted)' },
  clearBtn: { fontSize: 12, color: 'var(--text-muted)', background: 'none', border: '1px solid var(--border-mid)', borderRadius: 'var(--radius-sm)', padding: '4px 10px', cursor: 'pointer' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 12 },
}
