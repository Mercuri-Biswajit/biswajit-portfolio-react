import { useEffect } from 'react';

function ProjectModal({ project, onClose }) {
  // Close on ESC
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

  return (
    <div className="project-modal active" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="project-modal-content">
        <button className="project-modal-close" onClick={onClose}>&times;</button>
        <img src={project.image} alt={project.title} className="project-modal-image" />
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