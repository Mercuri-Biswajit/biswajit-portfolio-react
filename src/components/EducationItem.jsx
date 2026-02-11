function EducationItem({ year, degree, school }) {
  return (
    <div className="education-item">
      <div className="education-icon">🎓</div>
      <div>
        <div className="education-year">{year}</div>
        <h4 className="education-degree">{degree}</h4>
        <p className="education-school">{school}</p>
      </div>
    </div>
  );
}

export default EducationItem;
