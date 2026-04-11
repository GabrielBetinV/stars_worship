import Link from 'next/link';

export default function Home() {
  return (
    <div className="app-container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '80vh' }}>
      <div className="hero-bg" style={{ backgroundImage: `url('/worship_youthful_hero.png')` }}></div>
      <div className="glass-panel fade-in" style={{ textAlign: 'center', maxWidth: '800px' }}>
        <h1 style={{ fontSize: '4rem', marginBottom: '1rem' }}>STARS WORSHIP</h1>
        <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', marginBottom: '3rem' }}>
          Gestión inteligente para bandas de alabanza que inspiran.
        </p>
        
        <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', justifyContent: 'center' }}>
          <Link href="/login" className="btn btn-primary" style={{ padding: '1.2rem 3rem', fontSize: '1.1rem' }}>
            Comenzar Ahora
          </Link>
        </div>
      </div>
    </div>
  );
}
