import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios'; // Importamos axios para traer los personajes en paralelo
import { getEpisodeById } from '../services/api';
import Loading from '../componentes/Loading';
import ErrorMessage from '../componentes/ErrorMessage';

const EpisodeDetail = () => {
  const { id } = useParams();
  const [episode, setEpisode] = useState(null);
  const [characters, setCharacters] = useState([]); // Estado nuevo para guardar los personajes reales
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEpisodeAndCharacters = async () => {
      try {
        setLoading(true);
        // 1. Traemos los datos del episodio usando tu servicio actual
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
    <div className="episode-detail-card">
      {/* Botón Volver estilizado */}
      <Link to="/" style={{ marginBottom: '1rem' }}>← Volver al listado</Link>

      {/* Título e Información del episodio */}
      <h1>{episode.name}</h1>
      <p><strong>Fecha de emisión:</strong> {episode.air_date}</p>
      <p><strong>Código de episodio:</strong> {episode.episode}</p>

      {/* Subtítulo de la sección */}
      <h3>Personajes en este episodio:</h3>
      
      {/* Lista interactiva moderna que engancha directo con tu index.css */}
      <ul className="episode-detail-card-list">
        {characters.map((char) => (
          <li key={char.id}>
            <Link to={`/character/${char.id}`} className="episode-char-link">
              {/* Estructura interna: Foto + Nombre */}
              <div className="char-row-info">
                {char.image && (
                  <img src={char.image} alt={char.name} className="char-mini-thumb" />
                )}
                <span>{char.name}</span>
              </div>
              {/* Texto de acción a la derecha */}
              <span className="detail-link-text">Ver personaje →</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EpisodeDetail;