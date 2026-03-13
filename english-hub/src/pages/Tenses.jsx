import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const TENSES = [
  { id: 'sp', title: 'Simple Present', level: 'A1', structure: 'Subject + base verb (he/she/it → verb+s)', use: 'Habits, routines, general truths, permanent states.', examples: ['She works in a hospital.', 'The sun rises in the east.', 'I drink coffee every morning.'] },
  { id: 'pc', title: 'Present Continuous', level: 'A1', structure: 'Subject + am/is/are + verb-ing', use: 'Actions happening right now or temporary situations.', examples: ['He is studying for his exam.', 'They are living in Buenos Aires for now.', 'What are you doing?'] },
  { id: 'pp', title: 'Present Perfect', level: 'B1', structure: 'Subject + have/has + past participle', use: 'Past actions with a connection to the present; experiences; recent events.', examples: ['I have visited Paris twice.', 'She has just finished the report.', 'Have you ever tried sushi?'] },
  { id: 'ppc', title: 'Present Perfect Continuous', level: 'B2', structure: 'Subject + have/has + been + verb-ing', use: 'Actions that started in the past and are still continuing, or stopped very recently.', examples: ['I have been waiting for an hour.', 'She has been working here since 2019.', 'They have been arguing all day.'] },
  { id: 'past-s', title: 'Simple Past', level: 'A2', structure: 'Subject + past form (regular: verb+ed)', use: 'Completed actions at a specific time in the past.', examples: ['She called me yesterday.', 'They arrived late.', 'I didn\'t see the film.'] },
  { id: 'past-c', title: 'Past Continuous', level: 'B1', structure: 'Subject + was/were + verb-ing', use: 'Actions in progress at a specific past moment; background actions interrupted by another event.', examples: ['I was cooking when she called.', 'They were sleeping at midnight.', 'What were you doing at 8 pm?'] },
  { id: 'past-p', title: 'Past Perfect', level: 'B2', structure: 'Subject + had + past participle', use: 'An action completed before another past action.', examples: ['By the time he arrived, we had already eaten.', 'She had never flown before that trip.', 'He explained that he had lost his keys.'] },
  { id: 'fut-s', title: 'Simple Future (will)', level: 'A2', structure: 'Subject + will + base verb', use: 'Predictions, spontaneous decisions, promises, offers.', examples: ['It will rain tomorrow.', 'I\'ll help you with that.', 'She will probably be late.'] },
  { id: 'fut-go', title: 'Going to Future', level: 'A2', structure: 'Subject + am/is/are + going to + base verb', use: 'Plans already decided; predictions based on evidence.', examples: ['We are going to travel next summer.', 'Look at those clouds – it\'s going to rain.', 'She is going to start a new job.'] },
  { id: 'fut-c', title: 'Future Continuous', level: 'C1', structure: 'Subject + will + be + verb-ing', use: 'Actions that will be in progress at a specific future time.', examples: ['This time tomorrow I will be sitting on the beach.', 'She will be presenting when you arrive.', 'They will be waiting at the gate.'] },
]

export default function Tenses() {
  const navigate = useNavigate()
  const [open, setOpen] = useState(null)

  return (
    <div className="container">
      <div style={s.top}>
        <button className="back-btn" onClick={() => navigate('/')}>← Back</button>
        <h1 style={s.title}>⏱ Tenses</h1>
        <p style={s.sub}>Tap a tense to see structure, use and examples</p>
      </div>

      <div style={s.list}>
        {TENSES.map(t => (
          <div key={t.id} style={s.item}>
            <button style={s.header} onClick={() => setOpen(open === t.id ? null : t.id)}>
              <span style={s.left}>
                <span style={s.itemTitle}>{t.title}</span>
              </span>
              <span style={s.right}>
                <span className={`level-badge level-${t.level}`}>{t.level}</span>
                <span style={s.chevron}>{open === t.id ? '▲' : '▼'}</span>
              </span>
            </button>

            {open === t.id && (
              <div style={s.body}>
                <div style={s.struct}>
                  <span style={s.structLabel}>Structure: </span>
                  <code style={s.code}>{t.structure}</code>
                </div>
                <p style={s.use}><strong>Use: </strong>{t.use}</p>
                <div style={s.exLabel}>Examples</div>
                {t.examples.map((ex, i) => (
                  <div key={i} style={s.example}>
                    <span style={s.dot}>→</span>
                    <span style={s.exText}>{ex}</span>
                  </div>
                ))}
              </div>
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
  sub: { fontSize: 13, color: 'var(--text-muted)' },
  list: { display: 'flex', flexDirection: 'column', gap: 8 },
  item: { background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', overflow: 'hidden' },
  header: { width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 18px', background: 'none', border: 'none', cursor: 'pointer' },
  left: { display: 'flex', alignItems: 'center' },
  right: { display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 },
  itemTitle: { fontSize: 15, fontWeight: 600, color: 'var(--text)', textAlign: 'left' },
  chevron: { fontSize: 11, color: 'var(--text-light)' },
  body: { padding: '0 18px 18px', borderTop: '1px solid var(--border)' },
  struct: { margin: '14px 0 8px', fontSize: 13 },
  structLabel: { color: 'var(--text-muted)', fontWeight: 600 },
  code: { fontFamily: 'var(--font-mono)', fontSize: 12, background: 'var(--bg)', padding: '2px 6px', borderRadius: 4, color: 'var(--navy)' },
  use: { fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.5, marginBottom: 12 },
  exLabel: { fontSize: 11, fontWeight: 600, letterSpacing: '.07em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 8 },
  example: { display: 'flex', gap: 8, padding: '6px 10px', background: '#f0f7ff', borderRadius: 6, borderLeft: '3px solid var(--accent)', marginBottom: 5 },
  dot: { color: 'var(--accent)', fontWeight: 600, flexShrink: 0 },
  exText: { fontSize: 13, fontStyle: 'italic', color: 'var(--text)', lineHeight: 1.5 },
}
