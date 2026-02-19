function SkillCard({ icon, name, items = [], index }) {
  return (
    <div className="skill-card">
      {/* Ghost index watermark */}
      <span className="skill-card-watermark" aria-hidden="true">
        {String(index + 1).padStart(2, "0")}
      </span>

      {/* Top row: icon badge + name */}
      <div className="skill-card-header">
        <div className="skill-icon-badge">
          <span className="skill-icon">{icon}</span>
        </div>
        <h3 className="skill-name">{name}</h3>
      </div>

      {/* Divider rule */}
      <span className="skill-card-rule" aria-hidden="true" />

      {/* Sub-skill list */}
      <ul className="skill-items">
        {items.map((item, i) => (
          <li key={i} className="skill-item">
            <span className="skill-item-dot" aria-hidden="true" />
            {item}
          </li>
        ))}
      </ul>

      {/* Bottom accent bar */}
      <span className="skill-card-foot" aria-hidden="true" />
    </div>
  );
}

export default SkillCard;