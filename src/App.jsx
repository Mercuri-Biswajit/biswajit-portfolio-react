import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/layout/Header/Header";
import Footer from "./components/layout/Footer/Footer";

import HomePage from "./pages/HomePage/HomePage";
import ProjectPage from "./pages/ProjectPage/ProjectPage";
import AboutPage from "./pages/AboutPage/AboutPage";
import CalculatorPage from "./pages/CalculatorPage/CalculatorPage";
import VastuPage from "./pages/VastuPage/VastuPage";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/projects" element={<ProjectPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/calculator" element={<CalculatorPage />} />
        <Route path="/vastu" element={<VastuPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
