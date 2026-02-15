import { useEffect, useState } from "react";
import {
  vastuPrinciples,
  vastuRooms,
  vastuDirections,
  vastuColors,
  vastuRemedies,
  vastuDosAndDonts,
} from "../../data/vastu";
import "./VastuPage.css";

function VastuPage() {
  const [activeTab, setActiveTab] = useState("principles");
  const [selectedDirection, setSelectedDirection] = useState("north");

  useEffect(() => {
    if (window.AOS) window.AOS.init({ duration: 800, once: true });
  }, []);

  return (
    <div className="vastu-page">
      {/* Hero Section */}
      <section className="vastu-hero">
        <div className="vastu-hero-bg">
          <div className="animated-shape shape-1" />
          <div className="animated-shape shape-2" />
          <div className="animated-shape shape-3" />
          <div className="animated-grid" />
        </div>
        <div className="container">
          <div className="vastu-hero-content" data-aos="fade-up">
            <span className="vastu-hero-label">वास्तु शास्त्र</span>
            <h1 className="vastu-hero-title">Vastu Shastra Guide</h1>
            <p className="vastu-hero-description">
              Ancient Indian science of architecture and design for harmonious
              living spaces. Create balance between nature's five elements and
              enhance positive energy in your home.
            </p>
          </div>
        </div>
      </section>

      {/* Quick Info Cards */}
      <section className="vastu-quick-info">
        <div className="container">
          <div className="vastu-info-grid" data-aos="fade-up">
            <div className="vastu-info-card">
              <div className="vastu-info-icon">🧭</div>
              <h3>8 Directions</h3>
              <p>Each direction has specific energy and purpose in Vastu</p>
            </div>
            <div className="vastu-info-card">
              <div className="vastu-info-icon">🏠</div>
              <h3>Room Placement</h3>
              <p>Strategic location of rooms for maximum benefits</p>
            </div>
            <div className="vastu-info-card">
              <div className="vastu-info-icon">🌈</div>
              <h3>Color Therapy</h3>
              <p>Colors influence energy and emotions in spaces</p>
            </div>
            <div className="vastu-info-card">
              <div className="vastu-info-icon">⚖️</div>
              <h3>Five Elements</h3>
              <p>Balance of Earth, Water, Fire, Air, and Space</p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Tabs */}
      <section className="vastu-main-content">
        <div className="container">
          <div className="vastu-tabs" data-aos="fade-up">
            <button
              className={`vastu-tab ${activeTab === "principles" ? "active" : ""}`}
              onClick={() => setActiveTab("principles")}
            >
              Core Principles
            </button>
            <button
              className={`vastu-tab ${activeTab === "rooms" ? "active" : ""}`}
              onClick={() => setActiveTab("rooms")}
            >
              Room Guidelines
            </button>
            <button
              className={`vastu-tab ${activeTab === "directions" ? "active" : ""}`}
              onClick={() => setActiveTab("directions")}
            >
              Directional Guide
            </button>
            <button
              className={`vastu-tab ${activeTab === "colors" ? "active" : ""}`}
              onClick={() => setActiveTab("colors")}
            >
              Colors & Elements
            </button>
            <button
              className={`vastu-tab ${activeTab === "remedies" ? "active" : ""}`}
              onClick={() => setActiveTab("remedies")}
            >
              Remedies & Tips
            </button>
          </div>

          {/* Tab Content */}
          <div className="vastu-tab-content">
            {activeTab === "principles" && (
              <div className="vastu-principles-content" data-aos="fade-in">
                <h2 className="vastu-content-title">
                  Fundamental Principles of Vastu Shastra
                </h2>
                <div className="vastu-principles-grid">
                  {vastuPrinciples.map((principle, idx) => (
                    <div
                      key={idx}
                      className="vastu-principle-card"
                      data-aos="zoom-in"
                      data-aos-delay={idx * 100}
                    >
                      <div className="vastu-principle-icon">
                        {principle.icon}
                      </div>
                      <h3>{principle.title}</h3>
                      <p>{principle.description}</p>
                      <ul className="vastu-principle-points">
                        {principle.points.map((point, i) => (
                          <li key={i}>{point}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "rooms" && (
              <div className="vastu-rooms-content" data-aos="fade-in">
                <h2 className="vastu-content-title">
                  Room-by-Room Vastu Guidelines
                </h2>
                <div className="vastu-rooms-grid">
                  {vastuRooms.map((room, idx) => (
                    <div
                      key={idx}
                      className="vastu-room-card"
                      data-aos="slide-up"
                      data-aos-delay={idx * 50}
                    >
                      <div className="vastu-room-header">
                        <div className="vastu-room-icon">{room.icon}</div>
                        <h3>{room.name}</h3>
                        <span className="vastu-room-direction">
                          {room.idealDirection}
                        </span>
                      </div>
                      <div className="vastu-room-body">
                        <p className="vastu-room-description">
                          {room.description}
                        </p>

                        <div className="vastu-room-section">
                          <h4>✓ Best Practices</h4>
                          <ul>
                            {room.dos.map((item, i) => (
                              <li key={i} className="vastu-do">
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="vastu-room-section">
                          <h4>✗ Avoid</h4>
                          <ul>
                            {room.donts.map((item, i) => (
                              <li key={i} className="vastu-dont">
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>

                        {room.additionalTips && (
                          <div className="vastu-room-tips">
                            <strong>💡 Tips:</strong>
                            <ul>
                              {room.additionalTips.map((tip, i) => (
                                <li key={i}>{tip}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "directions" && (
              <div className="vastu-directions-content" data-aos="fade-in">
                <h2 className="vastu-content-title">
                  Directional Significance in Vastu
                </h2>

                {/* Direction Selector */}
                <div className="vastu-direction-selector">
                  <div className="direction-compass">
                    {vastuDirections.map((dir, idx) => (
                      <button
                        key={idx}
                        className={`direction-btn direction-${dir.name.toLowerCase()} ${selectedDirection === dir.name.toLowerCase() ? "active" : ""}`}
                        onClick={() =>
                          setSelectedDirection(dir.name.toLowerCase())
                        }
                      >
                        <span className="direction-icon">{dir.icon}</span>
                        <span className="direction-name">{dir.name}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Direction Details */}
                {vastuDirections.map(
                  (dir) =>
                    selectedDirection === dir.name.toLowerCase() && (
                      <div
                        key={dir.name}
                        className="vastu-direction-details"
                        data-aos="zoom-in"
                      >
                        <div className="direction-header">
                          <div className="direction-icon-large">{dir.icon}</div>
                          <div>
                            <h3>{dir.name}</h3>
                            <p className="direction-deity">
                              Deity: {dir.deity}
                            </p>
                            <p className="direction-element">
                              Element: {dir.element}
                            </p>
                          </div>
                        </div>

                        <p className="direction-description">
                          {dir.description}
                        </p>

                        <div className="direction-grid">
                          <div className="direction-section">
                            <h4>🏠 Best For</h4>
                            <ul>
                              {dir.bestFor.map((item, i) => (
                                <li key={i}>{item}</li>
                              ))}
                            </ul>
                          </div>

                          <div className="direction-section">
                            <h4>🎨 Recommended Colors</h4>
                            <div className="color-chips">
                              {dir.colors.map((color, i) => (
                                <span
                                  key={i}
                                  className="color-chip"
                                  style={{ background: color.code }}
                                >
                                  {color.name}
                                </span>
                              ))}
                            </div>
                          </div>

                          <div className="direction-section">
                            <h4>✨ Benefits</h4>
                            <ul>
                              {dir.benefits.map((benefit, i) => (
                                <li key={i}>{benefit}</li>
                              ))}
                            </ul>
                          </div>

                          <div className="direction-section">
                            <h4>⚠️ Avoid</h4>
                            <ul>
                              {dir.avoid.map((item, i) => (
                                <li key={i}>{item}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    ),
                )}
              </div>
            )}

            {activeTab === "colors" && (
              <div className="vastu-colors-content" data-aos="fade-in">
                <h2 className="vastu-content-title">
                  Vastu Colors & Five Elements
                </h2>

                <div className="vastu-colors-grid">
                  {vastuColors.map((colorGroup, idx) => (
                    <div
                      key={idx}
                      className="vastu-color-card"
                      data-aos="flip-left"
                      data-aos-delay={idx * 100}
                    >
                      <div
                        className="vastu-color-header"
                        style={{ background: colorGroup.primary }}
                      >
                        <h3>{colorGroup.name}</h3>
                      </div>
                      <div className="vastu-color-body">
                        <div className="color-swatches">
                          {colorGroup.shades.map((shade, i) => (
                            <div
                              key={i}
                              className="color-swatch"
                              style={{ background: shade }}
                              title={shade}
                            />
                          ))}
                        </div>

                        <p className="color-element">
                          Element: <strong>{colorGroup.element}</strong>
                        </p>
                        <p className="color-energy">
                          Energy: {colorGroup.energy}
                        </p>

                        <div className="color-section">
                          <h4>Best For</h4>
                          <ul>
                            {colorGroup.bestFor.map((item, i) => (
                              <li key={i}>{item}</li>
                            ))}
                          </ul>
                        </div>

                        <div className="color-section">
                          <h4>Effects</h4>
                          <p>{colorGroup.effects}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "remedies" && (
              <div className="vastu-remedies-content" data-aos="fade-in">
                <h2 className="vastu-content-title">
                  Vastu Remedies & Corrections
                </h2>

                <div className="vastu-remedies-grid">
                  {vastuRemedies.map((remedy, idx) => (
                    <div
                      key={idx}
                      className="vastu-remedy-card"
                      data-aos="fade-up"
                      data-aos-delay={idx * 100}
                    >
                      <div className="remedy-icon">{remedy.icon}</div>
                      <h3>{remedy.problem}</h3>
                      <div className="remedy-solutions">
                        <h4>Solutions:</h4>
                        <ul>
                          {remedy.solutions.map((solution, i) => (
                            <li key={i}>{solution}</li>
                          ))}
                        </ul>
                      </div>
                      {remedy.note && (
                        <div className="remedy-note">
                          <strong>Note:</strong> {remedy.note}
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* General Tips Section */}
                <div className="vastu-general-tips" data-aos="zoom-in">
                  <h3>General Vastu Do's and Don'ts</h3>
                  <div className="tips-grid">
                    <div className="tips-column">
                      <h4 className="tips-title dos-title">✓ Do's</h4>
                      <ul className="tips-list">
                        {vastuDosAndDonts.dos.map((item, i) => (
                          <li key={i} className="tip-item do-item">
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="tips-column">
                      <h4 className="tips-title donts-title">✗ Don'ts</h4>
                      <ul className="tips-list">
                        {vastuDosAndDonts.donts.map((item, i) => (
                          <li key={i} className="tip-item dont-item">
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Consultation CTA */}
      <section className="vastu-consultation-cta" data-aos="fade-up">
        <div className="container">
          <div className="consultation-card">
            <div className="consultation-icon">🕉️</div>
            <h2>Need Professional Vastu Consultation?</h2>
            <p>
              Get personalized Vastu guidance for your home or office from
              certified experts
            </p>
            <div className="consultation-buttons">
              <a href="/about" className="btn btn-primary">
                Contact Expert
              </a>
              <a href="/calculator" className="btn btn-secondary">
                Check Vastu Compliance
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default VastuPage;
