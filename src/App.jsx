import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/layout/Header/Header";
import Footer from "./components/layout/Footer/Footer";

import HomePage from "./pages/HomePage/HomePage";
import ProjectsPage from "./pages/ProjectPage/ProjectsPage";
import AboutPage from "./pages/AboutPage/AboutPage";
import CalculatorsPage from "./pages/CalculatorPage/CalculatorPage";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/calculator" element={<CalculatorsPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
