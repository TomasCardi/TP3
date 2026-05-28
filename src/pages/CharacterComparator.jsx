import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const CharacterComparator = () => {
  const [allCharacters, setAllCharacters] = useState([]);
  const [char1, setChar1] = useState(null);
  const [char2, setChar2] = useState(null);

  useEffect(() => {
    // Traemos los primeros 20 personajes para el selector básico
    axios.get('https://rickandmortyapi.com/api/character')
      .then(res => setAllCharacters(res.data.results))
      .catch(err => console.error(err));
  }, []);

  const fetchCharacter = async (id, setChar) => {
    if (!id) return setChar(null);
    const res = await axios.get(`https://rickandmortyapi.com/api/character/${id}`);
    setChar(res.data);
  };

  return (
    <div className="container">
      <Link to="/">← Volver al inicio</Link>
      <h2 style={{ textAlign: 'center', margin: '1.5rem 0', color: '#97ce4c' }}>⚔️ Comparador de Personajes (Versus)</h2>
      
      {/* Selectores */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', marginBottom: '2rem' }}>
        <select onChange={(e) => fetchCharacter(e.target.value, setChar1)}>
          <option value="">Seleccionar Personaje 1</option>
          {allCharacters.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
        </select>
        <select onChange={(e) => fetchCharacter(e.target.value, setChar2)}>
          <option value="">Seleccionar Personaje 2</option>
          {allCharacters.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
        </select>
      </div>

      {/* Panel Versus */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: '1.5rem', alignItems: 'start' }}>
        {/* Personaje 1 */}
        <div className="card" style={{ padding: '1rem', textAlign: 'center' }}>
          {char1 ? (
            <>
              <img src={char1.image} alt={char1.name} style={{ borderRadius: '0.5rem', width: '100%', height: '200px', objectFit: 'cover' }} />
              <h3>{char1.name}</h3>
              <p><strong>Estado:</strong> {char1.status === 'Alive' ? '🟢 Vivo' : '🔴 Muerto/Desconocido'}</p>
              <p><strong>Especie:</strong> {char1.species}</p>
              <p><strong>Género:</strong> {char1.gender}</p>
              <p><strong>Origen:</strong> {char1.origin.name}</p>
            </>
          ) : <p style={{ color: '#64748b' }}>Elige un personaje</p>}
        </div>

        {/* VS */}
        <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#97ce4c', alignSelf: 'center' }}>VS</div>

        {/* Personaje 2 */}
        <div className="card" style={{ padding: '1rem', textAlign: 'center' }}>
          {char2 ? (
            <>
              <img src={char2.image} alt={char2.name} style={{ borderRadius: '0.5rem', width: '100%', height: '200px', objectFit: 'cover' }} />
              <h3>{char2.name}</h3>
              <p><strong>Estado:</strong> {char2.status === 'Alive' ? '🟢 Vivo' : '🔴 Muerto/Desconocido'}</p>
              <p><strong>Especie:</strong> {char2.species}</p>
              <p><strong>Género:</strong> {char2.gender}</p>
              <p><strong>Origen:</strong> {char2.origin.name}</p>
            </>
          ) : <p style={{ color: '#64748b' }}>Elige un personaje</p>}
        </div>
      </div>
    </div>
  );
};

export default CharacterComparator;