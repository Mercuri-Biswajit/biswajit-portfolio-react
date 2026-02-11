import { useState, useEffect } from "react";
import ProjectCard from "../components/ProjectCard";
import ProjectModal from "../components/ProjectModal";
import { projects } from "../data/projects";

const FILTERS = ["all", "RESIDENTIAL", "COMMERCIAL"];

function Projects() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    if (window.AOS) window.AOS.init({ duration: 800, once: true });
  }, []);

  const filtered =
    activeFilter === "all"
      ? projects
      : projects.filter((p) => p.category === activeFilter);

  return (
    <>
      {/* Page Header */}
      <section className="page-header">
        <div className="hero-animated-bg">
          <div className="animated-shape shape-1"></div>
          <div className="animated-shape shape-2"></div>
          <div className="animated-shape shape-3"></div>
          <div className="animated-grid"></div>
        </div>
        <div className="container">
          <h1 className="page-title" data-aos="fade-down">
            <span className="page-label">PORTFOLIO</span>
            MY PROJECTS
          </h1>
          <p
            className="page-description"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            A showcase of structural engineering projects demonstrating
            innovation, precision, and commitment to excellence.
          </p>
        </div>
      </section>

      {/* Filter Buttons */}
      <section className="filter-section">
        <div className="container">
          <div className="filter-buttons" data-aos="fade-up">
            {FILTERS.map((filter) => (
              <button
                key={filter}
                className={`filter-btn ${activeFilter === filter ? "active" : ""}`}
                onClick={() => setActiveFilter(filter)}
              >
                {filter === "all" ? "ALL PROJECTS" : filter}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="projects">
        <div className="container">
          <div className="projects-grid">
            {filtered.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onClick={setSelectedProject}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Modal */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </>
  );
}

export default Projects;
