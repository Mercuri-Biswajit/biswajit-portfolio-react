import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { SkillCard, ServiceCard, ProjectCard } from "../../components/cards";
import { ProjectModal } from "../../components/modals";
import { skills } from "../../data/skills";
import { services } from "../../data/services";
import { projects } from "../../data/projects";
import { SITE } from "../../config/constants";

import "./homepage.css";

function HomePage() {
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    if (window.AOS) window.AOS.init({ duration: 800, once: true, offset: 100 });
  }, []);

  return (
    <>
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
                src="/assets/images/hero/hero.png"
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
      <section className="home-skills">
        <div className="container">
          <div className="home-section-header" data-aos="fade-up">
            <span className="home-section-number">01</span>
            <h2 className="home-section-title">SOFTWARE EXPERTISE</h2>
          </div>
          <div className="home-skills-grid">
            {skills.map((skill, i) => (
              <SkillCard key={i} {...skill} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Featured Projects ────────────────────────── */}
      <section className="home-projects">
        <div className="container">
          <div className="home-section-header" data-aos="fade-up">
            <span className="home-section-number">02</span>
            <h2 className="home-section-title">FEATURED WORK</h2>
          </div>
          <div className="home-projects-grid">
            {projects.slice(0, 4).map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onClick={setSelectedProject}
              />
            ))}
          </div>
          <div className="home-section-cta" data-aos="fade-up">
            <Link to="/projects" className="btn btn-primary">
              VIEW ALL PROJECTS
            </Link>
          </div>
        </div>
      </section>

      {/* ── Services ─────────────────────────────────── */}
      <section className="home-services">
        <div className="container">
          <div className="home-section-header" data-aos="fade-up">
            <span className="home-section-number">03</span>
            <h2 className="home-section-title">SERVICES PROVIDED</h2>
          </div>
          <p className="home-services-subtitle" data-aos="fade-up">
            Professional engineering design services with transparent commitment
            to quality.
          </p>
          <div className="home-services-grid">
            {services.map((service, i) => (
              <ServiceCard key={i} {...service} />
            ))}
          </div>
        </div>
      </section>

      {/* ── About Me ─────────────────────────────────── */}
      <section className="home-about">
        <div className="container">
          <div className="home-section-header" data-aos="fade-up">
            <span className="home-section-number">04</span>
            <h2 className="home-section-title">ABOUT ME</h2>
          </div>
          <div className="home-about-content">
            <div className="home-about-image-wrapper" data-aos="fade-right">
              <div className="home-about-image-container">
                <img
                  src="/assets/images/hero/hero.png"
                  alt={SITE.name}
                  className="home-about-image"
                />
                <div className="home-about-image-overlay" />
              </div>
            </div>

            <div className="home-about-text" data-aos="fade-left">
              <h3 className="home-about-subtitle">Professional Summary</h3>
              <p className="home-about-description">
                Hello! I'm <strong>Er. Biswajit Deb Barman</strong>, a dedicated
                civil engineer with a passion for creating innovative and
                sustainable structural solutions.
              </p>
              <p className="home-about-description">
                My expertise spans across various aspects of civil engineering,
                from initial conceptual designs to detailed structural analysis.
              </p>
              <div className="home-highlights">
                <div className="home-highlight-item" data-aos="zoom-in" data-aos-delay="100">
                  <div className="home-highlight-icon">🎓</div>
                  <div className="home-highlight-content">
                    <h4>Education</h4>
                    <p>Bachelor of Engineering in Civil Engineering</p>
                  </div>
                </div>
                <div className="home-highlight-item" data-aos="zoom-in" data-aos-delay="200">
                  <div className="home-highlight-icon">💼</div>
                  <div className="home-highlight-content">
                    <h4>Experience</h4>
                    <p>Specialized in Structural &amp; Architectural Design</p>
                  </div>
                </div>
                <div className="home-highlight-item" data-aos="zoom-in" data-aos-delay="300">
                  <div className="home-highlight-icon">📍</div>
                  <div className="home-highlight-content">
                    <h4>Location</h4>
                    <p>{SITE.location}, West Bengal, India</p>
                  </div>
                </div>
              </div>

              <div className="home-about-cta" data-aos="fade-up">
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
    </>
  );
}

export default HomePage;