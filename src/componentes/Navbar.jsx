import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav style={styles.nav}>
      <div style={styles.logo}>
        <Link to="/" style={styles.link}>Portal Rick & Morty 🛸</Link>
      </div>
      <ul style={styles.ul}>
        <li>
          <Link to="/" style={styles.link}>Personajes</Link>
        </li>
      </ul>
    </nav>
  );
};

const styles = {
  nav: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1rem 2rem',
    backgroundColor: '#202329',
    color: 'white',
    marginBottom: '2rem'
  },
  logo: {
    fontSize: '1.5rem',
    fontWeight: 'bold'
  },
  ul: {
    listStyle: 'none',
    display: 'flex',
    gap: '1rem',
    margin: 0,
    padding: 0
  },
  link: {
    color: '#97ce4c', // Color verde Rick & Morty
    textDecoration: 'none',
    fontWeight: '600'
  }
};

export default Navbar;