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

// ─── Vastu Room Planner Data ───────────────────────────────────────────────
const VASTU_ROOM_DATA = {
  "Main Entrance": {
    zones: ["north", "northeast", "east"],
    color: "#F59E0B",
    emoji: "🚪",
    priority: 1,
  },
  "Living Room": {
    zones: ["north", "northeast", "east", "northwest"],
    color: "#3B82F6",
    emoji: "🛋️",
    priority: 2,
  },
  "Master Bedroom": {
    zones: ["southwest"],
    color: "#6D28D9",
    emoji: "🛏️",
    priority: 1,
  },
  "Bedroom 2": {
    zones: ["south", "west", "northwest"],
    color: "#7C3AED",
    emoji: "🛏️",
    priority: 2,
  },
  "Bedroom 3": {
    zones: ["south", "west"],
    color: "#9333EA",
    emoji: "🛏️",
    priority: 3,
  },
  Kitchen: { zones: ["southeast"], color: "#EF4444", emoji: "🍳", priority: 1 },
  "Pooja Room": {
    zones: ["northeast", "north", "east"],
    color: "#F97316",
    emoji: "🪔",
    priority: 1,
  },
  "Dining Room": {
    zones: ["west", "east"],
    color: "#10B981",
    emoji: "🍽️",
    priority: 2,
  },
  "Bathroom/Toilet": {
    zones: ["northwest", "west", "south"],
    color: "#06B6D4",
    emoji: "🚿",
    priority: 2,
  },
  "Study/Office": {
    zones: ["west", "southwest", "northeast"],
    color: "#6366F1",
    emoji: "📚",
    priority: 2,
  },
  "Store Room": {
    zones: ["northwest", "west", "south"],
    color: "#78716C",
    emoji: "📦",
    priority: 3,
  },
  Garage: {
    zones: ["northwest", "southeast", "west"],
    color: "#64748B",
    emoji: "🚗",
    priority: 3,
  },
  Staircase: {
    zones: ["south", "west", "southwest"],
    color: "#D97706",
    emoji: "🪜",
    priority: 2,
  },
  "Balcony/Terrace": {
    zones: ["north", "east", "northeast"],
    color: "#84CC16",
    emoji: "🌿",
    priority: 3,
  },
};

const ZONE_GRID = [
  ["northwest", "north", "northeast"],
  ["west", "center", "east"],
  ["southwest", "south", "southeast"],
];

const ZONE_LABELS = {
  northwest: "NW",
  north: "N",
  northeast: "NE",
  west: "W",
  center: "C",
  east: "E",
  southwest: "SW",
  south: "S",
  southeast: "SE",
};

const FACING_DATA = {
  north: {
    icon: "⬆️",
    benefit: "Wealth & prosperity — ruled by Kubera (God of wealth)",
  },
  northeast: {
    icon: "↗️",
    benefit: "Wisdom & spirituality — most auspicious corner (Ishanya)",
  },
  east: {
    icon: "➡️",
    benefit: "Health & new beginnings — ruled by Indra, sunlight entry",
  },
  southeast: {
    icon: "↘️",
    benefit: "Energy & vitality — ruled by Agni (Fire God)",
  },
  south: { icon: "⬇️", benefit: "Fame & stability — ruled by Yama" },
  southwest: {
    icon: "↙️",
    benefit: "Strength & relationships — ruled by Nirrti",
  },
  west: { icon: "⬅️", benefit: "Gains & success — ruled by Varuna" },
  northwest: {
    icon: "↖️",
    benefit: "Change & travel — ruled by Vayu (Wind God)",
  },
};

const DEFAULT_ROOMS = [
  "Main Entrance",
  "Living Room",
  "Master Bedroom",
  "Kitchen",
  "Pooja Room",
  "Dining Room",
  "Bathroom/Toilet",
  "Study/Office",
  "Bedroom 2",
];

