function SkillCard({ icon, name, description }) {
  return (
    <div className="skill-card">
      <div className="skill-icon">{icon}</div>
      <h3 className="skill-name">{name}</h3>
      <p className="skill-description">{description}</p>
    </div>
  );
}

export default SkillCard;
