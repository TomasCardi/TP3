import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CharacterList from './pages/CharacterList';
import CharacterDetail from './pages/CharacterDetail';
import EpisodeDetail from './pages/EpisodeDetail';
import Navbar from './componentes/Navbar';

function App() {
  return (
    <Router>
      <Navbar />
      <div className="container">
        <Routes>
          {/* Vista 1: Listado */}
          <Route path="/" element={<CharacterList />} />
          {/* Vista 2: Detalle de Personaje (Dinámica) */}
          <Route path="/character/:id" element={<CharacterDetail />} />
          {/* Vista 3: Detalle de Episodio (Dinámica) */}
          <Route path="/episode/:id" element={<EpisodeDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;