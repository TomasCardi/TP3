import { Link } from 'react-router-dom';

const CharacterCard = ({ character }) => {
  const statusColor = character.status === 'Alive' ? '#55cc44' : character.status === 'Dead' ? '#d63d2e' : '#9e9e9e';

  return (
    <div className="card">
      <img src={character.image} alt={character.name} />
      <div className="card-content">
        <h3>{character.name}</h3>
        <p style={{ margin: 0, fontSize: '0.8rem', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <span style={{ height: '7px', width: '7px', borderRadius: '50%', backgroundColor: statusColor, display: 'inline-block' }}></span>
          {character.status} - {character.species}
        </p>
        <Link to={`/character/${character.id}`} className="card-button">
          Ver Detalle
        </Link>
      </div>
    </div>
  );
};

export default CharacterCard;