function generateLayout(selectedRooms) {
  const grid = Array(3)
    .fill(null)
    .map(() => Array(3).fill(null));
  const placed = {};

  const sorted = [...selectedRooms].sort(
    (a, b) => VASTU_ROOM_DATA[a].priority - VASTU_ROOM_DATA[b].priority,
  );

  for (const roomName of sorted) {
    const rd = VASTU_ROOM_DATA[roomName];
    let bestRow = -1,
      bestCol = -1,
      bestZone = null;

    for (const zoneName of rd.zones) {
      for (let r = 0; r < 3; r++) {
        for (let c = 0; c < 3; c++) {
          if (ZONE_GRID[r][c] === zoneName && !grid[r][c]) {
            bestZone = zoneName;
            bestRow = r;
            bestCol = c;
            break;
          }
        }
        if (bestZone) break;
      }
      if (bestZone) break;
    }

    if (!bestZone) {
      let found = false;
      for (let r = 0; r < 3 && !found; r++) {
        for (let c = 0; c < 3 && !found; c++) {
          if (!grid[r][c]) {
            bestRow = r;
            bestCol = c;
            bestZone = ZONE_GRID[r][c];
            found = true;
          }
        }
      }
    }

    if (bestRow >= 0) {
      grid[bestRow][bestCol] = roomName;
      placed[roomName] = {
        zone: bestZone,
        isIdeal: rd.zones.includes(bestZone),
      };
    }
  }

  return { grid, placed };
}

