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

          <p className="project-modal-description">{project.description}</p>

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