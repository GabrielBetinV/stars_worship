import { getMusiciansAction } from '@/app/actions/musicianActions';
import { getInstrumentsAction } from '@/app/actions/instrumentActions';
import Navbar from '@/presentation/components/Navbar';
import { MusicianStatus } from '@/domain/entities/Musician';

export const dynamic = 'force-dynamic';

export default async function MusicianDashboard() {
  const musicians = await getMusiciansAction();
  const instruments = await getInstrumentsAction();

  // Filtrar solo músicos activos para la banda
  const activeBand = musicians.filter(m => m.status === MusicianStatus.ACTIVE);

  return (
    <div className="app-container">
      <Navbar />
      <h1>Dashboard de la Banda</h1>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
        Vista de asignación actual para los músicos.
      </p>

      <section className="glass-panel" style={{ maxWidth: '800px', margin: '0 auto' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>Integrantes Activos</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
          {activeBand.map(m => {
            const inst = instruments.find(i => i.id === m.instrumentId);
            return (
              <div key={m.id} className="glass-panel" style={{ textAlign: 'center', background: 'rgba(107, 70, 193, 0.1)' }}>
                <div style={{ fontSize: '1.2rem', fontWeight: '700', color: 'var(--accent)' }}>{inst?.name || 'N/A'}</div>
                <div style={{ marginTop: '0.5rem', fontWeight: '500' }}>{m.name}</div>
              </div>
            )
          })}
        </div>
        {activeBand.length === 0 && (
          <p style={{ textAlign: 'center', color: 'var(--text-secondary)' }}>No hay músicos activos asignados en este momento.</p>
        )}
      </section>
    </div>
  );
}
