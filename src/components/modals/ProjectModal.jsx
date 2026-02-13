import { useEffect } from 'react';

/**
 * ProjectModal — full-screen overlay showing project details.
 *
 * @param {Object}   project  - Project data object (or null)
 * @param {Function} onClose  - Callback to close the modal
 */
function ProjectModal({ project, onClose }) {
  // Close on ESC key; lock body scroll while open
  useEffect(() => {
    const handleKey = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  if (!project) return null;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div
      className="project-modal active"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-label={project.title}
    >
      <div className="project-modal-content">
        <button
          className="project-modal-close"
          onClick={onClose}
          aria-label="Close modal"
        >
          &times;
        </button>

        <img
          src={project.image}
          alt={project.title}
          className="project-modal-image"
        />

        <div className="project-modal-body">
          <div className="project-modal-header">
            <div className="project-modal-category">{project.category}</div>
            <h2 className="project-modal-title">{project.title}</h2>
          </div>

          {/* Project Info Grid */}
          <div className="project-modal-info-grid">
            <div className="project-modal-info-item">
              <span className="project-modal-info-label">Plot Area</span>
              <span className="project-modal-info-value">{project.plotArea || 'N/A'}</span>
            </div>
            <div className="project-modal-info-item">
              <span className="project-modal-info-label">Estimated Cost</span>
              <span className="project-modal-info-value">{project.estimatedCost || 'N/A'}</span>
            </div>
            <div className="project-modal-info-item">
              <span className="project-modal-info-label">Structure Type</span>
              <span className="project-modal-info-value">{project.structure || 'N/A'}</span>
            </div>
            <div className="project-modal-info-item">
              <span className="project-modal-info-label">Foundation</span>
              <span className="project-modal-info-value">{project.foundation || 'N/A'}</span>
            </div>
          </div>

          {/* Combined Description with HTML rendering */}
          <div 
            className="project-modal-description"
            dangerouslySetInnerHTML={{ __html: project.description }}
          />

          <div className="project-modal-tags">
            {project.tags.map((tag, i) => (
              <span key={i} className="project-modal-tag">{tag}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProjectModal;