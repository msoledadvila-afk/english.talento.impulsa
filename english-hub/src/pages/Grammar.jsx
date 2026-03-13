import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const GRAMMAR = [
  {
    id: 'nouns', title: 'Nouns', level: 'A1', emoji: '🔤',
    desc: 'A noun is a word that names a person, place, thing, or idea.',
    rules: [
      'Countable nouns can be singular or plural: cat → cats, box → boxes.',
      'Uncountable nouns have no plural: water, information, advice.',
      'Proper nouns are always capitalised: London, Maria, Monday.',
    ],
    examples: ['The doctor gave the patient some advice.', 'I need some information about the buses.', 'Children learn quickly.'],
  },
  {
    id: 'articles', title: 'Articles', level: 'A1', emoji: '🔠',
    desc: 'Articles (a, an, the) indicate whether a noun is specific or general.',
    rules: [
      'Use "a" before consonant sounds: a book, a university.',
      'Use "an" before vowel sounds: an apple, an hour.',
      'Use "the" when the noun is specific or already mentioned.',
      'No article with uncountable or plural nouns used generally: Water is life.',
    ],
    examples: ['I saw a cat. The cat was black.', 'She is an engineer.', 'Life is beautiful.'],
  },
  {
    id: 'adjectives', title: 'Adjectives', level: 'A2', emoji: '🌈',
    desc: 'Adjectives describe or modify nouns.',
    rules: [
      'Adjectives usually come before the noun: a beautiful city.',
      'Comparative: add -er or use "more": faster, more expensive.',
      'Superlative: add -est or use "most": the fastest, the most expensive.',
      'Order of adjectives: opinion – size – age – shape – colour – origin – material.',
    ],
    examples: ['She drives a small red Italian car.', 'This is the most interesting book I have ever read.', 'He is taller than his brother.'],
  },
  {
    id: 'modal-verbs', title: 'Modal Verbs', level: 'B1', emoji: '🎛️',
    desc: 'Modal verbs express ability, possibility, permission, obligation or advice.',
    rules: [
      'Can / could → ability or possibility: I can swim. Could you help me?',
      'Must / have to → obligation: You must wear a seatbelt.',
      'Should / ought to → advice: You should see a doctor.',
      'May / might → possibility: It might rain tonight.',
      'Would → polite requests or hypothetical: Would you like some tea?',
    ],
    examples: ['You must hand in the assignment by Friday.', 'She might be late because of the traffic.', 'Could I borrow your pen?'],
  },
  {
    id: 'conditionals', title: 'Conditionals', level: 'B1', emoji: '🔀',
    desc: 'Conditionals describe the result of something that might happen.',
    rules: [
      'Zero conditional: general truths – If you heat water, it boils.',
      'First conditional: real future possibility – If it rains, I will stay home.',
      'Second conditional: unreal present/future – If I had more time, I would travel.',
      'Third conditional: unreal past – If I had studied, I would have passed.',
    ],
    examples: ['If you press this button, the door opens.', 'If I win the lottery, I will buy a house.', 'If she had called earlier, we could have met.'],
  },
  {
    id: 'passive-voice', title: 'Passive Voice', level: 'B2', emoji: '🔄',
    desc: 'The passive voice is used when the action is more important than who does it.',
    rules: [
      'Structure: subject + be (conjugated) + past participle.',
      'Present simple: The report is written every month.',
      'Past simple: The window was broken last night.',
      'Use "by" to mention the agent: The building was designed by a famous architect.',
    ],
    examples: ['The new law was passed by parliament.', 'Mistakes were made during the project.', 'The package will be delivered tomorrow.'],
  },
  {
    id: 'reported-speech', title: 'Reported Speech', level: 'B2', emoji: '🗣️',
    desc: 'Reported speech conveys what someone said without quoting them directly.',
    rules: [
      'Statements: shift tense back one step – "I am tired" → He said he was tired.',
      'Questions: use ask + if/whether for yes/no – "Are you coming?" → She asked if I was coming.',
      'Commands: use tell + infinitive – "Close the door" → He told me to close the door.',
      'Pronouns and time expressions also change: now → then, today → that day.',
    ],
    examples: ['"I will call you." → She said she would call me.', '"Did you finish?" → He asked if I had finished.', '"Don\'t be late." → She told him not to be late.'],
  },
  {
    id: 'gerunds-infinitives', title: 'Gerunds & Infinitives', level: 'B2', emoji: '⚙️',
    desc: 'Some verbs are followed by a gerund (verb+ing), others by an infinitive (to+verb).',
    rules: [
      'Gerund after: enjoy, avoid, mind, suggest, finish, keep – I enjoy swimming.',
      'Infinitive after: want, decide, hope, plan, manage, offer – She decided to leave.',
      'Some verbs take both with different meanings: stop, remember, try, forget.',
      'Stop + gerund = quit; Stop + infinitive = pause to do something else.',
    ],
    examples: ['I avoid eating fast food.', 'He decided to study abroad.', 'She stopped to talk to me. (paused)', 'She stopped talking. (quit)'],
  },
]

