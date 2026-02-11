function ProjectCard({ project, onClick }) {
  return (
    <div
      className="project-card"
      data-category={project.category}
      onClick={() => onClick && onClick(project)}
    >
      <div className="project-image-wrapper">
        <img
          src={project.image}
          alt={project.title}
          className="project-image-real"
        />
        <div className="project-image-overlay">
          <div className="project-gallery-info">
            <div className="project-category">{project.category}</div>
            <h3 className="project-title">{project.title}</h3>
          </div>
        </div>
      </div>
      <div className="project-view-hint">Click to view details</div>
    </div>
  );
}

export default ProjectCard;