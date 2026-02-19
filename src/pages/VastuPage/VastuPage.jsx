import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { SITE } from "../../config/constants";

import VastuRoomPlanner from "./VastuRoomPlanner";
import VastuStudy from "./VastuStudy";
import "./VastuPage.css";

export default function VastuPage() {
  const [mainTab, setMainTab] = useState("planner"); // "planner" | "study"

  useEffect(() => {
    if (window.AOS) window.AOS.init({ duration: 800, once: true });
  }, []);

  return (
    <>
    <Helmet>
        <title>{SITE.seo.vastu.title}</title>
        <meta name="description" content={SITE.seo.vastu.description} />
        <link rel="canonical" href={SITE.seo.vastu.canonical} />
      </Helmet>
    <div className="vastu-page">
      {/* ── Hero Section ── */}
      <section className="vastu-hero">
        <div className="vastu-hero-bg">
          <div className="animated-shape shape-1" />
          <div className="animated-shape shape-2" />
          <div className="animated-shape shape-3" />
          <div className="animated-grid" />
        </div>
        <div className="container">
          <div className="vastu-hero-content" data-aos="fade-up">
            <span className="vastu-hero-label">वास्तु शास्त्र</span>
            <h1 className="vastu-hero-title">Vastu Shastra Guide</h1>
            <p className="vastu-hero-description">
              Ancient Indian science of architecture and design for harmonious
              living spaces. Create balance between nature's five elements and
              enhance positive energy in your home.
            </p>
          </div>
        </div>
      </section>

      {/* ── Primary Feature Tabs ── */}
      <section className="vastu-feature-tabs-section">
        <div className="container">
          <div className="vastu-feature-tabs">
            <button
              className={`vastu-feature-tab ${mainTab === "planner" ? "active" : ""}`}
              onClick={() => setMainTab("planner")}
            >
              <span className="vft-icon">🏗️</span>
              <span className="vft-label">Room Planner</span>
              <span className="vft-desc">
                Generate a Vastu layout from your plot specs
              </span>
            </button>

            <button
              className={`vastu-feature-tab ${mainTab === "study" ? "active" : ""}`}
              onClick={() => setMainTab("study")}
            >
              <span className="vft-icon">📖</span>
              <span className="vft-label">Vastu Study</span>
              <span className="vft-desc">
                Principles, directions, colors & remedies
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* ── Room Planner Panel ── */}
      {mainTab === "planner" && (
        <section className="vastu-main-content">
          <div className="container">
            <VastuRoomPlanner />
          </div>
        </section>
      )}

      {/* ── Vastu Study Panel ── */}
      {mainTab === "study" && <VastuStudy />}
    </div>
    </>
  );
}
