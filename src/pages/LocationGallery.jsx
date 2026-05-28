import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getLocations } from '../services/api';
import Loading from '../componentes/Loading';

const LocationGallery = () => {
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getLocations(1)
      .then(res => {
        setLocations(res.data.results);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <Loading />;

  return (
    <div className="container">
      <Link to="/">← Volver al inicio</Link>
      <h2 style={{ margin: '1.5rem 0', color: '#97ce4c' }}>🌍 Galería de Locaciones y Planetas</h2>
      
      <div className="grid">
        {locations.map((loc) => (
          <div key={loc.id} className="card" style={{ minHeight: '280px' }}>
            {/* Generador de imágenes espaciales estéticas usando el ID como semilla */}
            <img 
              src={`https://picsum.photos/id/${(loc.id + 10) * 2}/300/200`} 
              alt={loc.name} 
              style={{ width: '100%', height: '140px', objectFit: 'cover' }}
            />
            <div className="card-content">
              <h3 style={{ fontSize: '1rem', color: '#97ce4c' }}>{loc.name}</h3>
              <p style={{ margin: 0, fontSize: '0.85rem', color: '#94a3b8' }}><strong>Tipo:</strong> {loc.type}</p>
              <p style={{ margin: 0, fontSize: '0.85rem', color: '#94a3b8' }}><strong>Dimensión:</strong> {loc.dimension}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LocationGallery;