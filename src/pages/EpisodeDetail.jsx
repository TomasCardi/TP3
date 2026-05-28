import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios'; 
import { getEpisodeById } from '../services/api';
import Loading from '../componentes/Loading';
import ErrorMessage from '../componentes/ErrorMessage';

const EpisodeDetail = () => {
  const { id } = useParams();
  const [episode, setEpisode] = useState(null);
  const [characters, setCharacters] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEpisodeAndCharacters = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // 1. Traemos los datos del episodio dinámicamente desde la API
        const response = await getEpisodeById(id);
        const episodeData = response.data;
        setEpisode(episodeData);

        // 2. Buscamos los datos reales (nombre, fotos, etc.) de los personajes
        if (episodeData.characters && episodeData.characters.length > 0) {
          // Creamos una lista de peticiones Axios por cada URL de personaje
          const characterPromises = episodeData.characters.map((url) => axios.get(url));
          // Resolvemos todas las peticiones al mismo tiempo de forma eficiente
          const responses = await Promise.all(characterPromises);
          // Guardamos solo la data de cada personaje en nuestro estado
          const charactersData = responses.map((res) => res.data);
          setCharacters(charactersData);
        }
      } catch (err) {
        console.error("Error al cargar datos:", err);
        setError('Error al cargar el episodio y sus personajes.');
      } finally {
        setLoading(false);
      }
    };

    fetchEpisodeAndCharacters();
  }, [id]);

  if (loading) return <Loading />;
  if (error) return <ErrorMessage message={error} />;
  if (!episode) return null;

  return (
    <div className="episode-detail-card" style={{ maxWidth: '800px', margin: '2rem auto', padding: '1.5rem' }}>
      
      {/* 💡 Mejorado: to={-1} te regresa inteligentemente a donde estabas antes (Home o Buscador de Episodios) */}
      <Link to={-1} style={{ display: 'inline-block', marginBottom: '1rem', color: '#97ce4c', textDecoration: 'none' }}>
        ← Volver atrás
      </Link>

      {/* Título e Información del episodio real traído dinámicamente */}
      <h1 style={{ color: '#97ce4c', margin: '0.5rem 0' }}>{episode.name}</h1>
      <p style={{ margin: '0.4rem 0' }}><strong>Fecha de emisión:</strong> {episode.air_date}</p>
      <p style={{ margin: '0.4rem 0' }}><strong>Código de episodio:</strong> <span style={{ color: '#97ce4c' }}>{episode.episode}</span></p>

      <h3 style={{ marginTop: '2rem', marginBottom: '1rem', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '0.5rem' }}>
        Personajes en este episodio ({characters.length}):
      </h3>
      
      {/* Lista interactiva con estilos en línea de respaldo por si falla tu archivo CSS */}
      <ul className="episode-detail-card-list" style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        {characters.map((char) => (
          <li key={char.id} style={{ marginBottom: '0.75rem', backgroundColor: '#272a30', borderRadius: '8px', padding: '0.5rem 1rem' }}>
            <Link 
              to={`/character/${char.id}`} 
              className="episode-char-link" 
              style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', textDecoration: 'none' }}
            >
              {/* Estructura interna: Foto en miniatura + Nombre real */}
              <div className="char-row-info" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                {char.image && (
                  <img 
                    src={char.image} 
                    alt={char.name} 
                    className="char-mini-thumb" 
                    style={{ width: '45px', height: '45px', borderRadius: '50%', objectFit: 'cover', border: '2px solid #97ce4c' }} 
                  />
                )}
                <span style={{ color: '#fff', fontWeight: '500' }}>{char.name}</span>
              </div>
              
              {/* Texto de acción a la derecha */}
              <span className="detail-link-text" style={{ color: '#97ce4c', fontSize: '0.9rem' }}>Ver personaje →</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EpisodeDetail;