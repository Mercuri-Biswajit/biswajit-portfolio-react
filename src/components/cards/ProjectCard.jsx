import React, { useState, useMemo } from "react";

export function ProjectCard({ project, onClick }) {
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const plainDescription = useMemo(() => {
    if (!project) return "";
    if (project.shortDescription) return project.shortDescription;
    if (!project.description) return "";
    try {
      const div = document.createElement("div");
      div.innerHTML = project.description;
      return div.textContent || div.innerText || "";
    } catch {
      return project.description;
    }
  }, [project]);

  if (!project) return null;

  const {
    id,
    title,
    category,
    image,
    plotArea,
    estimatedCost,
    structure,
    foundation,
    caseStudy,
  } = project;

  const hasCaseStudy = !!caseStudy;

  const descPreview =
    plainDescription.length > 160
      ? plainDescription.slice(0, 157).trimEnd() + "…"
      : plainDescription;

  return (
    <>
      <div className="project-card" role="article">
        {/* ── Left: Image — click = lightbox ─────────── */}
        <div
          className="project-card-image"
          onClick={() => setLightboxOpen(true)}
          role="button"
          tabIndex={0}
          title="Click to view image"
          onKeyDown={(e) => e.key === "Enter" && setLightboxOpen(true)}
          style={{ cursor: "zoom-in" }}
        >
          <img src={image} alt={title} className="project-card-img" />
          <div className="project-card-image-overlay">
            <span className="project-card-category-badge">{category}</span>
          </div>
          {/* zoom hint icon */}
          <div className="project-card-zoom-hint">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
              <line x1="11" y1="8" x2="11" y2="14" />
              <line x1="8" y1="11" x2="14" y2="11" />
            </svg>
          </div>
        </div>

        {/* ── Right: Content — click = modal ─────────── */}
        <div
          className="project-card-body"
          onClick={() => onClick(project)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === "Enter" && onClick(project)}
          style={{ cursor: "pointer" }}
        >
          {/* Header */}
          <div className="project-card-header">
            <span className="project-card-id">
              PROJECT #{String(id).padStart(2, "0")}
            </span>
            <button
              className="project-card-expand"
              onClick={(e) => {
                e.stopPropagation();
                onClick(project);
              }}
              aria-label="Open full project details"
              title="Open full details"
            >
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="15 3 21 3 21 9" />
                <polyline points="9 21 3 21 3 15" />
                <line x1="21" y1="3" x2="14" y2="10" />
                <line x1="3" y1="21" x2="10" y2="14" />
              </svg>
            </button>
          </div>

          {/* Title */}
          <h3 className="project-card-title">{title}</h3>

          {/* Description */}
          <p className="project-card-description">{descPreview}</p>

          {/* Case Study Highlights */}
          {hasCaseStudy && (
            <div className="project-card-case-study">
              {caseStudy.problem && (
                <div className="project-card-cs-row">
                  <span className="project-card-cs-icon">🎯</span>
                  <div className="project-card-cs-content">
                    <span className="project-card-cs-label">Problem</span>
                    <span className="project-card-cs-text">
                      {caseStudy.problem.length > 100
                        ? caseStudy.problem.slice(0, 97) + "…"
                        : caseStudy.problem}
                    </span>
                  </div>
                </div>
              )}
              {caseStudy.results && (
                <div className="project-card-cs-results">
                  {Object.entries(caseStudy.results)
                    .slice(0, 3)
                    .map(([key, value]) => {
                      const labelMap = {
                        costSaving: "Cost Saving",
                        timeToComplete: "Time",
                        clientSatisfaction: "Satisfaction",
                        structuralRating: "Compliance",
                      };
                      return (
                        <div key={key} className="project-card-cs-result-pill">
                          <span className="project-card-cs-result-label">
                            {labelMap[key] ?? key}
                          </span>
                          <span className="project-card-cs-result-value">
                            {value}
                          </span>
                        </div>
                      );
                    })}
                </div>
              )}
            </div>
          )}

          {/* Footer meta */}
          <div className="project-card-footer">
            <div className="project-card-info-grid">
              <div className="project-card-info-item">
                <span className="project-card-info-label">Plot Area</span>
                <span className="project-card-info-value">{plotArea}</span>
              </div>
              <div className="project-card-info-item">
                <span className="project-card-info-label">Est. Cost</span>
                <span className="project-card-info-value">{estimatedCost}</span>
              </div>
              <div className="project-card-info-item">
                <span className="project-card-info-label">Structure</span>
                <span className="project-card-info-value">{structure}</span>
              </div>
              <div className="project-card-info-item">
                <span className="project-card-info-label">Foundation</span>
                <span className="project-card-info-value">{foundation}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Image Lightbox ─────────────────────────────── */}
      {lightboxOpen && (
        <div
          className="image-lightbox"
          onClick={() => setLightboxOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label={`Image of ${title}`}
        >
          <button
            className="image-lightbox-close"
            onClick={() => setLightboxOpen(false)}
            aria-label="Close image"
          >
            ✕
          </button>
          <img
            src={image}
            alt={title}
            className="image-lightbox-img"
            onClick={(e) => e.stopPropagation()}
          />
          <p className="image-lightbox-caption">{title}</p>
        </div>
      )}
    </>
  );
}

export default ProjectCard;
