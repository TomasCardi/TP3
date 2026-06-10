import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import CharacterCard from "../componentes/CharacterCard";
import Loading from "../componentes/Loading";
import ErrorMessage from "../componentes/ErrorMessage";

const CharacterList = () => {
  const [characters, setCharacters] = useState([]);
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState('');
  
  // 💡 NUEVO ESTADO: Para guardar lo que el usuario escribe en el buscador
  const [searchTerm, setSearchTerm] = useState('');
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCharacters = async () => {
      setLoading(true);
      setError(null);
      try {
        // 👈 COUPLING: Agregamos el parámetro '&name=' a la URL de Axios
        const response = await axios.get(
          `https://rickandmortyapi.com/api/character?page=${page}&status=${status}&name=${searchTerm.trim()}`
        );
        
        setCharacters(response.data.results);
      } catch (err) {
        console.error(err);
        // Si la API devuelve 404 porque no encontró el nombre, mostramos un aviso limpio
        setCharacters([]);
        setError('No se encontraron personajes con esos filtros.');
      } finally {
        setLoading(false);
      }
    };

    fetchCharacters();
    // 💡 IMPORTANTE: Cada vez que cambia el 'searchTerm', el useEffect se vuelve a ejecutar solo
  }, [page, status, searchTerm]);

  // Función para resetear la página a 1 cuando el usuario filtra o busca
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setPage(1); // Volvemos a la página 1 para evitar errores de paginación
  };

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
    setPage(1);
  };

  return (
    <div style={{ padding: '1rem' }}>
      <h1 style={{ textAlign: 'center', color: '#97ce4c' }}>Portal de Personajes</h1>

      {/* 🛠️ BARRA DE FILTROS (Buscador + Selector de Estado) */}
      <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginBottom: '2rem', flexWrap: 'wrap' }}>
        
        {/* INPUT DEL BUSCADOR */}
        <input 
          type="text" 
          placeholder="Buscar personaje por nombre... (Ej: Rick, Morty)" 
          value={searchTerm}
          onChange={handleSearchChange}
          style={{
            padding: '0.6rem 1rem',
            borderRadius: '0.375rem',
            border: '1px solid rgba(255,255,255,0.2)',
            backgroundColor: '#272a30',
            color: 'white',
            width: '300px',
            outline: 'none'
          }}
        />

        {/* SELECTOR DE ESTADO (Ya lo tenías) */}
        <select 
          value={status} 
          onChange={handleStatusChange}
          style={{
            padding: '0.6rem 1rem',
            borderRadius: '0.375rem',
            border: '1px solid rgba(255,255,255,0.2)',
            backgroundColor: '#272a30',
            color: 'white',
            outline: 'none'
          }}
        >
          <option value="">Todos los estados</option>
          <option value="alive">Vivo 🟢</option>
          <option value="dead">Muerto 🔴</option>
          <option value="unknown">Desconocido ⚪</option>
        </select>
      </div>

      {/* RENDERIZADO DE LA INTERFAZ */}
      {loading && <Loading />}
      
      {error && !loading && <ErrorMessage message={error} />}

      {!loading && !error && (
        <>
          <div className="character-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1.5rem' }}>
            {characters.map(char => (
              <CharacterCard key={char.id} character={char} />
            ))}
          </div>

          {/* PAGINACIÓN */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '2rem', alignItems: 'center' }}>
            <button 
              disabled={page === 1} 
              onClick={() => setPage(prev => prev - 1)}
              style={{ padding: '0.5rem 1rem', cursor: 'pointer' }}
            >
              Anterior
            </button>
            <span style={{ color: '#fff' }}>Página {page}</span>
            <button 
              disabled={characters.length < 20} 
              onClick={() => setPage(prev => prev + 1)}
              style={{ padding: '0.5rem 1rem', cursor: 'pointer' }}
            >
              Siguiente
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CharacterList;