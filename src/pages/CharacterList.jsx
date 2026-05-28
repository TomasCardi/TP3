import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'; //  AGREGÁ ESTA LÍNEA
import CharacterCard from '../componentes/CharacterCard';
import Loading from '../componentes/Loading';
import ErrorMessage from '../componentes/ErrorMessage';

const CharacterList = () => {
  const [characters, setCharacters] = useState([]);
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCharacters = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(`https://rickandmortyapi.com/api/character?page=${page}&status=${status}`);
        setCharacters(response.data.results);
      } catch (err) {
        setError('No se encontraron personajes.');
      } finally {
        setLoading(false);
      }
    };

    fetchCharacters();
  }, [page, status]);

  if (loading) return <Loading />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div>
      <h2>Personajes</h2>
      
      {/* Filtros */}
      <select value={status} onChange={(e) => { setStatus(e.target.value); setPage(1); }}>
        <option value="">Todos los estados</option>
        <option value="alive">Vivo</option>
        <option value="dead">Muerto</option>
        <option value="unknown">Desconocido</option>
      </select>

      {/* Grid de Personajes */}
      <div className="grid">
        {characters.map(char => (
          <CharacterCard key={char.id} character={char} />
        ))}
      </div>

      {/* Paginación */}
      <div className="pagination">
        <button onClick={() => setPage(p => Math.max(p - 1, 1))} disabled={page === 1}>Anterior</button>
        <span>Página {page}</span>
        <button onClick={() => setPage(p => p + 1)}>Siguiente</button>
      </div>
    </div>
  );
};

export default CharacterList;