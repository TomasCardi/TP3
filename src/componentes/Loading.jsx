const Loading = () => {
  return (
    <div style={styles.container}>
      <div style={styles.spinner}></div>
      <p style={styles.text}>Cargando datos interdimensionales...</p>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '50vh'
  },
  spinner: {
    border: '4px solid rgba(0,0,0,0.1)',
    width: '50px',
    height: '50px',
    borderRadius: '50%',
    borderLeftColor: '#97ce4c',
    animation: 'spin 1s linear infinite'
  },
  text: {
    marginTop: '1rem',
    color: '#fff',
    fontSize: '1.1rem'
  }
};

export default Loading;