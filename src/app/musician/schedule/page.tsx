import { getUpcomingServicesAction } from '@/app/actions/schedulingActions';
import Link from 'next/link';
import Navbar from '@/presentation/components/Navbar';

export const dynamic = 'force-dynamic';

export default async function MusicianSchedulePage({
  searchParams,
}: {
  searchParams: Promise<{ date?: string }>;
}) {
  const { date } = await searchParams;
  let services = await getUpcomingServicesAction();

  // Filtrar si hay una fecha seleccionada
  if (date) {
    services = services.filter(s => new Date(s.date).toISOString().split('T')[0] === date);
  }

  return (
    <div className="app-container">
      <Navbar />
      
      <h1>Filtra tu Servicio</h1>
      
      <section className="glass-panel" style={{ maxWidth: '600px', margin: '0 auto 3rem auto', textAlign: 'center' }}>
        <h3 style={{ marginBottom: '1.5rem', color: 'var(--accent)' }}>Buscar por Fecha</h3>
        <form method="GET" style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
          <input 
            type="date" 
            name="date" 
            defaultValue={date}
            className="btn btn-outline" 
            style={{ width: '250px', background: 'rgba(0,0,0,0.2)' }} 
          />
          <button type="submit" className="btn btn-primary">Buscar</button>
          {date && (
            <Link href="/musician/schedule" className="btn btn-outline" style={{ display: 'flex' }}>Ver Todos</Link>
          )}
        </form>
      </section>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', maxWidth: '900px', margin: '0 auto' }}>
        {services.length === 0 && (
          <div className="glass-panel" style={{ textAlign: 'center', padding: '4rem' }}>
            <p style={{ color: 'var(--text-secondary)' }}>
              {date ? `No hay asignaciones para el ${new Date(date).toLocaleDateString()}` : 'No tienes servicios programados por ahora.'}
            </p>
          </div>
        )}
        
        {services.map(service => (
          <div key={service.id} className="glass-panel fade-in" style={{ borderLeft: '4px solid var(--primary)' }}>
            <div style={{ fontSize: '1.8rem', fontWeight: '800', color: 'var(--accent)', marginBottom: '1.5rem', textAlign: 'left', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span>{new Date(service.date).toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long' })}</span>
              <span style={{ fontSize: '0.8rem', opacity: 0.6 }}>{new Date(service.date).getFullYear()}</span>
            </div>
            
            <div className="dashboard-grid">
              <section>
                <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem', color: 'var(--primary)', fontWeight: '700' }}>BANDA ASIGNADA</h3>
                <div className="list-container">
                  {service.assignments.map((a, i) => (
                    <div key={i} className="list-item" style={{ background: 'rgba(139, 92, 246, 0.05)' }}>
                      <span style={{ fontWeight: '600', color: 'var(--text-primary)' }}>{a.musician.instrument.name}</span>
                      <span style={{ color: 'var(--accent)' }}>{a.musician.name}</span>
                    </div>
                  ))}
                </div>
              </section>

              <section>
                <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem', color: 'var(--primary)', fontWeight: '700' }}>REPERTORIO</h3>
                <div className="list-container">
                  {service.songs.map((s, i) => (
                    <div key={i} className="list-item" style={{ background: 'rgba(250, 204, 21, 0.05)' }}>
                      <div>
                        <div style={{ fontWeight: '700' }}>{s.song.name}</div>
                        <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Tono: {s.song.key}</div>
                      </div>
                      {s.song.youtubeUrl && (
                         <a href={s.song.youtubeUrl} target="_blank" rel="noreferrer" className="btn btn-outline" style={{ padding: '0.4rem', border: 'none' }}>
                           ▶️ Tutorial
                         </a>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
