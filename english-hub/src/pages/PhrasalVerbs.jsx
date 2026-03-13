import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const PHRASAL_VERBS = [
  { verb: 'give up', meaning: 'Dejar de hacer algo / rendirse', example: 'Don\'t give up — you\'re almost there!', type: 'inseparable', level: 'A2' },
  { verb: 'look up', meaning: 'Buscar información', example: 'Look up the word in the dictionary.', type: 'separable', level: 'A2' },
  { verb: 'run out of', meaning: 'Quedarse sin algo', example: 'We ran out of milk this morning.', type: 'inseparable', level: 'B1' },
  { verb: 'put off', meaning: 'Postergar / aplazar', example: 'Stop putting off your homework!', type: 'separable', level: 'B1' },
  { verb: 'carry out', meaning: 'Llevar a cabo / realizar', example: 'The team carried out a full investigation.', type: 'separable', level: 'B2' },
  { verb: 'come across', meaning: 'Encontrarse con algo por casualidad', example: 'I came across an old photo in the attic.', type: 'inseparable', level: 'B1' },
  { verb: 'bring up', meaning: 'Criar / mencionar un tema', example: 'She was brought up by her grandmother.', type: 'separable', level: 'B1' },
  { verb: 'turn down', meaning: 'Rechazar / bajar el volumen', example: 'He turned down the job offer.', type: 'separable', level: 'B1' },
  { verb: 'break down', meaning: 'Averiarse / desmoronarse emocionalmente', example: 'The car broke down on the motorway.', type: 'inseparable', level: 'B1' },
  { verb: 'deal with', meaning: 'Manejar / ocuparse de', example: 'I\'ll deal with the complaint later.', type: 'inseparable', level: 'B2' },
  { verb: 'set up', meaning: 'Establecer / montar', example: 'She set up her own business at 25.', type: 'separable', level: 'B2' },
  { verb: 'go ahead', meaning: 'Proceder / adelante', example: 'Please go ahead with your plan.', type: 'inseparable', level: 'B1' },
  { verb: 'figure out', meaning: 'Entender / resolver', example: 'Can you figure out how this works?', type: 'separable', level: 'B2' },
  { verb: 'point out', meaning: 'Señalar / indicar', example: 'He pointed out an error in my report.', type: 'separable', level: 'B2' },
  { verb: 'take over', meaning: 'Hacerse cargo de / apoderarse de', example: 'A new CEO took over the company.', type: 'inseparable', level: 'C1' },
]

const TYPES = ['All', 'separable', 'inseparable']
const LEVELS = ['All', 'A2', 'B1', 'B2', 'C1']

export default function PhrasalVerbs() {
  const navigate = useNavigate()
  const [type, setType] = useState('All')
  const [level, setLevel] = useState('All')
  const [search, setSearch] = useState('')

  const filtered = PHRASAL_VERBS.filter(pv => {
    return (type === 'All' || pv.type === type) &&
           (level === 'All' || pv.level === level) &&
           (pv.verb.includes(search.toLowerCase()) || pv.meaning.toLowerCase().includes(search.toLowerCase()))
  })

  return (
    <div className="container">
      <div style={s.top}>
        <button className="back-btn" onClick={() => navigate('/')}>← Back</button>
        <h1 style={s.title}>🔗 Phrasal Verbs</h1>
        <p style={s.sub}>Common phrasal verbs with Spanish meaning and examples</p>
        <div style={s.filters}>
          <div style={s.filterRow}>
            {TYPES.map(t => (
              <button key={t} onClick={() => setType(t)} style={{ ...s.pill, background: type === t ? 'var(--navy)' : 'var(--bg-card)', color: type === t ? '#fff' : 'var(--text-muted)', borderColor: type === t ? 'var(--navy)' : 'var(--border-mid)' }}>
                {t === 'All' ? 'All types' : t}
              </button>
            ))}
          </div>
          <div style={s.filterRow}>
            {LEVELS.map(l => (
              <button key={l} onClick={() => setLevel(l)} style={{ ...s.pill, background: level === l ? 'var(--navy)' : 'var(--bg-card)', color: level === l ? '#fff' : 'var(--text-muted)', borderColor: level === l ? 'var(--navy)' : 'var(--border-mid)' }}>
                {l}
              </button>
            ))}
          </div>
          <input type="search" placeholder="Search phrasal verb…" value={search} onChange={e => setSearch(e.target.value)} style={s.search} />
        </div>
        <p style={s.count}>{filtered.length} phrasal verb{filtered.length !== 1 ? 's' : ''}</p>
      </div>

      <div style={s.grid}>
        {filtered.map((pv, i) => (
          <div key={i} style={s.card}>
            <div style={s.cardTop}>
              <span style={s.verbText}>{pv.verb}</span>
              <div style={s.badgeRow}>
                <span className={`level-badge level-${pv.level}`}>{pv.level}</span>
                <span style={{ ...s.typeBadge, background: pv.type === 'separable' ? '#e1f5ee' : '#eeedfe', color: pv.type === 'separable' ? '#085041' : '#3c3489' }}>{pv.type}</span>
              </div>
            </div>
            <div style={s.meaning}>🇪🇸 {pv.meaning}</div>
            <div style={s.example}>→ <em>{pv.example}</em></div>
          </div>
        ))}
      </div>
    </div>
  )
}

const s = {
  top: { padding: '24px 0 20px', borderBottom: '1px solid var(--border)', marginBottom: 24 },
  title: { fontFamily: 'var(--font-display)', fontSize: 26, fontWeight: 600, color: 'var(--navy)', marginTop: 4, marginBottom: 4 },
  sub: { fontSize: 13, color: 'var(--text-muted)', marginBottom: 14 },
  filters: { display: 'flex', flexDirection: 'column', gap: 8 },
  filterRow: { display: 'flex', gap: 6, flexWrap: 'wrap' },
  pill: { padding: '4px 12px', borderRadius: 20, fontSize: 12, fontWeight: 600, border: '1px solid', cursor: 'pointer', transition: 'all .12s' },
  search: { maxWidth: 300, padding: '8px 13px', border: '1px solid var(--border-mid)', borderRadius: 'var(--radius)', fontSize: 13, background: 'var(--bg-card)', color: 'var(--text)', outline: 'none' },
  count: { fontSize: 12, color: 'var(--text-light)', marginTop: 8 },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 12 },
  card: { background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: 8 },
  cardTop: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8 },
  verbText: { fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 600, color: 'var(--navy)' },
  badgeRow: { display: 'flex', gap: 6, flexShrink: 0 },
  typeBadge: { fontSize: 10, fontWeight: 600, padding: '2px 7px', borderRadius: 10 },
  meaning: { fontSize: 13, fontWeight: 500, color: 'var(--accent-dark)' },
  example: { fontSize: 12, color: 'var(--text-muted)', lineHeight: 1.5 },
}
