import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { SITE } from "../../config/constants";

// ── Data ────────────────────────────────────────────────────────
import { projects } from "../../data/projects"; // ← projects.js

// ── Components ──────────────────────────────────────────────────
import { ProjectCard } from "../../components/cards";

// ── Styles ──────────────────────────────────────────────────────
import "./ProjectPage.css"; // ← ProjectPage.css

// ════════════════════════════════════════════════════════════════
// ProjectModal — inlined so ProjectPage.jsx is self-contained
// ════════════════════════════════════════════════════════════════

/**
 * ProjectModal
 *
 * Full-screen project details overlay.
 *  - ESC key or click-outside closes the modal
 *  - Body scroll is locked while open
 *  - Two tabs: "Structural Specs" (original HTML) | "Case Study" (new)
 *  - Tab bar is hidden when a project has no caseStudy data
 *  - All class names come from ProjectPage.css
 */
function ProjectModal({ project, onClose }) {
  const [activeTab, setActiveTab] = useState("specs");

  /* Lock body scroll + ESC listener */
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  /* Reset to Specs tab when a different project opens */
  useEffect(() => {
    setActiveTab("specs");
  }, [project?.id]);

  if (!project) return null;

  const { caseStudy } = project;
  const hasCaseStudy = !!caseStudy;

  /* Click-outside closes modal */
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div
      className="project-modal active"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-label={project.title}
    >
      <div className="project-modal-content">
        {/* ── Close button ─────────────────────────────── */}
        <button
          className="project-modal-close"
          onClick={onClose}
          aria-label="Close modal"
        >
          ✕
        </button>

        {/* ── Hero image ───────────────────────────────── */}
        <img
          src={project.image}
          alt={project.title}
          className="project-modal-image"
        />

        <div className="project-modal-body">
          {/* ── Header: number + title + category badge ── */}
          <div className="project-modal-header">
            <div>
              <div className="project-modal-id">
                PROJECT #{String(project.id).padStart(2, "0")}
              </div>
              <h2 className="project-modal-title">{project.title}</h2>
            </div>
            <span className="project-card-category-badge">
              {project.category}
            </span>
          </div>

          {/* ── Info grid (always visible above tabs) ──── */}
          <div className="project-modal-info-grid">
            <div className="project-modal-info-item">
              <span className="project-modal-info-label">Plot Area</span>
              <span className="project-modal-info-value">
                {project.plotArea}
              </span>
            </div>
            <div className="project-modal-info-item">
              <span className="project-modal-info-label">Estimated Cost</span>
              <span className="project-modal-info-value">
                {project.estimatedCost}
              </span>
            </div>
            <div className="project-modal-info-item">
              <span className="project-modal-info-label">Structure Type</span>
              <span className="project-modal-info-value">
                {project.structure}
              </span>
            </div>
            <div className="project-modal-info-item">
              <span className="project-modal-info-label">Foundation</span>
              <span className="project-modal-info-value">
                {project.foundation}
              </span>
            </div>
          </div>

          {/* ── Tab bar — only when caseStudy data exists ─ */}
          {hasCaseStudy && (
            <div className="project-modal-tabs">
              <button
                className={`project-modal-tab-btn${activeTab === "specs" ? " active" : ""}`}
                onClick={() => setActiveTab("specs")}
              >
                Structural Specs
              </button>
              <button
                className={`project-modal-tab-btn${activeTab === "casestudy" ? " active" : ""}`}
                onClick={() => setActiveTab("casestudy")}
              >
                Case Study
              </button>
            </div>
          )}

          {/* ══════════════════════════════════════════════
              TAB — STRUCTURAL SPECS
              Renders the HTML string from projects.js
          ══════════════════════════════════════════════ */}
          {activeTab === "specs" && (
            <div
              className="project-modal-description"
              dangerouslySetInnerHTML={{ __html: project.description }}
            />
          )}

          {/* ══════════════════════════════════════════════
              TAB — CASE STUDY
          ══════════════════════════════════════════════ */}
          {activeTab === "casestudy" && hasCaseStudy && (
            <div className="project-case-study">
              {/* 1 · Problem Statement */}
              <div className="case-study-block">
                <div className="case-study-block-header">
                  <span className="case-study-icon">🎯</span>
                  <h4 className="case-study-block-title">Problem Statement</h4>
                </div>
                <p className="case-study-text">{caseStudy.problem}</p>
              </div>

              {/* 2 · Solution Approach */}
              <div className="case-study-block">
                <div className="case-study-block-header">
                  <span className="case-study-icon">💡</span>
                  <h4 className="case-study-block-title">Solution Approach</h4>
                </div>
                <p className="case-study-text">{caseStudy.solution}</p>
              </div>

              {/* 3 · Challenges Faced */}
              <div className="case-study-block">
                <div className="case-study-block-header">
                  <span className="case-study-icon">⚠️</span>
                  <h4 className="case-study-block-title">Challenges Faced</h4>
                </div>
                <ul className="case-study-list">
                  {caseStudy.challenges.map((challenge, i) => (
                    <li key={i} className="case-study-list-item">
                      {challenge}
                    </li>
                  ))}
                </ul>
              </div>

              {/* 4 · Results & Outcomes */}
              <div className="case-study-block">
                <div className="case-study-block-header">
                  <span className="case-study-icon">✅</span>
                  <h4 className="case-study-block-title">
                    Results &amp; Outcomes
                  </h4>
                </div>
                <div className="case-study-results-grid">
                  {Object.entries(caseStudy.results).map(([key, value]) => {
                    const labelMap = {
                      costSaving: "Cost Saving",
                      timeToComplete: "Completion Time",
                      clientSatisfaction: "Client Satisfaction",
                      structuralRating: "Compliance",
                    };
                    return (
                      <div key={key} className="case-study-result-item">
                        <span className="case-study-result-label">
                          {labelMap[key] ?? key}
                        </span>
                        <span className="case-study-result-value">{value}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* 5 · Before & After Comparison */}
              <div className="case-study-block">
                <div className="case-study-block-header">
                  <span className="case-study-icon">🔄</span>
                  <h4 className="case-study-block-title">Before &amp; After</h4>
                </div>
                <div className="case-study-comparison">
                  <div className="case-study-comparison-col before">
                    <span className="case-study-comparison-label">Before</span>
                    <ul className="case-study-list">
                      {caseStudy.comparison.before.map((item, i) => (
                        <li key={i} className="case-study-list-item">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="case-study-comparison-col after">
                    <span className="case-study-comparison-label">After</span>
                    <ul className="case-study-list">
                      {caseStudy.comparison.after.map((item, i) => (
                        <li key={i} className="case-study-list-item">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ── Tags — always visible below both tabs ──── */}
          <div className="project-modal-tags">
            {project.tags.map((tag, i) => (
              <span key={i} className="project-modal-tag">
                {tag}
              </span>
            ))}
          </div>
        </div>
        {/* /project-modal-body */}
      </div>
      {/* /project-modal-content */}
    </div>
  );
}

// ════════════════════════════════════════════════════════════════
// Filter constants
// ════════════════════════════════════════════════════════════════

const FILTERS = ["all", "RESIDENTIAL", "COMMERCIAL"];

// ════════════════════════════════════════════════════════════════
// ProjectsPage — main page component (from your uploaded file)
// ════════════════════════════════════════════════════════════════

function ProjectsPage() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    if (window.AOS) window.AOS.init({ duration: 800, once: true });
  }, []);

  /* Sort projects by ID (highest/latest first) */
  const sortedProjects = [...projects].sort((a, b) => b.id - a.id);

  const filteredProjects =
    activeFilter === "all"
      ? sortedProjects
      : sortedProjects.filter((p) => p.category === activeFilter);

  return (
    <>
      <Helmet>
        <title>{SITE.seo.projects.title}</title>
        <meta name="description" content={SITE.seo.projects.description} />
        <link rel="canonical" href={SITE.seo.projects.canonical} />
      </Helmet>
      {/* ── Page Header ────────────────────────────────────── */}
      <section className="page-header">
        <div className="hero-animated-bg">
          <div className="animated-shape shape-1" />
          <div className="animated-shape shape-2" />
          <div className="animated-shape shape-3" />
          <div className="animated-grid" />
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

      {/* ── Filter Bar ─────────────────────────────────────── */}
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

      {/* ── Projects Grid ──────────────────────────────────── */}
      <section className="projects">
        <div className="container">
          <div className="projects-grid">
            {filteredProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onClick={setSelectedProject}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── Project Modal ──────────────────────────────────── */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </>
  );
}

export default ProjectsPage;
