import Link from 'next/link';
import { logoutAction } from '@/app/actions/authActions';

export default function Navbar() {
  return (
    <nav className="glass-panel" style={{ 
      margin: '1rem', 
      padding: '0.8rem 2rem', 
      display: 'flex', 
      gap: '1rem', 
      justifyContent: 'space-between', 
      alignItems: 'center',
      flexWrap: 'wrap',
      position: 'sticky',
      top: '1rem',
      zIndex: 100
    }}>
      <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <div style={{ width: '32px', height: '32px', background: 'var(--accent)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', color: 'black' }}>S</div>
        <span style={{ fontWeight: '800', letterSpacing: '2px', color: 'white', fontSize: '1.1rem' }}>STARS</span>
      </Link>

      <div style={{ display: 'flex', gap: '0.8rem', alignItems: 'center', flexWrap: 'wrap' }}>
        <Link href="/musician/schedule" className="btn btn-outline" style={{ fontSize: '0.8rem' }}>Calendario</Link>
        <div style={{ width: '1px', height: '24px', background: 'var(--glass-border)', margin: '0 0.5rem' }}></div>
        <Link href="/admin/scheduling" className="btn btn-primary" style={{ fontSize: '0.8rem' }}>Programar</Link>
        <Link href="/admin/musicians" className="btn btn-outline" style={{ fontSize: '0.8rem' }}>Músicos</Link>
        <Link href="/admin/instruments" className="btn btn-outline" style={{ fontSize: '0.8rem' }}>Instrumentos</Link>
        <Link href="/admin/songs" className="btn btn-outline" style={{ fontSize: '0.8rem' }}>Canciones</Link>
        <form action={logoutAction} style={{ marginLeft: '1rem' }}>
          <button type="submit" className="btn" style={{ fontSize: '0.8rem', background: 'rgba(255, 77, 77, 0.1)', color: '#ff4d4d', border: '1px solid rgba(255, 77, 77, 0.2)', padding: '0.5rem 1rem' }}>Salir</button>
        </form>
      </div>
    </nav>
  );
}
