export function HeroSection({ mainTab, onTabChange }) {
  const tabs = [
    {
      key: "costing",
      icon: "💰",
      label: "ESTIMATE COSTING",
      desc: "Complete building cost estimation",
    },
    {
      key: "beam",
      icon: "🏗️",
      label: "BEAM DESIGN",
      desc: "RCC beam structural analysis",
    },
    {
      key: "column",
      icon: "🏛️",
      label: "COLUMN DESIGN",
      desc: "Column load capacity design",
    },
  ];

  return (
    <section className="calc-hero-section">
      <div className="container">
        <div className="calc-hero-content">
          <div className="calc-hero-text">
            <span className="calc-hero-label">PROFESSIONAL TOOLS</span>
            <h1 className="calc-hero-title">Construction Calculator Suite</h1>
            <p className="calc-hero-description">
              IS 456:2000 compliant tools for cost estimation, beam design, and column design
            </p>
          </div>

          <div className="calc-main-tabs-hero">
            {tabs.map(({ key, icon, label, desc }) => (
              <button
                key={key}
                className={`calc-main-tab-hero ${mainTab === key ? "active" : ""}`}
                onClick={() => onTabChange(key)}
              >
                <div className="calc-tab-icon-hero">{icon}</div>
                <div className="calc-tab-content-hero">
                  <div className="calc-tab-label-hero">{label}</div>
                  <div className="calc-tab-desc-hero">{desc}</div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}