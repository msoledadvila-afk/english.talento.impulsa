import { useState } from 'react'
import useFavorites from '../hooks/useFavorites.js'

const TYPE_LABELS = { noun: 'n.', verb: 'v.', adjective: 'adj.', adverb: 'adv.', expression: 'expr.' }

export default function WordCard({ word }) {
  const { isFavorite, toggleFavorite } = useFavorites()
  const [flipped, setFlipped] = useState(false)
  const fav = isFavorite(word.id)

  return (
    <div style={cardStyles.card}>
      {/* Top row */}
      <div style={cardStyles.topRow}>
        <div style={cardStyles.wordBlock}>
          <div style={cardStyles.wordRow}>
            <span style={cardStyles.word}>{word.word}</span>
            {word.type && (
              <span style={cardStyles.type}>{TYPE_LABELS[word.type] || word.type}</span>
            )}
          </div>
          {word.ipa && <span style={cardStyles.ipa}>{word.ipa}</span>}
        </div>
        <div style={cardStyles.badges}>
          <span className={`level-badge level-${word.level}`}>{word.level}</span>
          <button
            onClick={() => toggleFavorite(word.id)}
            style={{ ...cardStyles.favBtn, color: fav ? '#f59e0b' : '#94a3b8' }}
            title={fav ? 'Remove from favorites' : 'Add to favorites'}
            aria-label={fav ? 'Remove from favorites' : 'Add to favorites'}
          >
            <svg width="16" height="16" viewBox="0 0 24 24"
              fill={fav ? '#f59e0b' : 'none'}
              stroke="currentColor" strokeWidth="2">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
            </svg>
          </button>
        </div>
      </div>

      {/* Translation */}
      <div style={cardStyles.translation}>
        <span style={cardStyles.flag}>🇪🇸</span>
        <span style={cardStyles.transText}>{word.translation}</span>
      </div>

      {/* Definition */}
      <div style={cardStyles.definition}>{word.definition_en}</div>

      {/* Toggle example */}
      <button
        onClick={() => setFlipped(!flipped)}
        style={cardStyles.exampleToggle}
      >
        {flipped ? '▲ Hide example' : '▼ Show example'}
      </button>

      {flipped && (
        <div style={cardStyles.example}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2" style={{ flexShrink: 0, marginTop: 2 }}>
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
          </svg>
          <span style={cardStyles.exampleText}>{word.example}</span>
        </div>
      )}
    </div>
  )
}

const cardStyles = {
  card: {
    background: 'var(--bg-card)',
    border: '1px solid var(--border)',
    borderRadius: 'var(--radius-lg)',
    padding: '16px 18px',
    boxShadow: 'var(--shadow-sm)',
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
    transition: 'box-shadow .15s, transform .15s',
  },
  topRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  wordBlock: {
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
  },
  wordRow: {
    display: 'flex',
    alignItems: 'baseline',
    gap: 6,
  },
  word: {
    fontFamily: 'var(--font-display)',
    fontSize: 20,
    fontWeight: 600,
    color: 'var(--navy)',
    lineHeight: 1.2,
  },
  type: {
    fontSize: 12,
    color: 'var(--text-muted)',
    fontStyle: 'italic',
  },
  ipa: {
    fontSize: 12,
    color: 'var(--text-light)',
    letterSpacing: '.02em',
  },
  badges: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    flexShrink: 0,
  },
  favBtn: {
    background: 'none',
    border: 'none',
    padding: 4,
    borderRadius: 6,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    transition: 'color .15s',
  },
  translation: {
    display: 'flex',
    alignItems: 'center',
    gap: 6,
    padding: '6px 10px',
    background: 'var(--accent-bg)',
    borderRadius: 'var(--radius-sm)',
  },
  flag: { fontSize: 14 },
  transText: {
    fontSize: 14,
    fontWeight: 500,
    color: 'var(--accent-dark)',
  },
  definition: {
    fontSize: 13,
    color: 'var(--text-muted)',
    lineHeight: 1.5,
  },
  exampleToggle: {
    background: 'none',
    border: 'none',
    fontSize: 11,
    color: 'var(--accent)',
    fontWeight: 500,
    cursor: 'pointer',
    padding: '2px 0',
    textAlign: 'left',
    letterSpacing: '.02em',
  },
  example: {
    display: 'flex',
    gap: 8,
    padding: '8px 12px',
    background: '#f0f7ff',
    borderRadius: 'var(--radius-sm)',
    borderLeft: '3px solid var(--accent)',
  },
  exampleText: {
    fontSize: 13,
    color: 'var(--text)',
    lineHeight: 1.5,
    fontStyle: 'italic',
  },
}
