function EducationItem({ icon = "🎓", year, degree, school, details = [], index }) {
  return (
    <div className="education-item">

      {/* Ghost index watermark */}
      <span className="education-item-watermark" aria-hidden="true">
        {String((index ?? 0) + 1).padStart(2, "0")}
      </span>

      {/* Top row: icon badge + degree name */}
      <div className="education-item-header">
        <div className="education-icon-badge">
          <span className="education-icon">{icon}</span>
        </div>
        <div className="education-item-meta">
          <span className="education-year">{year}</span>
          <h4 className="education-degree">{degree}</h4>
          <span className="education-school">{school}</span>
        </div>
      </div>

      {/* Divider rule */}
      <span className="education-item-rule" aria-hidden="true" />

      {/* Detail list */}
      <ul className="education-details">
        {details.map((detail, i) => (
          <li key={i} className="education-detail-item">
            <span className="education-detail-dot" aria-hidden="true" />
            {detail}
          </li>
        ))}
      </ul>

      {/* Bottom accent foot bar */}
      <span className="education-item-foot" aria-hidden="true" />

    </div>
  );
}

export default EducationItem;