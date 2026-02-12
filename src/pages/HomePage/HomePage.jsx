import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { SkillCard, ServiceCard, ProjectCard } from "../../components/cards";
import { ProjectModal } from "../../components/modals";
import { skills } from "../../data/skills";
import { services } from "../../data/services";
import { projects } from "../../data/projects";
import { SITE } from "../../config/constants";

// STANDALONE CSS - No dependencies on other CSS files
import "./HomePage.css";

function HomePage() {
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    if (window.AOS) window.AOS.init({ duration: 800, once: true, offset: 100 });
  }, []);

  return (
    <div className="home-page">
      {/* ── Hero ─────────────────────────────────────── */}
      <section className="hero">
        <div className="hero-background" />
        <div className="container">
          <div className="hero-content">
            <div className="hero-label">
              CIVIL ENGINEER | BISWAJIT DEB BARMAN
            </div>
            <h1 className="hero-title">
              <span className="line">PROFESSIONAL</span>
              <span className="line">CIVIL ENGINEERING</span>
              <span className="line highlight">SERVICES</span>
            </h1>
            <p className="hero-description">
              Delivering Expert Building Design, Structural Analysis, and
              Accurate Cost Estimation Solutions
            </p>
            <div className="hero-cta">
              <Link to="/projects" className="btn btn-primary">
                VIEW PROJECTS
              </Link>
              <Link to="/about" className="btn btn-secondary">
                LEARN MORE
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

      {/* ── Skills ───────────────────────────────────── */}
      <section className="skills">
        <div className="container">
          <div className="section-header" data-aos="fade-up">
            <span className="section-number">01</span>
            <h2 className="section-title">SOFTWARE EXPERTISE</h2>
          </div>
          <div className="skills-grid">
            {skills.map((skill, i) => (
              <SkillCard key={i} {...skill} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Featured Projects ────────────────────────── */}
      <section className="recent-projects">
        <div className="container">
          <div className="section-header" data-aos="fade-up">
            <span className="section-number">02</span>
            <h2 className="section-title">FEATURED WORK</h2>
          </div>
          <div className="projects-preview">
            {projects.slice(0, 4).map((project) => (
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

      {/* ── Services ─────────────────────────────────── */}
      <section className="services">
        <div className="container">
          <div className="section-header" data-aos="fade-up">
            <span className="section-number">03</span>
            <h2 className="section-title">SERVICES PROVIDED</h2>
          </div>
          <p className="services-subtitle" data-aos="fade-up">
            Professional engineering design services with transparent commitment
            to quality.
          </p>
          <div className="services-grid">
            {services.map((service, i) => (
              <ServiceCard key={i} {...service} />
            ))}
          </div>
        </div>
      </section>

      {/* ── About Me ─────────────────────────────────── */}
      <section className="about-me">
        <div className="container">
          <div className="section-header" data-aos="fade-up">
            <span className="section-number">04</span>
            <h2 className="section-title">ABOUT ME</h2>
          </div>
          <div className="about-content">
            <div className="about-image-wrapper" data-aos="fade-right">
              <div className="about-image-container">
                <img
                  src="/assets/images/hero/hero.png"
                  alt={SITE.name}
                  className="about-image"
                />
                <div className="about-image-overlay" />
              </div>
            </div>

            <div className="about-text" data-aos="fade-left">
              <h3 className="about-subtitle">Professional Summary</h3>
              <p className="about-description">
                Hello! I'm <strong>Er. Biswajit Deb Barman</strong>, a dedicated
                civil engineer with a passion for creating innovative and
                sustainable structural solutions.
              </p>
              <p className="about-description">
                My expertise spans across various aspects of civil engineering,
                from initial conceptual designs to detailed structural analysis.
              </p>
              <div className="about-highlights">
                <div
                  className="highlight-item"
                  data-aos="zoom-in"
                  data-aos-delay="100"
                >
                  <div className="highlight-icon">🎓</div>
                  <div className="highlight-content">
                    <h4>Education</h4>
                    <p>Bachelor of Engineering in Civil Engineering</p>
                  </div>
                </div>
                <div
                  className="highlight-item"
                  data-aos="zoom-in"
                  data-aos-delay="200"
                >
                  <div className="highlight-icon">💼</div>
                  <div className="highlight-content">
                    <h4>Experience</h4>
                    <p>Specialized in Structural &amp; Architectural Design</p>
                  </div>
                </div>
                <div
                  className="highlight-item"
                  data-aos="zoom-in"
                  data-aos-delay="300"
                >
                  <div className="highlight-icon">📍</div>
                  <div className="highlight-content">
                    <h4>Location</h4>
                    <p>{SITE.location}, West Bengal, India</p>
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
  );
}

export default HomePage;
