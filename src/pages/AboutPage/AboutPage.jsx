import { useEffect } from "react";

import { SkillCard, EducationItem } from "../../components/cards";
import { skills }    from "../../data/skills";
import { education } from "../../data/education";
import { SITE }      from "../../config/constants";

import "./aboutpage.css";

function AboutPage() {
  useEffect(() => {
    if (window.AOS) window.AOS.init({ duration: 800, once: true });
  }, []);

  return (
    <>
      {/* ── Page Header ──────────────────────────────── */}
      <section className="about-page-header">
        <div className="about-animated-bg">
          <div className="about-shape about-shape-1" />
          <div className="about-shape about-shape-2" />
          <div className="about-shape about-shape-3" />
          <div className="about-animated-grid" />
        </div>
        <div className="container">
          <h1 className="about-page-title" data-aos="fade-down">
            <span className="about-page-label">PROFILE</span>
            ABOUT ME
          </h1>
          <p className="about-page-description" data-aos="fade-up" data-aos-delay="200">
            Passionate about creating sustainable infrastructure that serves communities.
          </p>
        </div>
      </section>

      {/* ── About Content ────────────────────────────── */}
      <section className="about-content-section">
        <div className="container">
          <div className="about-grid">

            {/* Education */}
            <div className="about-edu-section" data-aos="fade-left">
              <h2 className="about-subtitle">Education &amp; Certifications</h2>
              <div className="about-education-timeline">
                {education.map((item, i) => (
                  <EducationItem key={i} {...item} />
                ))}
              </div>
            </div>

            {/* Skills */}
            <div className="about-skills-section" data-aos="fade-right">
              <h2 className="about-subtitle">Core Skills</h2>
              <div className="about-skills-grid">
                {skills.map((skill, i) => (
                  <SkillCard key={i} {...skill} />
                ))}
              </div>
            </div>

            {/* Professional Summary */}
            <div className="about-summary-section" data-aos="fade-up">
              <h2 className="about-subtitle">Professional Summary</h2>
              <p className="about-body-text">
                Civil engineer with 5+ years of experience specializing in residential and commercial
                structural design. Completed B.Tech from Surendra Institute of Engineering and
                Management in 2020. Expert in AutoCAD 2D, structural analysis, and sustainable
                building practices.
              </p>
              <p className="about-body-text">
                My design philosophy combines traditional engineering principles with modern
                technologies like BIM and Vastu Shastra. Committed to delivering safe,
                cost-effective, and aesthetically pleasing structures.
              </p>
            </div>

            {/* Contact Card */}
            <div className="about-sidebar-section">
              <div className="about-contact-card" data-aos="flip-left">
                <h3>Get In Touch</h3>
                <div className="about-contact-info">
                  <a href={`mailto:${SITE.email}`} className="about-contact-link">
                    <span className="about-contact-icon">✉️</span>
                    <span>{SITE.email}</span>
                  </a>
                  <a href={`tel:${SITE.phone}`} className="about-contact-link">
                    <span className="about-contact-icon">📱</span>
                    <span>{SITE.phone}</span>
                  </a>
                  <span className="about-contact-link">
                    <span className="about-contact-icon">📍</span>
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