import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

import { SkillCard, ProjectCard } from "../../components/cards";
import { skills } from "../../data/skills";
import { projects } from "../../data/projects";
import { SITE, MATERIAL_CONSTANTS } from "../../config/constants";
import { formatCurrency, formatNumber, safeFloat } from "../../utils/helpers";

// STANDALONE CSS - No dependencies on other CSS files
import "./HomePage.css";

// ════════════════════════════════════════════════════════════════
// ProjectModal — inlined so HomePage.jsx is self-contained
// Includes Case Study tab alongside original Structural Specs tab
// ════════════════════════════════════════════════════════════════

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
        {/* Close button */}
        <button
          className="project-modal-close"
          onClick={onClose}
          aria-label="Close modal"
        >
          ✕
        </button>

        {/* Hero image */}
        <img
          src={project.image}
          alt={project.title}
          className="project-modal-image"
        />

        <div className="project-modal-body">
          {/* Header */}
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

          {/* Info grid — always visible */}
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

          {/* Tab bar — only when caseStudy data exists */}
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

          {/* TAB — STRUCTURAL SPECS */}
          {activeTab === "specs" && (
            <div
              className="project-modal-description"
              dangerouslySetInnerHTML={{ __html: project.description }}
            />
          )}

          {/* TAB — CASE STUDY */}
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

              {/* 5 · Before & After */}
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

          {/* Tags — always visible */}
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

