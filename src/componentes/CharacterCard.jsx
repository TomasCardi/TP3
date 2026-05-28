import { Link } from 'react-router-dom';

const CharacterCard = ({ character }) => {
  // Cambiamos el color de la bolita de estado según corresponda
  const statusColor = character.status === 'Alive' ? '#55cc44' : character.status === 'Dead' ? '#d63d2e' : '#9e9e9e';

  return (
    <div style={styles.card}>
      <img src={character.image} alt={character.name} style={styles.image} />
      <div style={styles.content}>
        <h3 style={styles.name}>{character.name}</h3>
        <p style={styles.status}>
          <span style={{ ...styles.icon, backgroundColor: statusColor }}></span>
          {character.status} - {character.species}
        </p>
        <Link to={`/character/${character.id}`} style={styles.button}>
          Ver Detalle
        </Link>
      </div>
    </div>
  );
};

const styles = {
  card: {
    backgroundColor: '#3c3e44',
    borderRadius: '0.5rem',
    overflow: 'hidden',
    color: 'white',
    display: 'flex',
    flexDirection: 'column',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
  },
  image: {
    width: '100%',
    height: '250px',
    objectFit: 'cover'
  },
  content: {
    padding: '1.25rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem'
  },
  name: {
    margin: 0,
    fontSize: '1.3rem'
  },
  status: {
    margin: 0,
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    fontSize: '0.9rem'
  },
  icon: {
    height: '0.5rem',
    width: '0.5rem',
    borderRadius: '50%',
    display: 'inline-block'
  },
  button: {
    marginTop: '1rem',
    padding: '0.5rem',
    backgroundColor: '#97ce4c',
    color: '#202329',
    textAlign: 'center',
    textDecoration: 'none',
    borderRadius: '0.25rem',
    fontWeight: 'bold',
    transition: 'background-color 0.2s'
  }
};

export default CharacterCard;