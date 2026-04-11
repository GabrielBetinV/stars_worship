import { getMusiciansAction, createMusicianAction, deleteMusicianAction, toggleMusicianStatusAction } from '@/app/actions/musicianActions';
import { getInstrumentsAction } from '@/app/actions/instrumentActions';
import Navbar from '@/presentation/components/Navbar';
import { MusicianStatus } from '@/domain/entities/Musician';

export const dynamic = 'force-dynamic';

export default async function MusiciansPage() {
  const musicians = await getMusiciansAction();
  const instruments = await getInstrumentsAction();

  return (
    <div className="app-container">
      <Navbar />
      <h1>Gestión de Músicos</h1>
      
      <div className="dashboard-grid">
        <section className="glass-panel">
          <h2>Nuevo Músico</h2>
          <form action={createMusicianAction} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <input 
              name="name" 
              placeholder="Nombre completo" 
              required 
              className="btn btn-outline"
              style={{ width: '100%', background: 'rgba(0,0,0,0.2)' }}
            />
            <select name="instrumentId" className="btn btn-outline" style={{ width: '100%', background: 'rgba(0,0,0,0.2)' }}>
              {instruments.map(inst => (
                <option key={inst.id} value={inst.id} style={{ background: '#1a1b26' }}>{inst.name}</option>
              ))}
            </select>
            <button type="submit" className="btn btn-primary">Registrar</button>
          </form>
        </section>

        <section className="glass-panel">
          <h2>Músicos Registrados</h2>
          <div className="list-container">
            {musicians.map(m => (
              <div key={m.id} className="list-item">
                <div>
                  <div style={{ fontWeight: '600' }}>{m.name}</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                    Instrumento ID: {m.instrumentId}
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <form action={toggleMusicianStatusAction.bind(null, m.id)}>
                    <button type="submit" className={`badge ${m.status === MusicianStatus.ACTIVE ? 'badge-gold' : 'badge-purple'}`} style={{ border: 'none', cursor: 'pointer' }}>
                      {m.status}
                    </button>
                  </form>
                  <form action={deleteMusicianAction.bind(null, m.id)}>
                    <button type="submit" className="btn btn-outline" style={{ color: '#fc8181', padding: '0.5rem' }}>×</button>
                  </form>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
