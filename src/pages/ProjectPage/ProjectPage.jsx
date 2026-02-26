import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { SITE } from "../../config/constants";

// ── Data ────────────────────────────────────────────────────────
import { projects } from "../../data/projects";

// ── Components ──────────────────────────────────────────────────
import { useSkeleton } from "../../hooks/useSkeleton";
import { ProjectCardSkeleton } from "../../components/ui/Skeleton";

// ── Styles ──────────────────────────────────────────────────────
import "./ProjectPage.css";

// ════════════════════════════════════════════════════════════════
// useScrollReveal — adds .is-visible when cards enter viewport
// ════════════════════════════════════════════════════════════════

function useScrollReveal(deps) {
  useEffect(() => {
    const cards = document.querySelectorAll(".project-card");
    if (!cards.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = Array.from(cards).indexOf(entry.target);
            setTimeout(() => {
              entry.target.classList.add("is-visible");
            }, idx * 80);            // 80 ms stagger between cards
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );

    cards.forEach((c) => observer.observe(c));
    return () => observer.disconnect();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}

// ════════════════════════════════════════════════════════════════
// ProjectCountBar
// ════════════════════════════════════════════════════════════════

function ProjectCountBar({ projects: list }) {
  const total       = list.length;
  const residential = list.filter((p) => p.category === "RESIDENTIAL").length;
  const commercial  = list.filter((p) => p.category === "COMMERCIAL").length;

  return (
    <div className="projects-count-bar">
      <div className="projects-count-total">
        <span>{total}</span>&nbsp;Project{total !== 1 ? "s" : ""}
      </div>
      <div className="projects-count-pills">
        {residential > 0 && (
          <div className="projects-count-pill residential">
            <span className="projects-count-pill-dot" />
            {residential} Residential
          </div>
        )}
        {commercial > 0 && (
          <div className="projects-count-pill commercial">
            <span className="projects-count-pill-dot" />
            {commercial} Commercial
          </div>
        )}
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════
// ProjectModal
// ════════════════════════════════════════════════════════════════

function ProjectModal({ project, onClose }) {
  const [activeTab, setActiveTab] = useState("specs");

  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  useEffect(() => { setActiveTab("specs"); }, [project?.id]);

  if (!project) return null;

  const { caseStudy } = project;
  const hasCaseStudy  = !!caseStudy;
  const isCommercial  = project.category === "COMMERCIAL";
  const badgeStyle    = isCommercial ? { background: "var(--cat-commercial)" } : {};

  const RESULT_LABELS = {
    costSaving:         "Cost Saving",
    timeToComplete:     "Completion Time",
    clientSatisfaction: "Client Satisfaction",
    structuralRating:   "Compliance",
  };

  return (
    <div
      className="project-modal active"
      onClick={(e) => e.target === e.currentTarget && onClose()}
      role="dialog"
      aria-modal="true"
      aria-label={project.title}
    >
      <div className="project-modal-content">
        <button className="project-modal-close" onClick={onClose} aria-label="Close modal">
          ✕
        </button>

        {project.image && (
          <img src={project.image} alt={project.title} className="project-modal-image" />
        )}

        <div className="project-modal-body">
          {/* Header */}
          <div className="project-modal-header">
            <div>
              <div className="project-modal-id">
                Project #{String(project.id).padStart(2, "0")}
              </div>
              <h2 className="project-modal-title">{project.title}</h2>
            </div>
            <span className="project-card-category-badge" style={badgeStyle}>
              {project.category}
            </span>
          </div>

          {/* Info grid */}
          <div className="project-modal-info-grid">
            {[
              ["Plot Area",      project.plotArea],
              ["Estimated Cost", project.estimatedCost],
              ["Structure Type", project.structure],
              ["Foundation",     project.foundation],
            ].map(([label, value]) => (
              <div key={label} className="project-modal-info-item">
                <span className="project-modal-info-label">{label}</span>
                <span className="project-modal-info-value">{value}</span>
              </div>
            ))}
          </div>

          {/* Tabs */}
          {hasCaseStudy && (
            <div className="project-modal-tabs">
              {[["specs", "Structural Specs"], ["casestudy", "Case Study"]].map(
                ([key, label]) => (
                  <button
                    key={key}
                    className={`project-modal-tab-btn${activeTab === key ? " active" : ""}`}
                    onClick={() => setActiveTab(key)}
                  >{label}</button>
                )
              )}
            </div>
          )}

          {/* Specs */}
          {activeTab === "specs" && (
            <div
              className="project-modal-description"
              dangerouslySetInnerHTML={{ __html: project.description }}
            />
          )}

          {/* Case study */}
          {activeTab === "casestudy" && hasCaseStudy && (
            <div className="project-case-study">
              {[
                ["🎯", "Problem Statement",  <p className="case-study-text">{caseStudy.problem}</p>],
                ["💡", "Solution Approach",  <p className="case-study-text">{caseStudy.solution}</p>],
                ["⚠️", "Challenges Faced",
                  <ul className="case-study-list">
                    {caseStudy.challenges.map((c, i) => (
                      <li key={i} className="case-study-list-item">{c}</li>
                    ))}
                  </ul>
                ],
                ["✅", "Results & Outcomes",
                  <div className="case-study-results-grid">
                    {Object.entries(caseStudy.results).map(([key, value]) => (
                      <div key={key} className="case-study-result-item">
                        <span className="case-study-result-label">{RESULT_LABELS[key] ?? key}</span>
                        <span className="case-study-result-value">{value}</span>
                      </div>
                    ))}
                  </div>
                ],
                ["🔄", "Before & After",
                  <div className="case-study-comparison">
                    {[["before","Before"],["after","After"]].map(([side, lbl]) => (
                      <div key={side} className={`case-study-comparison-col ${side}`}>
                        <span className="case-study-comparison-label">{lbl}</span>
                        <ul className="case-study-list">
                          {caseStudy.comparison[side].map((item, i) => (
                            <li key={i} className="case-study-list-item">{item}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                ],
              ].map(([icon, title, content]) => (
                <div key={title} className="case-study-block">
                  <div className="case-study-block-header">
                    <span className="case-study-icon">{icon}</span>
                    <h4 className="case-study-block-title"
                      dangerouslySetInnerHTML={{ __html: title }} />
                  </div>
                  {content}
                </div>
              ))}
            </div>
          )}

          {/* Tags */}
          <div className="project-modal-tags">
            {project.tags.map((tag, i) => (
              <span key={i} className="project-modal-tag">{tag}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════
// TimelineCard
// ════════════════════════════════════════════════════════════════

function TimelineCard({ project, onClick }) {
  const idStr        = String(project.id).padStart(2, "0");
  const isCommercial = project.category === "COMMERCIAL";
  const badgeStyle   = isCommercial ? { background: "var(--cat-commercial)" } : {};

  const plainDesc = project.description
    ? project.description.replace(/<[^>]*>/g, "").slice(0, 130) + "…"
    : "";

  const RESULT_LABELS = {
    costSaving:         "Cost Saving",
    timeToComplete:     "Time",
    clientSatisfaction: "Satisfaction",
    structuralRating:   "Compliance",
  };

  return (
    <div
      className="project-card"
      data-category={project.category}
      onClick={() => onClick(project)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && onClick(project)}
      aria-label={`Open ${project.title}`}
    >
      {/* Pulse ring (CSS animation) */}
      <div className="project-card-dot-pulse" aria-hidden="true" />

      {/* ID label removed — dot only on spine */}

      {/* Connector */}
      <div className="project-card-connector" aria-hidden="true" />

      {/* Card box */}
      <div className="project-card-inner">
        <div className="project-card-inner-layout">

          {/* Image */}
          {project.image && (
            <div className="project-card-image">
              <img
                src={project.image}
                alt={project.title}
                className="project-card-img"
                loading="lazy"
              />
              <div className="project-card-image-overlay">
                <span className="project-card-category-badge" style={badgeStyle}>
                  {project.category}
                </span>
              </div>
              <div className="project-card-zoom-hint" aria-hidden="true">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2.5">
                  <circle cx="11" cy="11" r="8"/>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"/>
                  <line x1="11" y1="8"  x2="11"    y2="14"/>
                  <line x1="8"  y1="11" x2="14"    y2="11"/>
                </svg>
              </div>
            </div>
          )}

          {/* Content */}
          <div className="project-card-body">
            <div className="project-card-header">
              <span className="project-card-id">Project #{idStr}</span>
              <button
                className="project-card-expand"
                aria-label="Open project details"
                onClick={(e) => { e.stopPropagation(); onClick(project); }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2.2">
                  <path d="M7 17L17 7M17 7H7M17 7v10"/>
                </svg>
              </button>
            </div>

            <h3 className="project-card-title">{project.title}</h3>
            <p className="project-card-description">{plainDesc}</p>

            {project.caseStudy && (
              <div className="project-card-case-study">
                <div className="project-card-cs-row">
                  <span className="project-card-cs-icon">🎯</span>
                  <div className="project-card-cs-content">
                    <span className="project-card-cs-label">Problem</span>
                    <span className="project-card-cs-text">
                      {project.caseStudy.problem?.slice(0, 85)}…
                    </span>
                  </div>
                </div>
                {project.caseStudy.results && (
                  <div className="project-card-cs-results">
                    {Object.entries(project.caseStudy.results).slice(0, 3).map(([key, value]) => (
                      <div key={key} className="project-card-cs-result-pill">
                        <span className="project-card-cs-result-label">
                          {RESULT_LABELS[key] ?? key}
                        </span>
                        <span className="project-card-cs-result-value">{value}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            <div className="project-card-footer">
              <div className="project-card-info-grid">
                {[
                  ["Plot Area",  project.plotArea],
                  ["Est. Cost",  project.estimatedCost],
                  ["Structure",  project.structure],
                  ["Foundation", project.foundation],
                ].map(([label, value]) => (
                  <div key={label} className="project-card-info-item">
                    <span className="project-card-info-label">{label}</span>
                    <span className="project-card-info-value">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════
// ProjectsPage
// ════════════════════════════════════════════════════════════════

const FILTERS = ["all", "RESIDENTIAL", "COMMERCIAL"];

function ProjectsPage() {
  const [activeFilter, setActiveFilter]       = useState("all");
  const [selectedProject, setSelectedProject] = useState(null);
  const { isLoading } = useSkeleton(900);

  const sorted   = [...projects].sort((a, b) => b.id - a.id);
  const filtered = activeFilter === "all"
    ? sorted
    : sorted.filter((p) => p.category === activeFilter);

  /* Trigger scroll reveal whenever the list or loading state changes */
  useScrollReveal([filtered.map((p) => p.id).join(), isLoading]);

  return (
    <>
      <Helmet>
        <title>{SITE.seo.projects.title}</title>
        <meta name="description" content={SITE.seo.projects.description} />
        <link rel="canonical" href={SITE.seo.projects.canonical} />
      </Helmet>

      {/* Page Header */}
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
          <p className="page-description" data-aos="fade-up" data-aos-delay="200">
            A showcase of structural engineering projects demonstrating
            innovation, precision, and commitment to excellence.
          </p>
        </div>
      </section>

      {/* Filter Bar */}
      <section className="filter-section">
        <div className="container">
          <div className="filter-buttons" data-aos="fade-up">
            {FILTERS.map((f) => (
              <button
                key={f}
                className={`filter-btn${activeFilter === f ? " active" : ""}`}
                onClick={() => setActiveFilter(f)}
              >
                {f === "all" ? "All Projects" : f.charAt(0) + f.slice(1).toLowerCase()}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="projects">
        <div className="container">
          {!isLoading && <ProjectCountBar projects={filtered} />}

          <div className="projects-grid">
            {isLoading
              ? [1, 2, 3, 4, 5, 6].map((i) => <ProjectCardSkeleton key={i} />)
              : filtered.map((project) => (
                  <TimelineCard
                    key={project.id}
                    project={project}
                    onClick={setSelectedProject}
                  />
                ))}
          </div>
        </div>
      </section>

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