import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const FORMATS = [
  {
    id: 'formal-email', title: 'Formal Email', emoji: '📧', level: 'B1',
    structure: ['Subject line: clear and concise', 'Opening: Dear Mr/Ms [Surname],', 'Introduction: state the reason for writing', 'Body: explain in detail', 'Request or action needed', 'Closing: Yours sincerely, / Kind regards,'],
    keyPhrases: ['I am writing to enquire about…', 'I would be grateful if you could…', 'Please find attached…', 'I look forward to hearing from you.', 'Please do not hesitate to contact me.'],
    example: 'Subject: Enquiry about English Courses\n\nDear Ms García,\n\nI am writing to enquire about the availability of English conversation courses starting in September. Could you please send me information about the schedule and fees?\n\nI look forward to hearing from you.\n\nYours sincerely,\nJohn Smith',
  },
  {
    id: 'informal-email', title: 'Informal Email', emoji: '✉️', level: 'A2',
    structure: ['Opening: Hi / Hello [first name],', 'Ask how they are', 'Reason for writing', 'Main message', 'Closing thought', 'Sign off: Take care / Best / Bye for now,'],
    keyPhrases: ['How are you? / How have you been?', 'I\'m writing to let you know…', 'Guess what!', 'I was wondering if…', 'Hope to hear from you soon!'],
    example: 'Hi Laura,\n\nHow are you? I\'m writing to let you know that I\'ll be in London next month. I was wondering if you\'d like to meet up for coffee?\n\nHope to hear from you soon!\n\nBye for now,\nMaria',
  },
  {
    id: 'report', title: 'Report', emoji: '📄', level: 'B2',
    structure: ['Title / Heading', 'Introduction: purpose of the report', 'Findings: present data and facts', 'Conclusion: summarise findings', 'Recommendations: suggest actions'],
    keyPhrases: ['The aim of this report is to…', 'The data shows that…', 'It is worth noting that…', 'In conclusion, …', 'It is recommended that…', 'Overall, the results suggest…'],
    example: 'Report on Staff Training Needs\n\nIntroduction\nThe aim of this report is to assess the current training needs of staff.\n\nFindings\nThe data shows that 70% of employees feel they need more digital skills training.\n\nConclusion\nOverall, the results suggest that immediate action is needed in this area.\n\nRecommendations\nIt is recommended that a digital training programme be introduced by Q1.',
  },
  {
    id: 'essay', title: 'Essay (For & Against)', emoji: '📝', level: 'B2',
    structure: ['Introduction: introduce the topic and state there are two sides', 'Arguments for: 2–3 points with examples', 'Arguments against: 2–3 points with examples', 'Conclusion: your balanced view or final recommendation'],
    keyPhrases: ['There are strong arguments both for and against…', 'On the one hand, …', 'On the other hand, …', 'Furthermore, …', 'However, it could be argued that…', 'In conclusion, …', 'Weighing up both sides, …'],
    example: 'Should remote work be permanent?\n\nIntroduction\nRemote work has become common since the pandemic. There are strong arguments both for and against making it permanent.\n\nOn the one hand, it saves commuting time and increases flexibility. Furthermore, studies show productivity often improves.\n\nOn the other hand, it can lead to isolation. Moreover, collaboration may suffer.\n\nIn conclusion, a hybrid model seems to offer the best solution.',
  },
  {
    id: 'application', title: 'Letter of Application', emoji: '🗂️', level: 'C1',
    structure: ['Opening: Dear [Name] / Hiring Manager,', 'Paragraph 1: why you are writing and the position', 'Paragraph 2: your skills and experience', 'Paragraph 3: why this company / role', 'Closing: request for interview, sign off'],
    keyPhrases: ['I am writing to apply for the position of…', 'I have X years of experience in…', 'I am particularly drawn to this role because…', 'I believe my skills in X make me a strong candidate.', 'I would welcome the opportunity to discuss my application.'],
    example: 'Dear Hiring Manager,\n\nI am writing to apply for the position of Marketing Coordinator advertised on your website. I have three years of experience in digital marketing and content creation.\n\nI am particularly drawn to this role because of your company\'s focus on sustainability. I believe my skills in SEO and campaign management make me a strong candidate.\n\nI would welcome the opportunity to discuss my application at your convenience.\n\nYours sincerely,\nAna Gómez',
  },
  {
    id: 'review', title: 'Review', emoji: '⭐', level: 'B1',
    structure: ['Introduction: name the product/place/film and give a general impression', 'Description: what it is about / what you experienced', 'Evaluation: strengths and weaknesses', 'Conclusion: overall recommendation'],
    keyPhrases: ['Overall, I was impressed by…', 'One of the highlights was…', 'On the downside, …', 'I would definitely recommend…', 'I would not hesitate to recommend…', 'All things considered, …'],
    example: 'The Grand Hotel — ★★★★☆\n\nI recently stayed at The Grand Hotel in the city centre and overall I was very impressed.\n\nThe rooms were spacious and the staff were extremely helpful. One of the highlights was the rooftop restaurant with stunning views.\n\nOn the downside, the Wi-Fi was slow and parking was limited.\n\nAll things considered, I would definitely recommend this hotel for a city break.',
  },
]

