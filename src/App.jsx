import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

import HomePage        from './pages/HomePage/HomePage';
import ProjectsPage    from './pages/ProjectPage/ProjectsPage';
import AboutPage       from './pages/AboutPage/AboutPage';
import CalculatorsPage from './pages/CalculatorPage/CalculatorPage';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/"           element={<HomePage />} />
        <Route path="/projects"   element={<ProjectsPage />} />
        <Route path="/about"      element={<AboutPage />} />
        <Route path="/calculator" element={<CalculatorsPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;