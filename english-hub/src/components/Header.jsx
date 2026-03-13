import { Link, useLocation, useNavigate } from 'react-router-dom'

const styles = {
  header: {
    background: 'var(--navy)',
    borderBottom: '1px solid var(--navy-mid)',
    position: 'sticky',
    top: 0,
    zIndex: 100,
  },
  inner: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 'var(--header-h)',
  },
  brandWrap: {
    display: 'flex',
    flexDirection: 'column',
    gap: 1,
  },
  brandTop: {
    fontSize: 10,
    fontWeight: 600,
    letterSpacing: '.1em',
    textTransform: 'uppercase',
    color: '#6fa8dc',
  },
  brandName: {
    fontFamily: 'var(--font-display)',
    fontSize: 19,
    fontWeight: 600,
    color: '#ffffff',
    lineHeight: 1.1,
  },
  brandSub: {
    fontSize: 10,
    color: '#4a7ca8',
    letterSpacing: '.06em',
    textTransform: 'uppercase',
  },
  nav: {
    display: 'flex',
    alignItems: 'center',
    gap: 4,
  },
  favLink: {
    display: 'flex',
    alignItems: 'center',
    gap: 5,
    padding: '6px 12px',
    borderRadius: 'var(--radius-sm)',
    fontSize: 13,
    fontWeight: 500,
    color: '#9FC8F0',
    border: '1px solid #2a4a6a',
    transition: 'all .15s',
    textDecoration: 'none',
  },
}

export default function Header() {
  const location = useLocation()

  return (
    <header style={styles.header}>
      <div className="container" style={styles.inner}>
        <Link to="/" style={{ textDecoration: 'none' }}>
          <div style={styles.brandWrap}>
            <span style={styles.brandTop}>Talento Impulsa Consulting</span>
            <span style={styles.brandName}>English Hub</span>
            <span style={styles.brandSub}>English Learning Platform</span>
          </div>
        </Link>

        <nav style={styles.nav}>
          <Link
            to="/favorites"
            style={{
              ...styles.favLink,
              background: location.pathname === '/favorites' ? '#1a3358' : 'transparent',
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill={location.pathname === '/favorites' ? '#f59e0b' : 'none'} stroke={location.pathname === '/favorites' ? '#f59e0b' : '#9FC8F0'} strokeWidth="2">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
            </svg>
            Favorites
          </Link>
        </nav>
      </div>
    </header>
  )
}
