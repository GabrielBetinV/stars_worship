import { getSongsAction, createSongAction } from '@/app/actions/songActions';
import Navbar from '@/presentation/components/Navbar';

export const dynamic = 'force-dynamic';

export default async function SongsPage() {
  const songs = await getSongsAction();

  return (
    <div className="app-container">
      <Navbar />
      <h1>Repertorio de Canciones</h1>
      
      <div className="dashboard-grid">
        <section className="glass-panel">
          <h2>Ingresar Canción</h2>
          <form action={createSongAction} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <input name="name" placeholder="Nombre de la canción" required className="btn btn-outline" style={{ background: 'rgba(0,0,0,0.2)' }} />
            <input name="key" placeholder="Tonalidad (ej: G, Dm)" required className="btn btn-outline" style={{ background: 'rgba(0,0,0,0.2)' }} />
            <input name="youtubeUrl" placeholder="Enlace YouTube" className="btn btn-outline" style={{ background: 'rgba(0,0,0,0.2)' }} />
            <button type="submit" className="btn btn-primary">Agregar</button>
          </form>
        </section>

        <section className="glass-panel">
          <h2>Listado de Canciones</h2>
          <div className="list-container">
            {songs.map(song => (
              <div key={song.id} className="list-item">
                <div>
                  <div style={{ fontWeight: '600' }}>{song.name}</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--accent)' }}>Tonalidad: {song.key}</div>
                </div>
                {song.youtubeUrl && (
                  <a href={song.youtubeUrl} target="_blank" rel="noreferrer" className="btn btn-outline" style={{ fontSize: '0.7rem' }}>
                    Ver en YouTube
                  </a>
                )}
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
