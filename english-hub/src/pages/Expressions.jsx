import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const GROUPS = [
  {
    id: 'opinion', label: 'Giving an opinion', emoji: '💡',
    expressions: [
      { phrase: 'In my opinion, …', note: 'Neutral, used in writing and speaking' },
      { phrase: 'I think / I believe …', note: 'Common and natural' },
      { phrase: 'As far as I\'m concerned, …', note: 'Formal' },
      { phrase: 'From my point of view, …', note: 'Formal / written' },
      { phrase: 'Personally, I feel that …', note: 'Emphasises your view' },
    ],
  },
  {
    id: 'agree', label: 'Agreeing & Disagreeing', emoji: '🤝',
    expressions: [
      { phrase: 'I completely agree with you.', note: 'Strong agreement' },
      { phrase: 'You have a point there.', note: 'Partial agreement' },
      { phrase: 'I\'m afraid I disagree.', note: 'Polite disagreement' },
      { phrase: 'I see your point, but …', note: 'Polite counter-argument' },
      { phrase: 'That\'s a fair point, however …', note: 'Acknowledges before contradicting' },
    ],
  },
  {
    id: 'suggest', label: 'Making suggestions', emoji: '💬',
    expressions: [
      { phrase: 'Why don\'t we …?', note: 'Informal, friendly' },
      { phrase: 'How about + verb-ing?', note: 'Casual suggestion' },
      { phrase: 'We could always …', note: 'Soft suggestion' },
      { phrase: 'Have you thought about …?', note: 'Invites reflection' },
      { phrase: 'It might be worth + verb-ing', note: 'Careful, measured suggestion' },
    ],
  },
  {
    id: 'clarify', label: 'Asking for clarification', emoji: '❓',
    expressions: [
      { phrase: 'Sorry, could you repeat that?', note: 'Polite' },
      { phrase: 'What do you mean by …?', note: 'Asks for definition' },
      { phrase: 'Could you elaborate on that?', note: 'Formal — asks for more detail' },
      { phrase: 'Just to clarify, are you saying …?', note: 'Confirms understanding' },
      { phrase: 'I\'m not sure I follow you.', note: 'Polite confusion' },
    ],
  },
  {
    id: 'smalltalk', label: 'Small talk', emoji: '☕',
    expressions: [
      { phrase: 'How are you getting on?', note: 'British informal for "how are things?"' },
      { phrase: 'What have you been up to?', note: 'Casual, asks about recent activities' },
      { phrase: 'It\'s been a while!', note: 'Said when meeting someone after a long time' },
      { phrase: 'How\'s everything going?', note: 'General check-in' },
      { phrase: 'You look well!', note: 'Compliment used as a conversation opener' },
    ],
  },
  {
    id: 'formal', label: 'Formal communication', emoji: '📋',
    expressions: [
      { phrase: 'I am writing to enquire about …', note: 'Formal email opener' },
      { phrase: 'I would be grateful if …', note: 'Polite formal request' },
      { phrase: 'Please do not hesitate to contact me.', note: 'Standard email closing' },
      { phrase: 'I look forward to hearing from you.', note: 'Standard email sign-off' },
      { phrase: 'With reference to your email of …', note: 'Formal reply opener' },
    ],
  },
]

export default function Expressions() {
  const navigate = useNavigate()
  const [open, setOpen] = useState(null)

  return (
    <div className="container">
      <div style={s.top}>
        <button className="back-btn" onClick={() => navigate('/')}>← Back</button>
        <h1 style={s.title}>💬 Expressions</h1>
        <p style={s.sub}>Useful phrases grouped by communication context</p>
      </div>

      <div style={s.list}>
        {GROUPS.map(g => (
          <div key={g.id} style={s.item}>
            <button style={s.header} onClick={() => setOpen(open === g.id ? null : g.id)}>
              <span style={s.headerLeft}>
                <span style={s.emoji}>{g.emoji}</span>
                <span style={s.groupTitle}>{g.label}</span>
              </span>
              <span style={s.headerRight}>
                <span style={s.count}>{g.expressions.length} phrases</span>
                <span style={s.chev}>{open === g.id ? '▲' : '▼'}</span>
              </span>
            </button>

            {open === g.id && (
              <div style={s.body}>
                {g.expressions.map((ex, i) => (
                  <div key={i} style={s.exRow}>
                    <span style={s.phrase}>{ex.phrase}</span>
                    <span style={s.note}>{ex.note}</span>
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
  headerLeft: { display: 'flex', alignItems: 'center', gap: 10 },
  headerRight: { display: 'flex', alignItems: 'center', gap: 10 },
  emoji: { fontSize: 18 },
  groupTitle: { fontSize: 15, fontWeight: 600, color: 'var(--text)', textAlign: 'left' },
  count: { fontSize: 11, color: 'var(--text-light)' },
  chev: { fontSize: 11, color: 'var(--text-light)' },
  body: { borderTop: '1px solid var(--border)', padding: '10px 18px 14px', display: 'flex', flexDirection: 'column', gap: 8 },
  exRow: { display: 'flex', flexDirection: 'column', gap: 2, padding: '8px 12px', background: 'var(--bg)', borderRadius: 8 },
  phrase: { fontSize: 14, fontWeight: 500, color: 'var(--navy)', fontStyle: 'italic' },
  note: { fontSize: 12, color: 'var(--text-muted)' },
}
