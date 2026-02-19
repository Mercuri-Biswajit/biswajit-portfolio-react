import { useEffect } from "react";
import { Helmet } from "react-helmet-async";

import { SkillCard, EducationItem } from "../../components/cards";
import { skills } from "../../data/skills";
import { education } from "../../data/education";
import { SITE } from "../../config/constants";

import "./AboutPage.css";

function AboutPage() {
  useEffect(() => {
    if (window.AOS) window.AOS.init({ duration: 800, once: true });
  }, []);

  return (
    <>
      <Helmet>
        <title>{SITE.seo.about.title}</title>
        <meta name="description" content={SITE.seo.about.description} />
        <link rel="canonical" href={SITE.seo.about.canonical} />
      </Helmet>
      {/* ── Page Header ──────────────────────────────── */}
      <section className="page-header">
        <div className="hero-animated-bg">
          <div className="animated-shape shape-1" />
          <div className="animated-shape shape-2" />
          <div className="animated-shape shape-3" />
          <div className="animated-grid" />
        </div>
        <div className="container">
          <h1 className="page-title" data-aos="fade-down">
            <span className="page-label">PROFILE</span>
            ABOUT ME
          </h1>
          <p
            className="page-description"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            Passionate about creating sustainable infrastructure that serves
            communities.
          </p>
        </div>
      </section>

      {/* ── Skill and Education ────────────────────────────── */}
      <section className="about-page">
        <div className="container">
          <div className="about-grid">
            {/* Skills */}
            <div className="about-section" data-aos="fade-right">
              <h2 className="section-subtitle">Core Skills</h2>
              <div className="skills-grid">
                {skills.map((skill, i) => (
                  <SkillCard key={i} {...skill} index={i} />
                ))}
              </div>
            </div>

            {/* Education */}
            <div className="about-section" data-aos="fade-left">
              <h2 className="section-subtitle">
                Education &amp; Certifications
              </h2>
              <div className="education-timeline">
                {education.map((item, i) => (
                  <EducationItem key={i} {...item} index={i} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Professional Summary ────────────────────────────── */}
      <section className="contact-section">
        <div className="container">
          <div className="about-grid">
            {/* Professional Summary */}
            <div className="about-main">
              <div className="about-section" data-aos="fade-up">
                <h2 className="section-subtitle">Professional Summary</h2>
                <p className="about-text">
                  Civil engineer with 5+ years of experience specializing in
                  residential and commercial structural design. Completed B.Tech
                  from Surendra Institute of Engineering and Management in 2020.
                  Expert in AutoCAD 2D, structural analysis, and sustainable
                  building practices.
                </p>
                <p className="about-text">
                  My design philosophy combines traditional engineering
                  principles with modern technologies like BIM and Vastu
                  Shastra. Committed to delivering safe, cost-effective, and
                  aesthetically pleasing structures.
                </p>
              </div>
            </div>

            {/* Contact Card */}
            <div className="about-sidebar">
              <div className="contact-card" data-aos="flip-left">
                <h3>Get In Touch</h3>
                <div className="contact-info">
                  <a href={`mailto:${SITE.email}`} className="contact-link">
                    <span className="contact-icon">✉️</span>
                    <span>{SITE.email}</span>
                  </a>
                  <a href={`tel:${SITE.phone}`} className="contact-link">
                    <span className="contact-icon">📱</span>
                    <span>{SITE.phone}</span>
                  </a>
                  <span className="contact-link">
                    <span className="contact-icon">📍</span>
                    <span>{SITE.location}</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Contact Section ──────────────────────────── */}
      <section className="contact-section">
        <div className="container">
          <div className="section-header" data-aos="fade-up">
            <h2 className="section-subtitle">Let's Work Together</h2>
          </div>

          <div
            className="contact-content"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            <div className="contact-intro">
              <p>
                Have a project in mind? Whether you need structural design, cost
                estimation, or architectural planning, I'm here to help bring
                your vision to life. Get in touch and let's discuss how we can
                work together.
              </p>
            </div>

            <div className="contact-methods">
              <div
                className="contact-method"
                data-aos="zoom-in"
                data-aos-delay="100"
              >
                <div className="method-icon">📧</div>
                <h3 className="method-title">Email Me</h3>
                <p className="method-description">
                  Send me a detailed message about your project
                </p>
                <a href={`mailto:${SITE.email}`} className="method-link">
                  {SITE.email}
                </a>
              </div>

              <div
                className="contact-method"
                data-aos="zoom-in"
                data-aos-delay="200"
              >
                <div className="method-icon">📱</div>
                <h3 className="method-title">Call Me</h3>
                <p className="method-description">
                  Speak directly about your requirements
                </p>
                <a href={`tel:${SITE.phone}`} className="method-link">
                  {SITE.phone}
                </a>
              </div>

              <div
                className="contact-method"
                data-aos="zoom-in"
                data-aos-delay="300"
              >
                <div className="method-icon">💼</div>
                <h3 className="method-title">Connect on LinkedIn</h3>
                <p className="method-description">
                  View my professional profile and network
                </p>
                <a
                  href={SITE.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="method-link"
                >
                  LinkedIn Profile
                </a>
              </div>
            </div>

            <div
              className="contact-social"
              data-aos="fade-up"
              data-aos-delay="400"
            >
              <p className="social-label">Follow Me On Social Media</p>
              <div className="social-links">
                <a
                  href={SITE.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link"
                  aria-label="Facebook"
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>
                <a
                  href={SITE.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link"
                  aria-label="Instagram"
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
                <a
                  href={SITE.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link"
                  aria-label="LinkedIn"
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>
              </div>
            </div>

            <div
              className="contact-availability"
              data-aos="fade-up"
              data-aos-delay="500"
            >
              <div className="availability-badge">
                <span className="availability-dot"></span>
                <span className="availability-text">
                  Available for New Projects
                </span>
              </div>
              <p className="availability-info">
                Currently accepting new projects for structural design,
                architectural planning, and cost estimation services.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default AboutPage;
