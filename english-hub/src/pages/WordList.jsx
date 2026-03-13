import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import WordCard from '../components/WordCard.jsx'
import CATEGORIES from '../data/categories.js'

const LEVELS = ['All', 'A1', 'A2', 'B1', 'B2', 'C1', 'C2']

export default function WordList() {
  const { category } = useParams()
  const navigate = useNavigate()
  const [words, setWords] = useState([])
  const [level, setLevel] = useState('All')
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  const meta = CATEGORIES.find(c => c.id === category)

  useEffect(() => {
    setLoading(true)
    setError(false)
    import(`../data/vocabulary/${category}.json`)
      .then(mod => {
        setWords(mod.default)
        setLoading(false)
      })
      .catch(() => {
        setError(true)
        setLoading(false)
      })
  }, [category])

  const filtered = words.filter(w => {
    const matchLevel = level === 'All' || w.level === level
    const matchSearch = w.word.toLowerCase().includes(search.toLowerCase()) ||
                        w.translation.toLowerCase().includes(search.toLowerCase())
    return matchLevel && matchSearch
  })

  return (
    <div className="container">
      <div style={s.top}>
        <button className="back-btn" onClick={() => navigate('/vocabulary')}>
          ← Vocabulary
        </button>

        <div style={s.titleRow}>
          <span style={s.emoji}>{meta?.emoji || '📚'}</span>
          <div>
            <h1 style={s.title}>{meta?.label || category}</h1>
            <p style={s.sub}>{meta?.desc}</p>
          </div>
        </div>

        {/* Filters */}
        <div style={s.filters}>
          <div style={s.levelRow}>
            {LEVELS.map(l => (
              <button
                key={l}
                onClick={() => setLevel(l)}
                style={{
                  ...s.levelBtn,
                  background: level === l ? 'var(--navy)' : 'var(--bg-card)',
                  color: level === l ? '#fff' : 'var(--text-muted)',
                  borderColor: level === l ? 'var(--navy)' : 'var(--border-mid)',
                }}
              >
                {l}
              </button>
            ))}
          </div>
          <input
            type="search"
            placeholder="Search word or translation…"
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={s.search}
          />
        </div>

        {!loading && !error && (
          <p style={s.count}>{filtered.length} word{filtered.length !== 1 ? 's' : ''}</p>
        )}
      </div>

      {loading && (
        <div className="empty-state">
          <div className="icon">⏳</div>
          <p>Loading words…</p>
        </div>
      )}

      {error && (
        <div className="empty-state">
          <div className="icon">🚧</div>
          <h3>Coming soon</h3>
          <p>This category hasn't been added yet. Check back later!</p>
        </div>
      )}

      {!loading && !error && filtered.length === 0 && (
        <div className="empty-state">
          <div className="icon">🔍</div>
          <h3>No words found</h3>
          <p>Try a different level or search term.</p>
        </div>
      )}

      {!loading && !error && filtered.length > 0 && (
        <div style={s.grid}>
          {filtered.map(word => (
            <WordCard key={word.id} word={word} />
          ))}
        </div>
      )}
    </div>
  )
}

const s = {
  top: {
    padding: '24px 0 20px',
    borderBottom: '1px solid var(--border)',
    marginBottom: 24,
  },
  titleRow: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: 12,
    margin: '8px 0 16px',
  },
  emoji: { fontSize: 28, lineHeight: 1, marginTop: 4 },
  title: {
    fontFamily: 'var(--font-display)',
    fontSize: 24,
    fontWeight: 600,
    color: 'var(--navy)',
    marginBottom: 3,
  },
  sub: {
    fontSize: 13,
    color: 'var(--text-muted)',
  },
  filters: {
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
  },
  levelRow: {
    display: 'flex',
    gap: 6,
    flexWrap: 'wrap',
  },
  levelBtn: {
    padding: '5px 12px',
    borderRadius: 20,
    fontSize: 12,
    fontWeight: 600,
    border: '1px solid',
    cursor: 'pointer',
    transition: 'all .12s',
    letterSpacing: '.02em',
  },
  search: {
    width: '100%',
    maxWidth: 320,
    padding: '8px 13px',
    border: '1px solid var(--border-mid)',
    borderRadius: 'var(--radius)',
    fontSize: 13,
    background: 'var(--bg-card)',
    color: 'var(--text)',
    outline: 'none',
  },
  count: {
    fontSize: 12,
    color: 'var(--text-light)',
    marginTop: 10,
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: 12,
  },
}
