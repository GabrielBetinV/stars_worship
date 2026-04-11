import { getUpcomingServicesAction, createServiceAction, deleteServiceAction } from '@/app/actions/schedulingActions';
import { getMusiciansAction } from '@/app/actions/musicianActions';
import { getSongsAction } from '@/app/actions/songActions';
import Navbar from '@/presentation/components/Navbar';

export const dynamic = 'force-dynamic';

export default async function SchedulingPage() {
  const [services, musicians, songs] = await Promise.all([
    getUpcomingServicesAction(),
    getMusiciansAction(),
    getSongsAction()
  ]);

  return (
    <div className="app-container">
      <Navbar />
      <h1>Programación de Servicios</h1>
      
      <div className="dashboard-grid">
        <section className="glass-panel">
          <h2>Nueva Fecha</h2>
          <form action={async (formData) => {
            'use server'
            await createServiceAction(formData);
          }} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <input type="date" name="date" required />
            
            <div style={{ padding: '1rem', background: 'rgba(0,0,0,0.2)', borderRadius: '12px', border: '1px solid var(--glass-border)' }}>
              <h3 style={{ fontSize: '1rem', marginBottom: '1rem', color: 'var(--accent)' }}>Asignar Banda</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', maxHeight: '250px', overflowY: 'auto', paddingRight: '0.5rem' }}>
                {musicians.filter(m => m.status === 'ACTIVE').map(m => (
                  <label key={m.id} style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', cursor: 'pointer', padding: '0.5rem', borderRadius: '8px', background: 'rgba(255,255,255,0.03)' }}>
                    <input type="checkbox" name="musicianIds" value={m.id} style={{ width: '18px', height: '18px', cursor: 'pointer' }} />
                    <span style={{ fontSize: '0.9rem' }}>{m.name} <span style={{ opacity: 0.5, fontSize: '0.8rem' }}>(Instrumento ID: {m.instrumentId})</span></span>
                  </label>
                ))}
              </div>
            </div>

            <div style={{ padding: '1rem', background: 'rgba(0,0,0,0.2)', borderRadius: '12px', border: '1px solid var(--glass-border)' }}>
              <h3 style={{ fontSize: '1rem', marginBottom: '1rem', color: 'var(--accent)' }}>Seleccionar Repertorio</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', maxHeight: '250px', overflowY: 'auto', paddingRight: '0.5rem' }}>
                {songs.map(s => (
                  <label key={s.id} style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', cursor: 'pointer', padding: '0.5rem', borderRadius: '8px', background: 'rgba(255,255,255,0.03)' }}>
                    <input type="checkbox" name="songIds" value={s.id} style={{ width: '18px', height: '18px', cursor: 'pointer' }} />
                    <span style={{ fontSize: '0.9rem' }}>{s.name} <span style={{ color: 'var(--primary)', fontWeight: '700' }}>[{s.key}]</span></span>
                  </label>
                ))}
              </div>
            </div>

            <button type="submit" className="btn btn-primary" style={{ padding: '1.2rem' }}>CREAR PROGRAMACIÓN</button>
          </form>
        </section>

        <section className="glass-panel">
          <h2>Próximos Servicios</h2>
          <div className="list-container">
            {services.map(service => (
              <div key={service.id} className="glass-panel fade-in" style={{ marginBottom: '1.5rem', background: 'rgba(139, 92, 246, 0.03)', borderLeft: '4px solid var(--accent)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <strong style={{ fontSize: '1.2rem', color: 'var(--accent)' }}>{new Date(service.date).toLocaleDateString()}</strong>
                  <form action={async () => {
                    'use server'
                    await deleteServiceAction(service.id);
                  }}>
                    <button type="submit" className="btn" style={{ color: '#fc8181', background: 'transparent' }}>Eliminar</button>
                  </form>
                </div>
                <div style={{ fontSize: '0.85rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <div><span style={{ opacity: 0.6 }}>BANDA:</span> {service.assignments.map(a => a.musician.name).join(', ')}</div>
                  <div><span style={{ opacity: 0.6 }}>CANCIONES:</span> {service.songs.map(s => s.song.name).join(', ')}</div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
