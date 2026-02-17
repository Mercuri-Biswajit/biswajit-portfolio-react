function SkillCard({ icon, name, description, index }) {
  return (
    <div className="skill-card">
      {/* Bold left accent bar */}
      <span className="skill-card-bar" aria-hidden="true" />

      {/* Card number — top right */}
      <span className="skill-card-num" aria-hidden="true">
        {String(index + 1).padStart(2, "0")}
      </span>

      {/* Static face — always visible */}
      <div className="skill-card-face">
        <div className="skill-icon-wrap">
          <span className="skill-icon">{icon}</span>
        </div>
        <div className="skill-card-text">
          <h3 className="skill-name">{name}</h3>
          <p className="skill-description">{description}</p>
        </div>
      </div>

      {/* Navy slide-in overlay on hover */}
      <div className="skill-card-hover" aria-hidden="true">
        <span className="skill-hover-icon">{icon}</span>
        <span className="skill-hover-name">{name}</span>
        <span className="skill-hover-desc">{description}</span>
      </div>
    </div>
  );
}

export default SkillCard;
