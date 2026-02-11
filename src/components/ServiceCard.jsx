function ServiceCard({ icon, name, price, description, features, popular }) {
  return (
    <div className={`services-card ${popular ? "popular" : ""}`}>
      {popular && <div className="services-badge">RECOMMENDED</div>}
      <div className="services-icon">{icon}</div>
      <h3 className="services-name">{name}</h3>
      <div className="services-price">{price}</div>
      <p className="services-description">{description}</p>
      <ul className="services-features">
        {features.map((f, i) => (
          <li key={i}>{f}</li>
        ))}
      </ul>
    </div>
  );
}

export default ServiceCard;
