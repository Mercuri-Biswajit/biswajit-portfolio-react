function EducationItem({ year, degree, school, index }) {
  return (
    <div className="education-item">

      {/* Left accent bar */}
      <span className="education-item-bar" aria-hidden="true" />

      {/* Number tag — top right */}
      <span className="education-item-num" aria-hidden="true">
        {String((index ?? 0) + 1).padStart(2, "0")}
      </span>

      {/* Static face */}
      <div className="education-item-face">
        <div className="education-icon-wrap">
          <span className="education-icon">🎓</span>
        </div>
        <div className="education-item-text">
          <span className="education-year">{year}</span>
          <h4 className="education-degree">{degree}</h4>
          <span className="education-school">{school}</span>
        </div>
      </div>

      {/* Navy slide-up overlay */}
      <div className="education-item-hover" aria-hidden="true">
        <span className="education-hover-icon">🎓</span>
        <span className="education-hover-year">{year}</span>
        <span className="education-hover-degree">{degree}</span>
        <span className="education-hover-school">{school}</span>
      </div>

    </div>
  );
}

export default EducationItem;