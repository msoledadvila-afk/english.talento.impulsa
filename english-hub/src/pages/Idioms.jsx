import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const IDIOMS = [
  { idiom: 'hit the nail on the head', literal: 'golpear el clavo en la cabeza', real: 'decir algo exactamente correcto', example: 'You hit the nail on the head — that\'s exactly the problem.', theme: 'body', level: 'B2' },
  { idiom: 'bite the bullet', literal: 'morder la bala', real: 'aguantar algo difícil sin quejarse', example: 'It was painful, but she bit the bullet and finished the project.', theme: 'body', level: 'C1' },
  { idiom: 'costs an arm and a leg', literal: 'cuesta un brazo y una pierna', real: 'ser muy caro', example: 'That restaurant is great, but it costs an arm and a leg.', theme: 'body', level: 'B1' },
  { idiom: 'keep an eye on', literal: 'mantener un ojo en', real: 'vigilar o cuidar algo', example: 'Could you keep an eye on my bag while I get a coffee?', theme: 'body', level: 'B1' },
  { idiom: 'it\'s raining cats and dogs', literal: 'está lloviendo gatos y perros', real: 'llover muchísimo', example: 'Bring an umbrella — it\'s raining cats and dogs out there!', theme: 'weather', level: 'A2' },
  { idiom: 'every cloud has a silver lining', literal: 'cada nube tiene un forro plateado', real: 'toda situación mala tiene algo positivo', example: 'I lost my job, but every cloud has a silver lining — now I can travel.', theme: 'weather', level: 'B2' },
  { idiom: 'on thin ice', literal: 'en hielo delgado', real: 'en una situación arriesgada', example: 'He was on thin ice with his manager after missing two deadlines.', theme: 'weather', level: 'B2' },
  { idiom: 'the tip of the iceberg', literal: 'la punta del iceberg', real: 'una pequeña parte visible de un problema mayor', example: 'The financial losses are just the tip of the iceberg.', theme: 'weather', level: 'C1' },
  { idiom: 'let the cat out of the bag', literal: 'dejar salir al gato de la bolsa', real: 'revelar un secreto accidentalmente', example: 'She let the cat out of the bag about the surprise party.', theme: 'animals', level: 'B1' },
  { idiom: 'kill two birds with one stone', literal: 'matar dos pájaros de un tiro', real: 'resolver dos problemas con una sola acción', example: 'I\'ll drop the kids off and do the shopping — kill two birds with one stone.', theme: 'animals', level: 'B1' },
  { idiom: 'the elephant in the room', literal: 'el elefante en la habitación', real: 'un problema obvio que nadie quiere mencionar', example: 'The budget cuts were the elephant in the room at the meeting.', theme: 'animals', level: 'C1' },
  { idiom: 'spill the beans', literal: 'derramar los frijoles', real: 'revelar información secreta', example: 'Who spilled the beans about the redundancies?', theme: 'food', level: 'B1' },
  { idiom: 'in a nutshell', literal: 'en una cáscara de nuez', real: 'resumiendo / en pocas palabras', example: 'In a nutshell, the project failed due to poor planning.', theme: 'food', level: 'B1' },
  { idiom: 'piece of cake', literal: 'un trozo de pastel', real: 'algo muy fácil', example: 'Don\'t worry about the test — it\'s a piece of cake.', theme: 'food', level: 'A2' },
  { idiom: 'go back to the drawing board', literal: 'volver al tablero de dibujo', real: 'empezar de nuevo desde el principio', example: 'The plan didn\'t work, so we had to go back to the drawing board.', theme: 'work', level: 'B2' },
]

const THEMES = ['All', 'body', 'weather', 'animals', 'food', 'work']

export default function Idioms() {
  const navigate = useNavigate()
  const [theme, setTheme] = useState('All')
  const [search, setSearch] = useState('')
  const [revealed, setRevealed] = useState({})

  const filtered = IDIOMS.filter(i =>
    (theme === 'All' || i.theme === theme) &&
    (i.idiom.includes(search.toLowerCase()) || i.real.toLowerCase().includes(search.toLowerCase()))
  )

  const toggle = (idx) => setRevealed(r => ({ ...r, [idx]: !r[idx] }))

  return (
    <div className="container">
      <div style={s.top}>
        <button className="back-btn" onClick={() => navigate('/')}>← Back</button>
        <h1 style={s.title}>🌀 Idioms</h1>
        <p style={s.sub}>Figurative expressions with literal translation and real meaning</p>
        <div style={s.filterRow}>
          {THEMES.map(t => (
            <button key={t} onClick={() => setTheme(t)} style={{ ...s.pill, background: theme === t ? 'var(--navy)' : 'var(--bg-card)', color: theme === t ? '#fff' : 'var(--text-muted)', borderColor: theme === t ? 'var(--navy)' : 'var(--border-mid)' }}>
              {t === 'All' ? 'All themes' : t}
            </button>
          ))}
        </div>
        <input type="search" placeholder="Search idiom or meaning…" value={search} onChange={e => setSearch(e.target.value)} style={s.search} />
      </div>

      <div style={s.grid}>
        {filtered.map((item, i) => (
          <div key={i} style={s.card}>
            <div style={s.cardTop}>
              <span style={s.idiomText}>"{item.idiom}"</span>
              <span className={`level-badge level-${item.level}`}>{item.level}</span>
            </div>
            <div style={s.literal}>Literal: <em>{item.literal}</em></div>
            <button onClick={() => toggle(i)} style={s.revealBtn}>
              {revealed[i] ? '▲ Hide meaning' : '▼ Show real meaning'}
            </button>
            {revealed[i] && (
              <>
                <div style={s.real}>✓ {item.real}</div>
                <div style={s.example}>→ <em>{item.example}</em></div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

const s = {
  top: { padding: '24px 0 20px', borderBottom: '1px solid var(--border)', marginBottom: 24 },
  title: { fontFamily: 'var(--font-display)', fontSize: 26, fontWeight: 600, color: 'var(--navy)', marginTop: 4, marginBottom: 4 },
  sub: { fontSize: 13, color: 'var(--text-muted)', marginBottom: 12 },
  filterRow: { display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 10 },
  pill: { padding: '4px 12px', borderRadius: 20, fontSize: 12, fontWeight: 600, border: '1px solid', cursor: 'pointer', transition: 'all .12s' },
  search: { maxWidth: 300, padding: '8px 13px', border: '1px solid var(--border-mid)', borderRadius: 'var(--radius)', fontSize: 13, background: 'var(--bg-card)', color: 'var(--text)', outline: 'none' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 12 },
  card: { background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: 8 },
  cardTop: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8 },
  idiomText: { fontFamily: 'var(--font-display)', fontSize: 15, fontWeight: 600, color: 'var(--navy)', lineHeight: 1.3 },
  literal: { fontSize: 12, color: 'var(--text-muted)' },
  revealBtn: { background: 'none', border: 'none', fontSize: 11, color: 'var(--accent)', fontWeight: 500, cursor: 'pointer', textAlign: 'left', padding: '2px 0' },
  real: { fontSize: 13, fontWeight: 500, color: '#0f6e56', background: '#e1f5ee', borderRadius: 6, padding: '6px 10px' },
  example: { fontSize: 12, color: 'var(--text-muted)', lineHeight: 1.5 },
}
