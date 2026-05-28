import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios'; // 💡 Importamos axios para resolver las URLs de los episodios
import { getCharacterById } from '../services/api';
import Loading from '../componentes/Loading';
import ErrorMessage from '../componentes/ErrorMessage';

const CharacterDetail = () => {
  const { id } = useParams();
  const [character, setCharacter] = useState(null);
  const [episodes, setEpisodes] = useState([]); // 🔥 Estado nuevo para guardar los capítulos reales
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDetailAndEpisodes = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await axios.get(`https://rickandmortyapi.com/api/character/${id}`);
        const charData = response.data;
        setCharacter(charData);

        // (Luego se resuelven las promesas de los episodios en paralelo como ya hacías)
        if (charData.episode && charData.episode.length > 0) {
          const episodePromises = charData.episode.map((url) => axios.get(url));
          const episodeResponses = await Promise.all(episodePromises);
          setEpisodes(episodeResponses.map((res) => res.data));
        }
      } catch (err) {
        setError('Error al cargar los detalles.');
      } finally {
        setLoading(false);
      }
    };

    fetchDetailAndEpisodes();
  }, [id]);

  if (loading) return <Loading />;
  if (error) return <ErrorMessage message={error} />;
  if (!character) return null;

  return (
    <div className="detail-card"> 
      <img src={character.image} alt={character.name} />
      <h1>{character.name}</h1>
      <p><strong>Estado:</strong> {character.status} - {character.species}</p>
      <p><strong>Género:</strong> {character.gender}</p>
      <p><strong>Origen:</strong> {character.origin?.name}</p>
      <p><strong>Ubicación:</strong> {character.location?.name}</p>
      
      <Link to="/">← Volver al listado</Link>
      
      <h3>Episodios donde aparece 🎬</h3>
      <ul>
        {/* 💡 Modificado: Ahora mapeamos el array 'episodes' que tiene la info real de la API */}
        {episodes.map((ep) => (
          <li key={ep.id}>
            <Link to={`/episode/${ep.id}`}>
              {/* 🪐 Reemplazamos el texto fijo por el código y nombre real (Ej: S01E01 - Pilot) */}
              <span>🛸 {ep.episode} - {ep.name}</span>
              <span className="detail-link-text">Ver detalles del episodio</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CharacterDetail;