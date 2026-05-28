import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getCharacterById } from '../services/api';
import Loading from '../componentes/Loading';
import ErrorMessage from '../componentes/ErrorMessage';

const CharacterDetail = () => {
  const { id } = useParams(); // Captura el ID de la ruta dinámica
  const [character, setCharacter] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const response = await getCharacterById(id);
        setCharacter(response.data);
      } catch (err) {
        setError('Error al cargar los detalles del personaje.');
      } finally {
        setLoading(false);
      }
    };
    fetchDetail();
  }, [id]);

  if (loading) return <Loading />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="detail-card">
      <img src={character.image} alt={character.name} />
      <h1>{character.name}</h1>
      <p><strong>Especie:</strong> {character.species}</p>
      <p><strong>Estado:</strong> {character.status}</p>
      
      <h3>Episodios en los que aparece:</h3>
      <ul>
        {character.episode.map((epUrl) => {
          const epId = epUrl.split('/').pop(); // Extrae el ID de la URL del episodio
          return (
            <li key={epId}>
              <Link to={`/episode/${epId}`}>Episodio {epId}</Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default CharacterDetail;