// ─── Room Planner Sub-component ───────────────────────────────────────────
function VastuRoomPlanner() {
  const [step, setStep] = useState(1);
  const [inputs, setInputs] = useState({
    length: "",
    width: "",
    facing: "north",
    plotShape: "rectangle",
    floors: "1",
    rooms: DEFAULT_ROOMS,
  });
  const [layout, setLayout] = useState(null);
  const [hoveredRoom, setHoveredRoom] = useState(null);

  const allRooms = Object.keys(VASTU_ROOM_DATA);

  function toggleRoom(name) {
    setInputs((p) => ({
      ...p,
      rooms: p.rooms.includes(name)
        ? p.rooms.filter((r) => r !== name)
        : [...p.rooms, name],
    }));
  }

  function handleGenerate() {
    if (!inputs.length || !inputs.width) return;
    setLayout(generateLayout(inputs.rooms));
    setStep(2);
  }

  return (
    <div className="planner-wrap" data-aos="fade-in">
      <h2 className="vastu-content-title">Vastu Room Planner</h2>
      <p className="planner-subtitle">
        Enter your plot specifications to get a Vastu-compliant room layout
      </p>

      {/* Step Indicator */}
      <div className="planner-steps">
        <div className={`planner-step ${step >= 1 ? "active" : ""}`}>
          <span className="planner-step-num">1</span>
          <span>Plot Details</span>
        </div>
        <div className="planner-step-line" />
        <div className={`planner-step ${step >= 2 ? "active" : ""}`}>
          <span className="planner-step-num">2</span>
          <span>Vastu Layout</span>
        </div>
      </div>

      {/* ── STEP 1 ── */}
      {step === 1 && (
        <div className="planner-form">
          {/* Dimensions */}
          <div className="planner-card">
            <h3 className="planner-card-title">🏗️ Plot Dimensions</h3>
            <div className="planner-grid-3">
              <div className="planner-field">
                <label>Length (feet)</label>
                <input
                  type="number"
                  min="10"
                  placeholder="e.g. 60"
                  value={inputs.length}
                  onChange={(e) =>
                    setInputs((p) => ({ ...p, length: e.target.value }))
                  }
                />
              </div>
              <div className="planner-field">
                <label>Width (feet)</label>
                <input
                  type="number"
                  min="10"
                  placeholder="e.g. 40"
                  value={inputs.width}
                  onChange={(e) =>
                    setInputs((p) => ({ ...p, width: e.target.value }))
                  }
                />
              </div>
              <div className="planner-field">
                <label>Number of Floors</label>
                <select
                  value={inputs.floors}
                  onChange={(e) =>
                    setInputs((p) => ({ ...p, floors: e.target.value }))
                  }
                >
                  <option value="1">Ground Floor (G)</option>
                  <option value="2">G + 1</option>
                  <option value="3">G + 2</option>
                  <option value="4">G + 3</option>
                </select>
              </div>
            </div>
            <div className="planner-field" style={{ marginTop: "1rem" }}>
              <label>Plot Shape</label>
              <select
                value={inputs.plotShape}
                onChange={(e) =>
                  setInputs((p) => ({ ...p, plotShape: e.target.value }))
                }
              >
                <option value="rectangle">
                  Rectangle / Square (Most Auspicious)
                </option>
                <option value="north-ext">
                  Rectangle with North Extension
                </option>
                <option value="east-ext">Rectangle with East Extension</option>
                <option value="irregular">Irregular (Needs Remedies)</option>
              </select>
            </div>

            {inputs.length && inputs.width && (
              <div className="planner-area-badge">
                📐 Plot Area:{" "}
                <strong>
                  {(inputs.length * inputs.width).toLocaleString()} sq.ft
                </strong>
                &nbsp;·&nbsp;Ratio {inputs.length}:{inputs.width}
                {Math.min(
                  inputs.length / inputs.width,
                  inputs.width / inputs.length,
                ) >= 0.6 ? (
                  <span className="planner-badge-ok"> ✓ Vastu-compliant</span>
                ) : (
                  <span className="planner-badge-warn"> ⚠ Irregular ratio</span>
                )}
              </div>
            )}
          </div>

          {/* Facing Direction */}
          <div className="planner-card">
            <h3 className="planner-card-title">
              🧭 Main Door Facing Direction
            </h3>
            <div className="planner-facing-grid">
              {Object.entries(FACING_DATA).map(([dir, data]) => (
                <button
                  key={dir}
                  className={`planner-facing-btn ${inputs.facing === dir ? "active" : ""}`}
                  onClick={() => setInputs((p) => ({ ...p, facing: dir }))}
                >
                  <span className="planner-facing-icon">{data.icon}</span>
                  <span>
                    {dir.charAt(0).toUpperCase() +
                      dir.slice(1).replace("-", " ")}
                  </span>
                </button>
              ))}
            </div>
            {inputs.facing && (
              <div className="planner-facing-desc">
                {FACING_DATA[inputs.facing].icon}{" "}
                {FACING_DATA[inputs.facing].benefit}
              </div>
            )}
          </div>

          {/* Room Selection */}
          <div className="planner-card">
            <h3 className="planner-card-title">🏠 Select Rooms to Include</h3>
            <div className="planner-rooms-grid">
              {allRooms.map((name) => {
                const selected = inputs.rooms.includes(name);
                const rd = VASTU_ROOM_DATA[name];
                return (
                  <button
                    key={name}
                    className={`planner-room-btn ${selected ? "active" : ""}`}
                    onClick={() => toggleRoom(name)}
                  >
                    <span>{rd.emoji}</span>
                    <span>{name}</span>
                  </button>
                );
              })}
            </div>
            <p className="planner-rooms-note">
              {inputs.rooms.length} rooms selected · max 9 rooms shown in
              single-floor plan
            </p>
          </div>

          <div className="planner-actions">
            <button
              className="btn btn-primary"
              disabled={!inputs.length || !inputs.width}
              onClick={handleGenerate}
            >
              Generate Vastu Layout →
            </button>
          </div>
        </div>
      )}

      {/* ── STEP 2 ── */}
      {step === 2 && layout && (
        <div className="planner-result">
          {/* Summary bar */}
          <div className="planner-summary-bar">
            <div className="planner-summary-item">
              <span className="planner-summary-label">Plot Size</span>
              <span className="planner-summary-val">
                {inputs.length} × {inputs.width} ft
              </span>
            </div>
            <div className="planner-summary-divider" />
            <div className="planner-summary-item">
              <span className="planner-summary-label">Facing</span>
              <span className="planner-summary-val">
                {FACING_DATA[inputs.facing].icon}{" "}
                {inputs.facing.charAt(0).toUpperCase() + inputs.facing.slice(1)}
              </span>
            </div>
            <div className="planner-summary-divider" />
            <div className="planner-summary-item">
              <span className="planner-summary-label">Floors</span>
              <span className="planner-summary-val">
                {inputs.floors === "1"
                  ? "G"
                  : `G + ${parseInt(inputs.floors) - 1}`}
              </span>
            </div>
            <div className="planner-summary-divider" />
            <div className="planner-summary-item">
              <span className="planner-summary-label">Vastu Score</span>
              <span className="planner-summary-val planner-score-val">
                {(() => {
                  const vals = Object.values(layout.placed);
                  return Math.round(
                    (vals.filter((p) => p.isIdeal).length / vals.length) * 100,
                  );
                })()}
                %
              </span>
            </div>
          </div>

          <div className="planner-result-layout">
            {/* Floor Plan Grid */}
            <div className="planner-floorplan-wrap">
              <p className="planner-compass-top">⬆ NORTH</p>
              <div className="planner-floor-grid">
                {ZONE_GRID.map((row, ri) =>
                  row.map((zone, ci) => {
                    const roomName = layout.grid[ri][ci];
                    const rd = roomName ? VASTU_ROOM_DATA[roomName] : null;
                    const info = roomName ? layout.placed[roomName] : null;
                    const isHovered = hoveredRoom === roomName && !!roomName;

                    return (
                      <div
                        key={`${ri}-${ci}`}
                        className={`planner-zone-cell ${!roomName ? "planner-zone-empty" : ""} ${isHovered ? "planner-zone-hovered" : ""}`}
                        style={
                          rd
                            ? {
                                background: `${rd.color}18`,
                                borderColor: isHovered
                                  ? rd.color
                                  : `${rd.color}35`,
                              }
                            : {}
                        }
                        onMouseEnter={() => setHoveredRoom(roomName)}
                        onMouseLeave={() => setHoveredRoom(null)}
                      >
                        <span className="planner-zone-label">
                          {ZONE_LABELS[zone]}
                        </span>
                        {roomName ? (
                          <>
                            <span className="planner-zone-emoji">
                              {rd.emoji}
                            </span>
                            <span className="planner-zone-name">
                              {roomName}
                            </span>
                            <span className="planner-zone-badge">
                              {info.isIdeal ? "✅" : "⚠️"}
                            </span>
                          </>
                        ) : (
                          <span className="planner-zone-empty-label">
                            {ZONE_LABELS[zone]}
                          </span>
                        )}
                      </div>
                    );
                  }),
                )}
              </div>
              <div className="planner-compass-bottom">
                <span>⬅ WEST</span>
                <span>⬇ SOUTH</span>
                <span>EAST ➡</span>
              </div>
              <div className="planner-legend">
                <span>✅ Ideal placement</span>
                <span>⚠️ Acceptable placement</span>
              </div>
            </div>

            {/* Analysis Panel */}
            <div className="planner-analysis">
              <h4 className="planner-analysis-title">Room-by-Room Analysis</h4>
              <div className="planner-analysis-list">
                {Object.entries(layout.placed).map(([roomName, info]) => {
                  const rd = VASTU_ROOM_DATA[roomName];
                  return (
                    <div
                      key={roomName}
                      className={`planner-analysis-card ${info.isIdeal ? "ideal" : "warn"}`}
                      onMouseEnter={() => setHoveredRoom(roomName)}
                      onMouseLeave={() => setHoveredRoom(null)}
                    >
                      <div className="planner-analysis-header">
                        <span className="planner-analysis-emoji">
                          {rd.emoji}
                        </span>
                        <div className="planner-analysis-info">
                          <span className="planner-analysis-name">
                            {roomName}
                          </span>
                          <span className="planner-analysis-zone">
                            {info.zone.charAt(0).toUpperCase() +
                              info.zone.slice(1)}{" "}
                            zone
                          </span>
                        </div>
                        <span
                          className={`planner-badge ${info.isIdeal ? "planner-badge-ideal" : "planner-badge-adjust"}`}
                        >
                          {info.isIdeal ? "✓ Ideal" : "△ Adjust"}
                        </span>
                      </div>
                      {!info.isIdeal && (
                        <p className="planner-analysis-tip">
                          Ideal zones: {rd.zones.join(", ")} — apply Vastu
                          remedy if relocation not possible
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Vastu Tips */}
          <div className="planner-card planner-tips-section">
            <h3 className="planner-card-title">
              💡 Vastu Recommendations for Your Layout
            </h3>
            <div className="planner-tips-grid">
              {[
                {
                  icon: "🪔",
                  tip: "Pooja room: use white, cream, or light yellow walls. Always face east while praying. Keep it clutter-free.",
                },
                {
                  icon: "🍳",
                  tip: "Kitchen in southeast. Cook facing east. Never place kitchen directly below or above the pooja room.",
                },
                {
                  icon: "🛏️",
                  tip: "Master bedroom owner should sleep with head pointing south or west for restful, energised sleep.",
                },
                {
                  icon: "🚪",
                  tip: `${inputs.facing.charAt(0).toUpperCase() + inputs.facing.slice(1)}-facing entrance: keep it well-lit, attractive and unobstructed at all times.`,
                },
                {
                  icon: "🚿",
                  tip: "Toilets must never be in the northeast corner. Use camphor or sea salt as a Vastu remedy if unavoidable.",
                },
                {
                  icon: "🌿",
                  tip: "Plant Tulsi in the northeast. Avoid thorny plants (except roses) inside the home.",
                },
                {
                  icon: "🪟",
                  tip: "Windows on north and east walls maximise positive morning sunlight and fresh energy flow.",
                },
                {
                  icon: "⚖️",
                  tip: "Keep the Brahmasthan (centre of home) open and clutter-free — no toilets or heavy pillars here.",
                },
              ].map((item, i) => (
                <div key={i} className="planner-tip-item">
                  <span className="planner-tip-icon">{item.icon}</span>
                  <span>{item.tip}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="planner-actions">
            <button className="btn btn-secondary" onClick={() => setStep(1)}>
              ← Edit Inputs
            </button>
            <button className="btn btn-primary" onClick={() => window.print()}>
              🖨️ Print Layout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Main VastuPage ────────────────────────────────────────────────────────
function VastuPage() {
  const [mainTab, setMainTab] = useState("planner"); // "planner" | "study"
  const [activeTab, setActiveTab] = useState("principles"); // study sub-tabs
  const [selectedDirection, setSelectedDirection] = useState("north");

  useEffect(() => {
    if (window.AOS) window.AOS.init({ duration: 800, once: true });
  }, []);

  return (
    <div className="vastu-page">
      {/* ── Hero Section ── */}
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

      {/* ── Primary Feature Tabs (after Hero) ── */}
      <section className="vastu-feature-tabs-section">
        <div className="container">
          <div className="vastu-feature-tabs" data-aos="fade-up">
            {/* Room Planner Tab */}
            <button
              className={`vastu-feature-tab ${mainTab === "planner" ? "active" : ""}`}
              onClick={() => setMainTab("planner")}
            >
              <span className="vft-icon">🏗️</span>
              <span className="vft-label">Room Planner</span>
              <span className="vft-desc">
                Generate a Vastu layout from your plot specs
              </span>
            </button>

            {/* Vastu Study Tab */}
            <button
              className={`vastu-feature-tab ${mainTab === "study" ? "active" : ""}`}
              onClick={() => setMainTab("study")}
            >
              <span className="vft-icon">📖</span>
              <span className="vft-label">Vastu Study</span>
              <span className="vft-desc">
                Principles, directions, colors & remedies
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* ── Room Planner Panel ── */}
      {mainTab === "planner" && (
        <section className="vastu-main-content">
          <div className="container">
            <VastuRoomPlanner />
          </div>
        </section>
      )}

      {/* ── Vastu Study Panel ── */}
      {mainTab === "study" && (
        <>
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

          {/* Study Sub-tabs */}
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
                    {vastuDirections.map(
                      (dir) =>
                        selectedDirection === dir.name.toLowerCase() && (
                          <div
                            key={dir.name}
                            className="vastu-direction-details"
                            data-aos="zoom-in"
                          >
                            <div className="direction-header">
                              <div className="direction-icon-large">
                                {dir.icon}
                              </div>
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
                                  {dir.benefits.map((b, i) => (
                                    <li key={i}>{b}</li>
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
                              {remedy.solutions.map((s, i) => (
                                <li key={i}>{s}</li>
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
        </>
      )}
    </div>
  );
}

export default VastuPage;