/**
 * ProjectCard — gallery card that opens a modal on click.
 *
 * @param {Object}   project          - Project data object
 * @param {Function} [onClick]        - Callback fired with the project when clicked
 */
function ProjectCard({ project, onClick }) {
  const handleClick = () => {
    if (onClick) onClick(project);
  };

  return (
    <div
      className="project-card"
      data-category={project.category}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && handleClick()}
      aria-label={`View details for ${project.title}`}
    >
      <div className="project-image-wrapper">
        <img
          src={project.image}
          alt={project.title}
          className="project-image-real"
          loading="lazy"
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