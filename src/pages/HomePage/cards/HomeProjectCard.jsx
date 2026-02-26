/**
 * HomeProjectCard
 * ─────────────────────────────────────────────────────────────────
 * A FULLY SELF-CONTAINED project card for the HomePage "Featured Work"
 * section. It has ZERO dependency on ProjectPage.css or ProjectPage.jsx.
 *
 * All styles are inlined via a <style> tag injected once on mount.
 * Changing the ProjectPage timeline design will NEVER break this card.
 *
 * Usage in HomePage.jsx:
 *   import { HomeProjectCard } from "./HomeProjectCard";
 *   ...
 *   <HomeProjectCard project={project} onClick={setSelectedProject} />
 * ─────────────────────────────────────────────────────────────────
 */

import { useEffect } from "react";

// ── Inject styles once ───────────────────────────────────────────
const STYLE_ID = "home-project-card-styles";

function injectStyles() {
  if (document.getElementById(STYLE_ID)) return;
  const style = document.createElement("style");
  style.id = STYLE_ID;
  style.textContent = `
    /* ── HomeProjectCard — scoped styles ── */
    .hpc-card {
      position: relative;
      display: flex;
      flex-direction: column;
      background: #ffffff;
      border: 2px solid #E2E8F0;
      border-radius: 14px;
      overflow: hidden;
      cursor: pointer;
      transition: transform 0.3s cubic-bezier(0.4,0,0.2,1),
                  box-shadow 0.3s ease,
                  border-color 0.25s ease;
      box-shadow: 0 1px 4px rgba(0,0,0,0.05);
    }

    .hpc-card::before {
      content: '';
      position: absolute;
      top: 0; left: -100%;
      width: 100%; height: 100%;
      background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
      transition: left 0.55s ease;
      z-index: 1;
      pointer-events: none;
    }

    .hpc-card:hover::before { left: 100%; }

    .hpc-card:hover {
      transform: translateY(-7px);
      box-shadow: 0 12px 32px rgba(0,51,102,0.12);
      border-color: #003366;
    }

    /* Image */
    .hpc-image {
      position: relative;
      width: 100%;
      height: 220px;
      overflow: hidden;
      flex-shrink: 0;
      background: #f4f4f4;
    }

    .hpc-img {
      width: 100%; height: 100%;
      object-fit: cover;
      display: block;
      transition: transform 0.55s ease;
    }

    .hpc-card:hover .hpc-img { transform: scale(1.06); }

    .hpc-overlay {
      position: absolute;
      inset: 0;
      background: linear-gradient(to bottom, transparent 40%, rgba(0,0,0,0.42) 100%);
      display: flex;
      align-items: flex-end;
      padding: 0.75rem 1rem;
    }

    .hpc-badge {
      font-size: 0.68rem;
      font-weight: 700;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      color: #fff;
      background: #003366;
      padding: 0.25rem 0.75rem;
      border-radius: 999px;
      line-height: 1.6;
    }

    .hpc-badge.commercial { background: #3b82c4; }

    /* Body */
    .hpc-body {
      display: flex;
      flex-direction: column;
      flex: 1;
      padding: 1.25rem 1.4rem 1.4rem;
    }

    .hpc-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 0.5rem;
    }

    .hpc-id {
      font-size: 0.78rem;
      font-weight: 700;
      color: #003366;
      letter-spacing: 0.07em;
      text-transform: uppercase;
    }

    .hpc-expand {
      background: #f4f4f4;
      border: 1px solid #E2E8F0;
      color: #003366;
      width: 26px; height: 26px;
      border-radius: 7px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      opacity: 0.65;
      transition: all 0.2s ease;
      flex-shrink: 0;
    }

    .hpc-expand:hover {
      opacity: 1;
      background: #003366;
      border-color: #003366;
      color: #fff;
      transform: translate(1px,-1px);
    }

    .hpc-title {
      font-size: 1.15rem;
      font-weight: 700;
      color: #1E293B;
      margin: 0 0 0.5rem;
      line-height: 1.35;
    }

    .hpc-desc {
      font-size: 0.84rem;
      color: #64748B;
      line-height: 1.65;
      margin: 0 0 1rem;
      flex-grow: 1;
    }

    /* Case study highlights */
    .hpc-cs {
      padding: 0.75rem 0.9rem;
      background: #fafafa;
      border: 1px solid #E2E8F0;
      border-radius: 9px;
      margin-bottom: 0.9rem;
      display: flex;
      flex-direction: column;
      gap: 0.4rem;
    }

    .hpc-cs-row {
      display: flex;
      gap: 0.45rem;
      align-items: flex-start;
    }

    .hpc-cs-icon { font-size: 0.8rem; line-height: 1.6; flex-shrink: 0; }

    .hpc-cs-label {
      font-size: 0.62rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      color: #003366;
      display: block;
    }

    .hpc-cs-text {
      font-size: 0.79rem;
      color: #64748B;
      line-height: 1.5;
      display: block;
    }

    .hpc-pills {
      display: flex;
      flex-wrap: wrap;
      gap: 0.35rem;
      margin-top: 0.1rem;
    }

    .hpc-pill {
      padding: 0.22rem 0.6rem;
      background: #fff;
      border: 1px solid #E2E8F0;
      border-radius: 20px;
      display: flex;
      flex-direction: column;
      gap: 0.04rem;
    }

    .hpc-pill-label {
      font-size: 0.58rem;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: #94A3B8;
      font-weight: 600;
    }

    .hpc-pill-value {
      font-size: 0.74rem;
      font-weight: 700;
      color: #003366;
    }

    /* Footer */
    .hpc-footer {
      padding-top: 0.85rem;
      border-top: 1px solid #E2E8F0;
      margin-top: auto;
    }

    .hpc-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 0.5rem;
    }

    .hpc-item { display: flex; flex-direction: column; gap: 0.15rem; }

    .hpc-item-label {
      font-size: 0.62rem;
      color: #94A3B8;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    .hpc-item-value {
      font-size: 0.84rem;
      color: #1E293B;
      font-weight: 700;
    }
  `;
  document.head.appendChild(style);
}