export default function Writing() {
  const navigate = useNavigate()
  const [selected, setSelected] = useState(null)
  const item = FORMATS.find(f => f.id === selected)

  return (
    <div className="container">
      <div style={s.top}>
        <button className="back-btn" onClick={() => navigate('/')}>← Back</button>
        <h1 style={s.title}>✍️ Writing</h1>
        <p style={s.sub}>Templates, structure and key phrases for every written format</p>
      </div>

      {!selected ? (
        <div style={s.grid}>
          {FORMATS.map(f => (
            <button key={f.id} onClick={() => setSelected(f.id)} style={s.card}>
              <span style={s.emoji}>{f.emoji}</span>
              <span style={s.cardTitle}>{f.title}</span>
              <span className={`level-badge level-${f.level}`}>{f.level}</span>
            </button>
          ))}
        </div>
      ) : (
        <div>
          <button className="back-btn" onClick={() => setSelected(null)} style={{ marginBottom: 16 }}>
            ← All formats
          </button>

          <div style={s.detail}>
            <div style={s.detailHeader}>
              <span style={s.detailEmoji}>{item.emoji}</span>
              <div>
                <h2 style={s.detailTitle}>{item.title}</h2>
                <span className={`level-badge level-${item.level}`}>{item.level}</span>
              </div>
            </div>

            <div style={s.block}>
              <div style={s.blockLabel}>Structure</div>
              {item.structure.map((step, i) => (
                <div key={i} style={s.step}>
                  <span style={s.stepNum}>{i + 1}</span>
                  <span style={s.stepText}>{step}</span>
                </div>
              ))}
            </div>

            <div style={s.block}>
              <div style={s.blockLabel}>Key phrases</div>
              <div style={s.phraseGrid}>
                {item.keyPhrases.map((p, i) => (
                  <div key={i} style={s.phrase}>{p}</div>
                ))}
              </div>
            </div>

            <div style={s.block}>
              <div style={s.blockLabel}>Example</div>
              <pre style={s.example}>{item.example}</pre>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

const s = {
  top: { padding: '24px 0 20px', borderBottom: '1px solid var(--border)', marginBottom: 24 },
  title: { fontFamily: 'var(--font-display)', fontSize: 26, fontWeight: 600, color: 'var(--navy)', marginTop: 4, marginBottom: 4 },
  sub: { fontSize: 13, color: 'var(--text-muted)' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 10 },
  card: { background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: '18px 14px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, cursor: 'pointer', transition: 'all .15s' },
  emoji: { fontSize: 28 },
  cardTitle: { fontSize: 14, fontWeight: 600, color: 'var(--text)' },
  detail: { background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: '20px', display: 'flex', flexDirection: 'column', gap: 20 },
  detailHeader: { display: 'flex', alignItems: 'center', gap: 14 },
  detailEmoji: { fontSize: 32 },
  detailTitle: { fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 600, color: 'var(--navy)', marginBottom: 6 },
  block: {},
  blockLabel: { fontSize: 11, fontWeight: 600, letterSpacing: '.07em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 10 },
  step: { display: 'flex', gap: 10, alignItems: 'flex-start', marginBottom: 7 },
  stepNum: { minWidth: 22, height: 22, borderRadius: '50%', background: 'var(--accent-bg)', color: 'var(--accent-dark)', fontSize: 11, fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 },
  stepText: { fontSize: 13, color: 'var(--text)', lineHeight: 1.5, paddingTop: 3 },
  phraseGrid: { display: 'flex', flexDirection: 'column', gap: 6 },
  phrase: { fontSize: 13, fontStyle: 'italic', color: 'var(--text)', padding: '7px 12px', background: '#f0f7ff', borderRadius: 6, borderLeft: '3px solid var(--accent)' },
  example: { fontSize: 12, fontFamily: 'var(--font-mono)', background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: '14px', lineHeight: 1.8, color: 'var(--text)', whiteSpace: 'pre-wrap', overflowX: 'auto' },
}
