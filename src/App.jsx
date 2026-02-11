import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './pages/HomePage';
import Projects from './pages/ProjectsPage';
import About from './pages/AboutPage';
import Calculator from './pages/CalculatorsPage';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/"           element={<Home />} />
        <Route path="/projects"   element={<Projects />} />
        <Route path="/about"      element={<About />} />
        <Route path="/calculator" element={<Calculator />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;