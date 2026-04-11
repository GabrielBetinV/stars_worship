import { loginAction } from '@/app/actions/authActions';
import Link from 'next/link';

export default function LoginPage() {
  return (
    <div className="app-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div className="hero-bg" style={{ backgroundImage: `url('/worship_youthful_hero.png')` }}></div>
      <section className="glass-panel" style={{ width: '100%', maxWidth: '450px', padding: '3rem' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>BIENVENIDO</h1>
        <p style={{ textAlign: 'center', color: 'var(--text-secondary)', marginBottom: '2.5rem' }}>Ingresa a la experiencia Stars Worship</p>
        
        <form action={async (formData) => {
          'use server'
          await loginAction(formData);
        }} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div className="input-group">
            <input name="email" type="email" placeholder="Email de adorador" required />
          </div>
          <div className="input-group">
            <input name="password" type="password" placeholder="Contraseña segura" required />
          </div>
          <button type="submit" className="btn btn-primary" style={{ height: '3.5rem', fontSize: '1.1rem' }}>
            ENTRAR AL PANEL
          </button>
        </form>
        
        <p style={{ marginTop: '2rem', textAlign: 'center', fontSize: '0.9rem' }}>
          ¿Aún no eres parte? <Link href="/signup" style={{ color: 'var(--accent)', fontWeight: '700' }}>REGÍSTRATE</Link>
        </p>
      </section>
    </div>
  );
}