export default function Grammar() {
  const navigate = useNavigate()
  const [open, setOpen] = useState(null)

  return (
    <div className="container">
      <div style={s.top}>
        <button className="back-btn" onClick={() => navigate('/')}>← Back</button>
        <h1 style={s.title}>📖 Grammar</h1>
        <p style={s.sub}>Tap a topic to expand the rules and examples</p>
      </div>

      <div style={s.list}>
        {GRAMMAR.map(item => (
          <div key={item.id} style={s.item}>
            <button style={s.header} onClick={() => setOpen(open === item.id ? null : item.id)}>
              <span style={s.headerLeft}>
                <span style={s.itemEmoji}>{item.emoji}</span>
                <span style={s.itemTitle}>{item.title}</span>
              </span>
              <span style={s.headerRight}>
                <span className={`level-badge level-${item.level}`}>{item.level}</span>
                <span style={s.chevron}>{open === item.id ? '▲' : '▼'}</span>
              </span>
            </button>

            {open === item.id && (
              <div style={s.body}>
                <p style={s.desc}>{item.desc}</p>

                <div style={s.section}>
                  <div style={s.sectionLabel}>Rules</div>
                  <ul style={s.ruleList}>
                    {item.rules.map((r, i) => (
                      <li key={i} style={s.rule}>{r}</li>
                    ))}
                  </ul>
                </div>

                <div style={s.section}>
                  <div style={s.sectionLabel}>Examples</div>
                  {item.examples.map((ex, i) => (
                    <div key={i} style={s.example}>
                      <span style={s.exDot}>→</span>
                      <span style={s.exText}>{ex}</span>
                    </div>
                  ))}
                </div>
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
  header: { width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 18px', background: 'none', border: 'none', cursor: 'pointer', gap: 12 },
  headerLeft: { display: 'flex', alignItems: 'center', gap: 10 },
  headerRight: { display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 },
  itemEmoji: { fontSize: 18 },
  itemTitle: { fontSize: 15, fontWeight: 600, color: 'var(--text)', textAlign: 'left' },
  chevron: { fontSize: 11, color: 'var(--text-light)' },
  body: { padding: '0 18px 18px', borderTop: '1px solid var(--border)' },
  desc: { fontSize: 14, color: 'var(--text-muted)', margin: '14px 0 12px', lineHeight: 1.6 },
  section: { marginBottom: 14 },
  sectionLabel: { fontSize: 11, fontWeight: 600, letterSpacing: '.07em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 8 },
  ruleList: { paddingLeft: 18, display: 'flex', flexDirection: 'column', gap: 5 },
  rule: { fontSize: 13, color: 'var(--text)', lineHeight: 1.5 },
  example: { display: 'flex', gap: 8, padding: '6px 10px', background: '#f0f7ff', borderRadius: 6, borderLeft: '3px solid var(--accent)', marginBottom: 5 },
  exDot: { color: 'var(--accent)', fontWeight: 600, flexShrink: 0 },
  exText: { fontSize: 13, fontStyle: 'italic', color: 'var(--text)', lineHeight: 1.5 },
}
