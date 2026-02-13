import { useEffect } from "react";

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

      {/* ── About Content ────────────────────────────── */}
      <section className="about-page">
        <div className="container">
          <div className="about-grid">
            {/* Skills */}
            <div className="about-section" data-aos="fade-right">
              <h2 className="section-subtitle">Core Skills</h2>
              <div className="skills-grid">
                {skills.map((skill, i) => (
                  <SkillCard key={i} {...skill} />
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
                  <EducationItem key={i} {...item} />
                ))}
              </div>
            </div>

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
    </>
  );
}

export default AboutPage;
