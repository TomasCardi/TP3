import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CharacterList from './pages/CharacterList';
import CharacterDetail from './pages/CharacterDetail';
import EpisodeDetail from './pages/EpisodeDetail';
import Navbar from './componentes/Navbar';

// Importamos los Power Ups de forma limpia y directa
import EpisodeSearch from './pages/EpisodeSearch';
import CharacterComparator from './pages/CharacterComparator';
import LocationGallery from './pages/LocationGallery';

function App() {
  return (
    <Router>
      <Navbar />
      
      <div className="container">
        <Routes>
          {/* Vistas obligatorias del TP */}
          <Route path="/" element={<CharacterList />} />
          <Route path="/character/:id" element={<CharacterDetail />} />
          <Route path="/episode/:id" element={<EpisodeDetail />} />

          {/* Rutas de los 3 Power Ups funcionando en paralelo */}
          <Route path="/search-episodes" element={<EpisodeSearch />} />
          <Route path="/compare" element={<CharacterComparator />} />
          <Route path="/locations" element={<LocationGallery />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;