function HomePage() {
  const [selectedProject, setSelectedProject] = useState(null);

  // Calculator state
  const [calcArea, setCalcArea] = useState("");
  const [calcRate, setCalcRate] = useState("");
  const [calcTotal, setCalcTotal] = useState(null);
  const [showMaterials, setShowMaterials] = useState(false);
  const [materials, setMaterials] = useState(null);

  useEffect(() => {
    if (window.AOS) window.AOS.init({ duration: 800, once: true, offset: 100 });
  }, []);

  // Lock body scroll when materials modal is open
  useEffect(() => {
    if (showMaterials) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [showMaterials]);

  // Sort projects by ID (highest/latest first)
  const sortedProjects = [...projects].sort((a, b) => b.id - a.id);

  // Calculator functions
  const handleCalculate = () => {
    const area = safeFloat(calcArea, 0);
    const rate = safeFloat(calcRate, 0);

    if (area <= 0 || rate <= 0) {
      alert("Please enter valid area and rate values.");
      return;
    }

    const total = area * rate;
    setCalcTotal(total);
    setShowMaterials(false);
    setMaterials(null);
  };

  const handleShowMaterials = () => {
    const area = safeFloat(calcArea, 0);

    if (area <= 0 || !calcTotal) {
      alert("Please calculate the total first.");
      return;
    }

    const cementQty = area * MATERIAL_CONSTANTS.cement;
    const steelQty = area * MATERIAL_CONSTANTS.steel;
    const sandQty = area * MATERIAL_CONSTANTS.sand;
    const aggregateQty = area * MATERIAL_CONSTANTS.aggregate;
    // ── BRICK: ~8 bricks per sq.ft (standard 230×115×75 mm brick, 9" thick wall)
    // Falls back gracefully if the constant isn't defined yet in constants.js
    const brickQty = area * (MATERIAL_CONSTANTS.bricks ?? 8);

    setMaterials({
      cement: cementQty,
      steel: steelQty,
      sand: sandQty,
      aggregate: aggregateQty,
      bricks: brickQty,
    });
    setShowMaterials(true);
  };

  return (
    <>
      <Helmet>
        <title>{SITE.seo.home.title}</title>
        <meta name="description" content={SITE.seo.home.description} />
        <link rel="canonical" href={SITE.seo.home.canonical} />
      </Helmet>
      <div className="home-page">
        {/* ── Hero ─────────────────────────────────────── */}
        <section className="hero">
          <div className="hero-background" />
          <div className="container">
            <div className="hero-content">
              <h1 className="hero-label">
                Civil Engineer in Raiganj, West Bengal
              </h1>
              <h2 className="hero-title">
                <span className="line">ER. BISWAJIT</span>
                {/* <span className="line">DEB</span> */}
                <span className="line highlight">DEB BARMAN</span>
              </h2>
              <p className="hero-description">
                Structural Designer based in Raiganj, Uttar Dinajpur —
                specializing in RCC structural design, WB PWD BOQ, IS 456:2000
                structures, and construction cost estimation for residential and
                commercial projects across North Bengal.
              </p>
              <div className="hero-cta">
                <Link to="/projects" className="btn btn-primary">
                  VIEW PROJECTS
                </Link>
                <Link to="/calculator" className="btn btn-secondary">
                  Advanced Calculator
                </Link>
              </div>
            </div>

            <div className="hero-visual">
              <div className="hero-image-container">
                <img
                  src="../assets/images/hero/hero.png"
                  alt="Building Plans and Structural Design"
                  className="hero-image"
                />
                <div className="hero-image-overlay" />
              </div>
              <div className="blueprint-grid" />
            </div>
          </div>
        </section>

        {/* ── Quick Calculator ─────────────────────────── */}
        <section className="quick-calculator">
          <div className="container">
            <div className="section-header" data-aos="fade-up">
              <span className="section-number">01</span>
              <h2 className="section-title">QUICK ESTIMATE</h2>
            </div>

            <div className="calculator-card" data-aos="fade-up">
              <div className="calculator-inputs">
                <div className="calc-input-group">
                  <label className="calc-label">Built-up Area (sq.ft)</label>
                  <input
                    type="number"
                    className="calc-input"
                    placeholder="Enter area in sq.ft"
                    value={calcArea}
                    onChange={(e) => setCalcArea(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleCalculate()}
                  />
                </div>

                <div className="calc-input-group">
                  <label className="calc-label">
                    Construction Rate (₹/sq.ft)
                  </label>
                  <input
                    type="number"
                    className="calc-input"
                    placeholder="Enter rate per sq.ft"
                    value={calcRate}
                    onChange={(e) => setCalcRate(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleCalculate()}
                  />
                </div>
              </div>

              <div className="calc-btn-wrapper">
                <button
                  className="btn btn-primary calc-btn"
                  onClick={handleCalculate}
                >
                  CALCULATE TOTAL
                </button>
              </div>

              {calcTotal !== null && (
                <div className="calculator-results" data-aos="zoom-in">
                  <div className="total-cost-display">
                    <span className="total-label">Estimated Total Cost</span>
                    <span className="total-amount">
                      {formatCurrency(calcTotal)}
                    </span>
                    <span className="total-meta">
                      {safeFloat(calcArea, 0).toLocaleString("en-IN")} sq.ft × ₹
                      {safeFloat(calcRate, 0).toLocaleString("en-IN")}/sq.ft
                    </span>

                    <button
                      className="btn btn-secondary calc-materials-btn"
                      onClick={handleShowMaterials}
                    >
                      CLICK FOR MATERIAL
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Material Popup Modal */}
          {showMaterials && materials && (
            <div className="materials-modal" role="dialog" aria-modal="true">
              <div
                className="materials-modal-overlay"
                onClick={() => setShowMaterials(false)}
              />
              <div className="materials-modal-content">
                <button
                  className="materials-modal-close"
                  onClick={() => setShowMaterials(false)}
                  aria-label="Close modal"
                >
                  &times;
                </button>

                <h3 className="materials-title">Material Requirements</h3>

                <div className="materials-grid">
                  <div className="material-item">
                    <span className="material-icon">🏗️</span>
                    <div className="material-info">
                      <span className="material-name">Cement</span>
                      <span className="material-qty">
                        {formatNumber(materials.cement, 0)} bags
                      </span>
                    </div>
                  </div>

                  <div className="material-item">
                    <span className="material-icon">⚙️</span>
                    <div className="material-info">
                      <span className="material-name">Steel</span>
                      <span className="material-qty">
                        {formatNumber(materials.steel, 0)} kg
                      </span>
                    </div>
                  </div>

                  <div className="material-item">
                    <span className="material-icon">🏖️</span>
                    <div className="material-info">
                      <span className="material-name">Sand</span>
                      <span className="material-qty">
                        {formatNumber(materials.sand, 2)} m³
                      </span>
                    </div>
                  </div>

                  <div className="material-item">
                    <span className="material-icon">🪨</span>
                    <div className="material-info">
                      <span className="material-name">Aggregate</span>
                      <span className="material-qty">
                        {formatNumber(materials.aggregate, 2)} m³
                      </span>
                    </div>
                  </div>

                  {/* ── BRICKS ── */}
                  <div className="material-item">
                    <span className="material-icon">🧱</span>
                    <div className="material-info">
                      <span className="material-name">Bricks</span>
                      <span className="material-qty">
                        {formatNumber(materials.bricks, 0)} nos
                      </span>
                    </div>
                  </div>
                </div>

                <div className="materials-note">
                  <p>
                    💡 <strong>Note:</strong> Material quantities are based on
                    standard RCC construction. Brick quantity assumes 230×115×75
                    mm modular bricks for 9″ external &amp; 4.5″ internal walls.
                    For a detailed cost breakdown, visit our{" "}
                    <Link to="/calculator">Advanced Calculator</Link>.
                  </p>
                </div>
              </div>
            </div>
          )}
        </section>

        {/* ── Featured Projects ────────────────────────── */}
        <section className="recent-projects">
          <div className="container">
            <div className="section-header" data-aos="fade-up">
              <span className="section-number">02</span>
              <h2 className="section-title">FEATURED WORK</h2>
            </div>
            <div className="projects-preview">
              {sortedProjects.slice(0, 3).map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  onClick={setSelectedProject}
                />
              ))}
            </div>
            <div className="section-cta" data-aos="fade-up">
              <Link to="/projects" className="btn btn-primary">
                VIEW ALL PROJECTS
              </Link>
            </div>
          </div>
        </section>

        {/* ── About Me ─────────────────────────────────── */}
        <section className="about-me">
          <div className="container">
            <div className="section-header" data-aos="fade-up">
              <span className="section-number">03</span>
              <h2 className="section-title">ABOUT ME</h2>
            </div>
            <div className="about-content">
              <div className="about-text" data-aos="fade-right">
                <h3 className="about-subtitle">Professional Summary</h3>
                <p className="about-description">
                  Hello! I'm <strong>Er. Biswajit Deb Barman</strong>, a
                  dedicated civil engineer with a passion for creating
                  innovative and sustainable structural solutions.
                </p>
                <p className="about-description">
                  My expertise spans across various aspects of civil
                  engineering, from initial conceptual designs to detailed
                  structural analysis.
                </p>
                <div className="about-highlights">
                  <div
                    className="highlight-item"
                    data-aos="zoom-in"
                    data-aos-delay="100"
                  >
                    <span className="highlight-bar" />
                    <span className="highlight-num">01</span>
                    <div className="highlight-face">
                      <div className="highlight-icon">🎓</div>
                      <div className="highlight-content">
                        <h4>Education</h4>
                        <p>Bachelor of Engineering in Civil Engineering</p>
                      </div>
                    </div>
                    <div className="highlight-hover">
                      <span className="highlight-hover-icon">🎓</span>
                      <span className="highlight-hover-title">Education</span>
                      <span className="highlight-hover-text">
                        Bachelor of Engineering in Civil Engineering
                      </span>
                    </div>
                  </div>

                  <div
                    className="highlight-item"
                    data-aos="zoom-in"
                    data-aos-delay="200"
                  >
                    <span className="highlight-bar" />
                    <span className="highlight-num">02</span>
                    <div className="highlight-face">
                      <div className="highlight-icon">💼</div>
                      <div className="highlight-content">
                        <h4>Experience</h4>
                        <p>
                          Specialized in Structural &amp; Architectural Design
                        </p>
                      </div>
                    </div>
                    <div className="highlight-hover">
                      <span className="highlight-hover-icon">💼</span>
                      <span className="highlight-hover-title">Experience</span>
                      <span className="highlight-hover-text">
                        Specialized in Structural &amp; Architectural Design
                      </span>
                    </div>
                  </div>

                  <div
                    className="highlight-item"
                    data-aos="zoom-in"
                    data-aos-delay="300"
                  >
                    <span className="highlight-bar" />
                    <span className="highlight-num">03</span>
                    <div className="highlight-face">
                      <div className="highlight-icon">📍</div>
                      <div className="highlight-content">
                        <h4>Location</h4>
                        <p>{SITE.location}, West Bengal, India</p>
                      </div>
                    </div>
                    <div className="highlight-hover">
                      <span className="highlight-hover-icon">📍</span>
                      <span className="highlight-hover-title">Location</span>
                      <span className="highlight-hover-text">
                        {SITE.location}, West Bengal, India
                      </span>
                    </div>
                  </div>
                </div>

                <div className="about-cta" data-aos="fade-up">
                  <Link to="/about" className="btn btn-primary">
                    MORE ABOUT ME
                  </Link>
                  <a
                    href="/assets/files/Biswajit_Deb_Barman__CV.pdf"
                    download
                    className="btn btn-secondary"
                  >
                    DOWNLOAD RESUME
                  </a>
                </div>
              </div>

              <div className="about-skills" data-aos="fade-left">
                <h3 className="skills-subtitle">Core Skills</h3>
                <div className="skills-grid">
                  {skills.map((skill, i) => (
                    <SkillCard key={i} {...skill} index={i} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Project Modal ────────────────────────────── */}
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </div>
    </>
  );
}

export default HomePage;
