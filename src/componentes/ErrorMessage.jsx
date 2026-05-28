const ErrorMessage = ({ message }) => {
  return (
    <div style={styles.box}>
      <p style={styles.title}>⚠️ ¡Rayos, Morty!</p>
      <p style={styles.text}>{message}</p>
    </div>
  );
};

const styles = {
  box: {
    backgroundColor: '#f8d7da',
    color: '#721c24',
    padding: '1.5rem',
    borderRadius: '0.5rem',
    border: '1px solid #f5c6cb',
    margin: '2rem auto',
    maxWidth: '500px',
    textAlign: 'center'
  },
  title: {
    fontSize: '1.4rem',
    fontWeight: 'bold',
    margin: '0 0 0.5rem 0'
  },
  text: {
    margin: 0
  }
};

export default ErrorMessage;