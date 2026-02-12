function ProjectCard({ project, onClick }) {
  return (
    <div
      className="project-card"
      data-category={project.category}
      onClick={() => onClick && onClick(project)}
    >
      <div className="project-card-header">
        <div className="project-card-id">B-{project.id}</div>
        <button className="project-card-expand" aria-label="Expand project">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M14 2L2 14M14 2H8M14 2V8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>

      <h3 className="project-card-title">{project.title}</h3>
      <p className="project-card-description">{project.description}</p>

      <div className="project-card-footer">
        <div className="project-card-info-grid">
          <div className="project-card-info-item">
            <span className="project-card-info-label">Plot Area</span>
            <span className="project-card-info-value">{project.plotArea || 'N/A'}</span>
          </div>
          <div className="project-card-info-item">
            <span className="project-card-info-label">Est. Cost</span>
            <span className="project-card-info-value">{project.estimatedCost || 'N/A'}</span>
          </div>
          <div className="project-card-info-item">
            <span className="project-card-info-label">Structure</span>
            <span className="project-card-info-value">{project.structure || 'N/A'}</span>
          </div>
          <div className="project-card-info-item">
            <span className="project-card-info-label">Foundation</span>
            <span className="project-card-info-value">{project.foundation || 'N/A'}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProjectCard;