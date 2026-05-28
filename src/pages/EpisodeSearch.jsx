import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { getEpisodesByName } from '../services/api';

const EpisodeSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [episodes, setEpisodes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    
    // Si el usuario no escribió nada, no hace nada
    if (!searchTerm.trim()) return;

    setLoading(true);
    setError(null);
    setEpisodes([]); // Limpiamos resultados anteriores antes de buscar

    try {
      const response = await axios.get(`https://rickandmortyapi.com/api/episode/?name=${searchTerm.trim()}`);
      setEpisodes(response.data.results);
    } catch (err) {
      setError('No se encontraron episodios.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '700px', margin: '2rem auto', padding: '1rem', backgroundColor: '#1e2024', borderRadius: '8px', color: '#fff' }}>
      <Link to="/" style={{ color: '#97ce4c', textDecoration: 'none', display: 'inline-block', marginBottom: '1rem' }}>← Volver al inicio</Link>
      <h2 style={{ marginTop: '0.5rem', color: '#97ce4c' }}>🛸 Buscador de Episodios</h2>
      
      <form onSubmit={handleSearch} style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', marginTop: '1rem' }}>
        <input 
          type="text" 
          placeholder="Ej: Pilot, Rick, Anatomy..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            flexGrow: 1, 
            padding: '0.6rem 1rem', 
            borderRadius: '0.375rem',
            border: '1px solid rgba(255,255,255,0.2)', 
            backgroundColor: '#141517', 
            color: 'white',
            outline: 'none'
          }}
        />
        <button 
          type="submit" 
          style={{ 
            marginTop: 0, 
            padding: '0 1.5rem', 
            cursor: 'pointer', 
            backgroundColor: '#97ce4c', 
            color: '#141517', 
            border: 'none', 
            borderRadius: '0.375rem',
            fontWeight: 'bold' 
          }}
        >
          {loading ? 'Buscando...' : 'Buscar'}
        </button>
      </form>

      {loading && <p style={{ color: '#97ce4c', textAlign: 'center' }}>Cargando episodios...</p>}
      
      {error && <p style={{ color: '#ef4444', textAlign: 'center', margin: '1rem 0' }}>{error}</p>}

      <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        {episodes.map((ep) => (
          <li key={ep.id} style={{ marginBottom: '0.75rem', backgroundColor: '#272a30', borderRadius: '6px', padding: '0.75rem' }}>
            <Link to={`/episode/${ep.id}`} style={{ textDecoration: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <strong style={{ color: '#fff', fontSize: '1rem' }}>{ep.name}</strong>
                <p style={{ margin: '0.2rem 0 0 0', fontSize: '0.8rem', color: '#94a3b8' }}>{ep.episode} — {ep.air_date}</p>
              </div>
              <span style={{ color: '#97ce4c', fontSize: '0.9rem' }}>Ver detalles →</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EpisodeSearch;