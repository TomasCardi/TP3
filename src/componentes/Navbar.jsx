import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav style={styles.nav}>
      <div style={styles.logo}>
        <Link to="/" style={styles.logoLink}>Portal Rick & Morty 🛸</Link>
      </div>
      <ul style={styles.ul}>
        <li>
          <Link to="/" style={styles.link}>Personajes</Link>
        </li>
        <li>
          <Link to="/search-episodes" style={styles.link}>🔍 Buscar Episodios</Link>
        </li>
        <li>
          <Link to="/compare" style={styles.link}>⚔️ Comparador</Link>
        </li>
        <li>
          <Link to="/locations" style={styles.link}>🌍 Locaciones</Link>
        </li>
      </ul>
    </nav>
  );
};

const styles = {
  nav: {
    backgroundColor: '#1e2024',
    padding: '1rem 2rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  logo: {
    fontSize: '1.25rem',
    fontWeight: 'bold',
  },
  logoLink: {
    color: '#97ce4c',
    textDecoration: 'none',
  },
  ul: {
    listStyle: 'none',
    display: 'flex',
    gap: '1.5rem',
    margin: 0,
    padding: 0,
  },
  link: {
    color: '#f1f5f9',
    textDecoration: 'none',
    fontSize: '0.95rem',
    fontWeight: '500',
  },
};

export default Navbar;