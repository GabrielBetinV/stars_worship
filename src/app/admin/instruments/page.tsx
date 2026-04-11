import { getInstrumentsAction, createInstrumentAction, deleteInstrumentAction } from '@/app/actions/instrumentActions';
import Navbar from '@/presentation/components/Navbar';

export const dynamic = 'force-dynamic';

export default async function InstrumentsPage() {
  const instruments = await getInstrumentsAction();

  return (
    <div className="app-container">
      <Navbar />
      <h1>Gestión de Instrumentos</h1>
      
      <div className="dashboard-grid">
        <section className="glass-panel">
          <h2>Nuevo Instrumento</h2>
          <form action={createInstrumentAction} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <input 
              name="name" 
              placeholder="Nombre del instrumento (ej: Bajo, Guitarra)" 
              required 
              className="btn btn-outline"
              style={{ width: '100%', background: 'rgba(0,0,0,0.2)' }}
            />
            <button type="submit" className="btn btn-primary">Crear</button>
          </form>
        </section>

        <section className="glass-panel">
          <h2>Listado</h2>
          <div className="list-container">
            {instruments.map(inst => (
              <div key={inst.id} className="list-item">
                <span>{inst.name}</span>
                <form action={deleteInstrumentAction.bind(null, inst.id)}>
                  <button type="submit" className="btn" style={{ color: '#fc8181' }}>Eliminar</button>
                </form>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
