import { signupAction } from '@/app/actions/authActions';
import Link from 'next/link';
import { UserRole } from '@/domain/entities/User';

export default function SignupPage() {
  return (
    <div className="app-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div className="hero-bg" style={{ backgroundImage: `url('/worship_youthful_hero.png')` }}></div>
      <section className="glass-panel" style={{ width: '100%', maxWidth: '450px', padding: '3rem' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>ÚNETE</h1>
        <p style={{ textAlign: 'center', color: 'var(--text-secondary)', marginBottom: '2.5rem' }}>Sé parte de la nueva era de alabanza</p>
        
        <form action={async (formData) => {
          'use server'
          await signupAction(formData);
        }} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <input name="email" type="email" placeholder="Email" required />
          <input name="password" type="password" placeholder="Contraseña" required />
          
          <input type="hidden" name="role" value={UserRole.MUSICIAN} />
          <div style={{ textAlign: 'center', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
            Te registrarás como <span style={{ color: 'var(--accent)', fontWeight: '700' }}>MÚSICO</span>
          </div>
          
          <button type="submit" className="btn btn-primary" style={{ height: '3.5rem', fontSize: '1.1rem' }}>
            CREAR CUENTA
          </button>
        </form>
        
        <p style={{ marginTop: '2rem', textAlign: 'center', fontSize: '0.9rem' }}>
          ¿Ya eres adorador? <Link href="/login" style={{ color: 'var(--accent)', fontWeight: '700' }}>INICIA SESIÓN</Link>
        </p>
      </section>
    </div>
  );
}
