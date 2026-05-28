import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getEpisodeById } from '../services/api';
import Loading from '../componentes/Loading';
import ErrorMessage from '../componentes/ErrorMessage';

const EpisodeDetail = () => {
  const { id } = useParams();
  const [episode, setEpisode] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEpisode = async () => {
      try {
        const response = await getEpisodeById(id);
        setEpisode(response.data);
      } catch (err) {
        setError('Error al cargar el episodio.');
      } finally {
        setLoading(false);
      }
    };
    fetchEpisode();
  }, [id]);

  if (loading) return <Loading />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div>
      <h1>{episode.name}</h1>
      <p><strong>Fecha de emisión:</strong> {episode.air_date}</p>
      <p><strong>Código de episodio:</strong> {episode.episode}</p>

      <h3>Personajes en este episodio:</h3>
      <ul>
        {episode.characters.map((charUrl) => {
          const charId = charUrl.split('/').pop();
          return (
            <li key={charId}>
              <Link to={`/character/${charId}`}>Ver Personaje {charId}</Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default EpisodeDetail;