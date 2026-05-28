import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getCharacterById } from '../services/api';
import Loading from '../componentes/Loading';
import ErrorMessage from '../componentes/ErrorMessage';

const CharacterDetail = () => {
  const { id } = useParams();
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
  <div className="detail-card"> {/* 💡 ASEGURATE DE QUE ESTA CLASE ESTÉ ACÁ */}
    <img src={character.image} alt={character.name} />
    <h1>{character.name}</h1>
    <p><strong>Estado:</strong> {character.status} - {character.species}</p>
    <p><strong>Género:</strong> {character.gender}</p>
    <p><strong>Origen:</strong> {character.origin?.name}</p>
    <p><strong>Ubicación:</strong> {character.location?.name}</p>
    
    <Link to="/">← Volver al listado</Link>
    
    <h3>Episodios donde aparece 🎬</h3>
    <ul>
      {character.episode.map((epUrl) => {
        const epId = epUrl.split('/').pop();
        return (
          <li key={epId}>
            <Link to={`/episode/${epId}`}>
              <span>🛸 Episodio {epId}</span>
              <span className="detail-link-text">Ver detalles del episodio</span>
            </Link>
          </li>
        );
      })}
    </ul>
  </div>
);
}

export default CharacterDetail;