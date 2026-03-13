const styles = {
  footer: {
    background: 'var(--navy)',
    borderTop: '1px solid var(--navy-mid)',
    marginTop: 'auto',
  },
  inner: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 4,
    padding: '20px 0',
    textAlign: 'center',
  },
  brand: {
    fontSize: 13,
    fontWeight: 600,
    color: '#6fa8dc',
    letterSpacing: '.04em',
  },
  copy: {
    fontSize: 11,
    color: '#3d5f80',
  },
}

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer style={styles.footer}>
      <div className="container" style={styles.inner}>
        <span style={styles.brand}>Talento Impulsa Consulting</span>
        <span style={styles.copy}>
          © {year} Talento Impulsa Consulting · All rights reserved · English Hub Platform
        </span>
      </div>
    </footer>
  )
}
