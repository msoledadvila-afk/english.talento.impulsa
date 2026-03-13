import { Link } from 'react-router-dom'

const SECTIONS = [
  {
    to: '/vocabulary',
    emoji: '📚',
    title: 'Vocabulary',
    desc: '35 topic categories with words, translations and examples',
    color: '#2d7dd2',
    bg: '#e8f2fc',
  },
  {
    to: '/grammar',
    emoji: '📖',
    title: 'Grammar',
    desc: 'Rules, structures and examples for every level',
    color: '#0f6e56',
    bg: '#e1f5ee',
  },
  {
    to: '/phrasal-verbs',
    emoji: '🔗',
    title: 'Phrasal Verbs',
    desc: 'Organised by base verb or particle',
    color: '#854f0b',
    bg: '#faeeda',
  },
  {
    to: '/tenses',
    emoji: '⏱',
    title: 'Tenses',
    desc: 'All 10 tenses with structure, use and examples',
    color: '#534ab7',
    bg: '#eeedfe',
  },
  {
    to: '/expressions',
    emoji: '💬',
    title: 'Expressions',
    desc: 'Useful phrases for real communication',
    color: '#993c1d',
    bg: '#faece7',
  },
  {
    to: '/writing',
    emoji: '✍️',
    title: 'Writing',
    desc: 'Templates for emails, reports, essays and more',
    color: '#72243e',
    bg: '#fbeaf0',
  },
  {
    to: '/idioms',
    emoji: '🌀',
    title: 'Idioms',
    desc: 'Figurative expressions with real meaning explained',
    color: '#27500a',
    bg: '#eaf3de',
  },
  {
    to: '/favorites',
    emoji: '⭐',
    title: 'My Favorites',
    desc: 'Words and content you have saved',
    color: '#92400e',
    bg: '#fef3c7',
  },
]

export default function Home() {
  return (
    <div className="container">
      {/* Hero */}
      <div style={s.hero}>
        <p style={s.heroLabel}>Welcome to</p>
        <h1 style={s.heroTitle}>English by Talento Impulsa</h1>
        <p style={s.heroSub}>
          Your complete reference for vocabulary, grammar and communication skills.
          Choose a section below to get started.
        </p>
      </div>

      {/* Grid */}
      <div style={s.grid}>
        {SECTIONS.map(sec => (
          <Link key={sec.to} to={sec.to} style={{ textDecoration: 'none' }}>
            <div style={{ ...s.card, '--card-accent': sec.color, '--card-bg': sec.bg }}>
              <div style={{ ...s.iconBox, background: sec.bg }}>
                <span style={s.emoji}>{sec.emoji}</span>
              </div>
              <div>
                <h2 style={{ ...s.cardTitle, color: sec.color }}>{sec.title}</h2>
                <p style={s.cardDesc}>{sec.desc}</p>
              </div>
              <div style={{ ...s.arrow, color: sec.color }}>→</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

const s = {
  hero: {
    padding: '36px 0 32px',
    borderBottom: '1px solid var(--border)',
    marginBottom: 28,
  },
  heroLabel: {
    fontSize: 12,
    fontWeight: 600,
    letterSpacing: '.1em',
    textTransform: 'uppercase',
    color: 'var(--accent)',
    marginBottom: 6,
  },
  heroTitle: {
    fontFamily: 'var(--font-display)',
    fontSize: 32,
    fontWeight: 600,
    color: 'var(--navy)',
    lineHeight: 1.2,
    marginBottom: 10,
  },
  heroSub: {
    fontSize: 15,
    color: 'var(--text-muted)',
    maxWidth: 520,
    lineHeight: 1.6,
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
    gap: 14,
  },
  card: {
    background: 'var(--bg-card)',
    border: '1px solid var(--border)',
    borderRadius: 'var(--radius-lg)',
    padding: '18px 16px',
    display: 'flex',
    alignItems: 'flex-start',
    gap: 14,
    boxShadow: 'var(--shadow-sm)',
    transition: 'box-shadow .15s, transform .15s',
    cursor: 'pointer',
    position: 'relative',
  },
  iconBox: {
    width: 44,
    height: 44,
    borderRadius: 'var(--radius)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  emoji: { fontSize: 20 },
  cardTitle: {
    fontSize: 15,
    fontWeight: 600,
    marginBottom: 3,
    lineHeight: 1.2,
  },
  cardDesc: {
    fontSize: 12,
    color: 'var(--text-muted)',
    lineHeight: 1.45,
  },
  arrow: {
    marginLeft: 'auto',
    fontSize: 16,
    flexShrink: 0,
    alignSelf: 'center',
    opacity: .5,
  },
}