// ════════════════════════════════════════════════════════════════
// HomeProjectCard component
// ════════════════════════════════════════════════════════════════

export function HomeProjectCard({ project, onClick }) {
  useEffect(() => {
    injectStyles();
  }, []);

  if (!project) return null;

  const idStr = String(project.id).padStart(2, "0");
  const isCommercial = project.category === "COMMERCIAL";

  const plainDesc = project.description
    ? project.description.replace(/<[^>]*>/g, "").slice(0, 120) + "…"
    : "";

  const RESULT_LABELS = {
    costSaving: "Cost Saving",
    timeToComplete: "Time",
    clientSatisfaction: "Satisfaction",
    structuralRating: "Compliance",
  };

  return (
    <div
      className="hpc-card"
      onClick={() => onClick(project)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && onClick(project)}
      aria-label={`Open ${project.title}`}
    >
      {/* Image */}
      {project.image && (
        <div className="hpc-image">
          <img
            src={project.image}
            alt={project.title}
            className="hpc-img"
            loading="lazy"
          />
          <div className="hpc-overlay">
            <span className={`hpc-badge${isCommercial ? " commercial" : ""}`}>
              {project.category}
            </span>
          </div>
        </div>
      )}

      {/* Body */}
      <div className="hpc-body">
        <div className="hpc-header">
          <span className="hpc-id">Project #{idStr}</span>
          <button
            className="hpc-expand"
            aria-label="Open project details"
            onClick={(e) => {
              e.stopPropagation();
              onClick(project);
            }}
          >
            <svg
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.4"
            >
              <path d="M7 17L17 7M17 7H7M17 7v10" />
            </svg>
          </button>
        </div>

        <h3 className="hpc-title">{project.title}</h3>
        <p className="hpc-desc">{plainDesc}</p>

        {/* Case study highlights */}
        {project.caseStudy && (
          <div className="hpc-cs">
            <div className="hpc-cs-row">
              <span className="hpc-cs-icon">🎯</span>
              <div>
                <span className="hpc-cs-label">Problem</span>
                <span className="hpc-cs-text">
                  {project.caseStudy.problem?.slice(0, 80)}…
                </span>
              </div>
            </div>
            {project.caseStudy.results && (
              <div className="hpc-pills">
                {Object.entries(project.caseStudy.results)
                  .slice(0, 3)
                  .map(([key, value]) => (
                    <div key={key} className="hpc-pill">
                      <span className="hpc-pill-label">
                        {RESULT_LABELS[key] ?? key}
                      </span>
                      <span className="hpc-pill-value">{value}</span>
                    </div>
                  ))}
              </div>
            )}
          </div>
        )}

        {/* Footer */}
        <div className="hpc-footer">
          <div className="hpc-grid">
            {[
              ["Plot Area", project.plotArea],
              ["Est. Cost", project.estimatedCost],
              ["Structure", project.structure],
              ["Foundation", project.foundation],
            ].map(([label, value]) => (
              <div key={label} className="hpc-item">
                <span className="hpc-item-label">{label}</span>
                <span className="hpc-item-value">{value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomeProjectCard;
