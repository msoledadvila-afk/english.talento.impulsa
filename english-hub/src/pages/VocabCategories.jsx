import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import CATEGORIES from '../data/categories.js'

export default function VocabCategories() {
  const [search, setSearch] = useState('')
  const navigate = useNavigate()

  const filtered = CATEGORIES.filter(c =>
    c.label.toLowerCase().includes(search.toLowerCase()) ||
    c.desc.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="container">
      <div style={s.top}>
        <button className="back-btn" onClick={() => navigate('/')}>
          ← Back
        </button>
        <h1 style={s.title}>Vocabulary</h1>
        <p style={s.sub}>Select a category to explore words with translations and examples</p>

        <input
          type="search"
          placeholder="Search a topic…"
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={s.search}
        />
      </div>

      {filtered.length === 0 ? (
        <div className="empty-state">
          <div className="icon">🔍</div>
          <h3>No categories found</h3>
          <p>Try a different search term</p>
        </div>
      ) : (
        <div style={s.grid}>
          {filtered.map(cat => (
            <Link key={cat.id} to={`/vocabulary/${cat.id}`} style={{ textDecoration: 'none' }}>
              <div style={s.card}>
                <span style={s.emoji}>{cat.emoji}</span>
                <div>
                  <div style={s.label}>{cat.label}</div>
                  <div style={s.desc}>{cat.desc}</div>
                </div>
                <span style={s.arrow}>→</span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

const s = {
  top: {
    padding: '28px 0 24px',
    borderBottom: '1px solid var(--border)',
    marginBottom: 24,
  },
  title: {
    fontFamily: 'var(--font-display)',
    fontSize: 26,
    fontWeight: 600,
    color: 'var(--navy)',
    marginBottom: 6,
    marginTop: 4,
  },
  sub: {
    fontSize: 14,
    color: 'var(--text-muted)',
    marginBottom: 16,
  },
  search: {
    width: '100%',
    maxWidth: 360,
    padding: '9px 14px',
    border: '1px solid var(--border-mid)',
    borderRadius: 'var(--radius)',
    fontSize: 14,
    background: 'var(--bg-card)',
    color: 'var(--text)',
    outline: 'none',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
    gap: 10,
  },
  card: {
    background: 'var(--bg-card)',
    border: '1px solid var(--border)',
    borderRadius: 'var(--radius-lg)',
    padding: '14px 14px',
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    boxShadow: 'var(--shadow-sm)',
    transition: 'box-shadow .15s, transform .15s',
    cursor: 'pointer',
  },
  emoji: { fontSize: 22, flexShrink: 0, lineHeight: 1 },
  label: {
    fontSize: 13,
    fontWeight: 600,
    color: 'var(--text)',
    marginBottom: 2,
  },
  desc: {
    fontSize: 11,
    color: 'var(--text-muted)',
    lineHeight: 1.4,
  },
  arrow: {
    marginLeft: 'auto',
    fontSize: 14,
    color: 'var(--text-light)',
    flexShrink: 0,
  },
}
