// VASTU SHASTRA DATA - Complete dataset for Vastu page

export const vastuPrinciples = [
  {
    icon: "🌍",
    title: "Five Elements (Pancha Mahabhuta)",
    description: "Vastu is based on the balance of five fundamental elements that constitute the universe.",
    points: [
      "Earth (Prithvi) - Southwest direction, provides stability",
      "Water (Jal) - Northeast direction, source of life",
      "Fire (Agni) - Southeast direction, represents energy",
      "Air (Vayu) - Northwest direction, movement and change",
      "Space (Akasha) - Center (Brahmasthan), cosmic energy"
    ]
  },
  {
    icon: "🧭",
    title: "Eight Directions",
    description: "Each direction is governed by a deity and has specific characteristics.",
    points: [
      "North (Kubera) - Wealth and opportunities",
      "Northeast (Ishanya) - Spiritual growth and wisdom",
      "East (Indra) - Health and prosperity",
      "Southeast (Agni) - Energy and power",
      "South (Yama) - Dharma and strength",
      "Southwest (Niruti) - Stability and relationships",
      "West (Varuna) - Gains and profits",
      "Northwest (Vayu) - Movement and change"
    ]
  },
  {
    icon: "⚖️",
    title: "Balance and Harmony",
    description: "Vastu emphasizes balance between different energies for overall well-being.",
    points: [
      "Equal distribution of weight in the structure",
      "Proper ventilation and natural light",
      "Balance between open and closed spaces",
      "Harmony between built and natural elements",
      "Symmetry in design and layout"
    ]
  },
  {
    icon: "☀️",
    title: "Solar Energy",
    description: "Sun's path and energy play a crucial role in Vastu compliance.",
    points: [
      "East and North should be more open for sunlight",
      "West and South can be higher and heavier",
      "Maximum openings in Northeast for morning sun",
      "Slope of land should be towards North or East",
      "Roof slope towards North or East preferred"
    ]
  }
];

export const vastuRooms = [
  {
    name: "Master Bedroom",
    icon: "🛏️",
    idealDirection: "Southwest",
    description: "The master bedroom should be in the Southwest for stability, strength, and good health of the head of the family.",
    dos: [
      "Place bed in Southwest with head towards South or West",
      "Keep the room square or rectangular in shape",
      "Use soothing colors like light pink, blue, or green",
      "Ensure good ventilation with windows on East or North"
    ],
    donts: [
      "Avoid mirror facing the bed",
      "Don't place bed under an overhead beam",
      "Avoid bedroom in Northeast direction",
      "Don't keep water features in the bedroom"
    ],
    additionalTips: [
      "Wooden furniture is more favorable than metal",
      "Keep a small plant for positive energy",
      "Ensure door opens at least 90 degrees"
    ]
  },
  {
    name: "Kitchen",
    icon: "🍳",
    idealDirection: "Southeast",
    description: "Kitchen represents the fire element and should be in the Southeast (Agni corner) for prosperity and health.",
    dos: [
      "Place cooking stove in Southeast facing East",
      "Keep sink and water sources in Northeast",
      "Ensure proper ventilation and exhaust system",
      "Use yellow, orange, or red colors"
    ],
    donts: [
      "Avoid kitchen in North, Northeast, or Southwest",
      "Don't place stove directly opposite to sink",
      "Avoid kitchen under or above toilet",
      "Don't keep broken utensils or appliances"
    ],
    additionalTips: [
      "Kitchen door should not face main entrance",
      "Store grains and pulses in Southwest",
      "Keep kitchen clean and clutter-free always"
    ]
  },
  {
    name: "Living Room",
    icon: "🛋️",
    idealDirection: "Northeast, North, or East",
    description: "Living room is for family gatherings and should have positive energy flow.",
    dos: [
      "Place heavy furniture in South or West",
      "Keep Northeast corner light and open",
      "Use light colors like white, yellow, or light blue",
      "Ensure main entrance opens into living room"
    ],
    donts: [
      "Avoid dark or dull colors",
      "Don't place aquarium in South or Southwest",
      "Avoid cluttering the center of the room",
      "Don't keep broken or non-functional items"
    ],
    additionalTips: [
      "Display family photos on South or Southwest wall",
      "Add indoor plants for positive energy",
      "Keep floor level lower in North and East"
    ]
  },
  {
    name: "Bathroom & Toilet",
    icon: "🚿",
    idealDirection: "Northwest or Southeast",
    description: "Bathrooms should be positioned to allow proper drainage of negative energy.",
    dos: [
      "Place toilet seat in Northwest or Southeast",
      "Face North or South while using toilet",
      "Ensure proper ventilation and exhaust",
      "Keep bathroom clean and dry always"
    ],
    donts: [
      "Never in Northeast (highly inauspicious)",
      "Avoid common wall with kitchen or pooja room",
      "Don't face toilet towards East or North",
      "Avoid bathroom in center of the house"
    ],
    additionalTips: [
      "Keep toilet lid closed when not in use",
      "Fix all leaking taps immediately",
      "Use exhaust fans to remove moisture"
    ]
  },
  {
    name: "Pooja Room",
    icon: "🙏",
    idealDirection: "Northeast",
    description: "The prayer room should be in the Northeast for spiritual growth and divine blessings.",
    dos: [
      "Place idols facing East or West",
      "Keep room clean and well-lit",
      "Use white, yellow, or light blue colors",
      "Ensure door opens completely (minimum 90°)"
    ],
    donts: [
      "Avoid in bedroom or under staircase",
      "Don't keep broken or damaged idols",
      "Avoid South-facing idols",
      "Don't share wall with toilet"
    ],
    additionalTips: [
      "Light a lamp daily for positive energy",
      "Keep fresh flowers and incense",
      "Place a copper pyramid for energy enhancement"
    ]
  }
];

export const vastuDirections = [
  {
    name: "North",
    icon: "⬆️",
    deity: "Kubera (God of Wealth)",
    element: "Water",
    description: "North direction is ruled by Kubera, the lord of wealth and prosperity. It's associated with career, business growth, and financial gains.",
    bestFor: ["Main entrance or gate", "Living room", "Cash locker or safe", "Business office", "Water features (fountains, aquarium)"],
    colors: [{ name: "Green", code: "#138808" }, { name: "Blue", code: "#0066CC" }, { name: "White", code: "#FFFFFF" }],
    benefits: ["Financial prosperity and wealth", "Career growth and opportunities", "Mental peace and clarity", "Good reputation and fame"],
    avoid: ["Toilet or septic tank", "Heavy storage or obstruction", "Dark or dull colors", "Kitchen (not favorable)"]
  },
  {
    name: "Northeast",
    icon: "↗️",
    deity: "Ishanya (Lord Shiva)",
    element: "Water + Air",
    description: "Northeast is the most auspicious direction, representing divine energy, spiritual growth, and wisdom. It's where cosmic energy enters.",
    bestFor: ["Pooja room or temple", "Meditation space", "Water source (bore well, tank)", "Study room", "Open space or garden"],
    colors: [{ name: "White", code: "#FFFFFF" }, { name: "Light Blue", code: "#87CEEB" }, { name: "Light Yellow", code: "#FFFFE0" }],
    benefits: ["Spiritual growth and enlightenment", "Good health and vitality", "Mental clarity and wisdom", "Peace and positive energy"],
    avoid: ["Toilet or bathroom (highly inauspicious)", "Kitchen or fire", "Heavy furniture or obstruction", "Garbage or clutter"]
  },
  {
    name: "East",
    icon: "➡️",
    deity: "Indra (King of Gods)",
    element: "Air",
    description: "East is the direction of sunrise, symbolizing new beginnings, health, and vitality. It's associated with social life and happiness.",
    bestFor: ["Main entrance", "Windows and openings", "Living room", "Children's bedroom", "Balcony or terrace"],
    colors: [{ name: "White", code: "#FFFFFF" }, { name: "Light Blue", code: "#ADD8E6" }, { name: "Light Green", code: "#90EE90" }],
    benefits: ["Good health and vitality", "Success in endeavors", "Social harmony", "Mental freshness and clarity"],
    avoid: ["Heavy storage blocking sunlight", "Toilet (not favorable)", "Dark corners or rooms", "Staircases (not ideal)"]
  },
  {
    name: "Southeast",
    icon: "↘️",
    deity: "Agni (God of Fire)",
    element: "Fire",
    description: "Southeast represents fire element and is ideal for activities involving heat and energy. It's associated with health and immunity.",
    bestFor: ["Kitchen (most ideal)", "Electrical equipment room", "Boiler or heater", "Electrical panel", "Generator room"],
    colors: [{ name: "Red", code: "#FF0000" }, { name: "Orange", code: "#FF8C00" }, { name: "Pink", code: "#FFC0CB" }],
    benefits: ["Good health and immunity", "Energy and enthusiasm", "Protection from diseases", "Digestive health"],
    avoid: ["Water features or tanks", "Bedroom (causes health issues)", "Toilet or bathroom", "Main entrance (not favorable)"]
  },
  {
    name: "South",
    icon: "⬇️",
    deity: "Yama (God of Death & Dharma)",
    element: "Fire",
    description: "South represents strength, stability, and longevity. Though associated with Yama, it's not negative but represents righteousness.",
    bestFor: ["Master bedroom (Southwest corner)", "Heavy storage or safe", "Strong room or vault", "Higher walls or buildings", "Closed spaces"],
    colors: [{ name: "Red", code: "#DC143C" }, { name: "Orange", code: "#FF8C00" }, { name: "Brown", code: "#8B4513" }],
    benefits: ["Longevity and good health", "Stability in life", "Protection and security", "Strength and courage"],
    avoid: ["Main entrance", "Water features", "Slope in land", "Too many openings"]
  },
  {
    name: "Southwest",
    icon: "↙️",
    deity: "Niruti (Goddess of Destruction)",
    element: "Earth",
    description: "Southwest represents stability, strength, and relationships. It's the direction of earth element and provides grounding.",
    bestFor: ["Master bedroom (most ideal)", "Heavy furniture and storage", "Strong room or safe", "Solid walls (highest in house)", "Overhead water tank"],
    colors: [{ name: "Brown", code: "#A0522D" }, { name: "Yellow", code: "#FFD700" }, { name: "Beige", code: "#F5F5DC" }],
    benefits: ["Relationship harmony", "Stability and grounding", "Financial security", "Longevity and prosperity"],
    avoid: ["Main entrance", "Kitchen", "Toilet (highly inauspicious)", "Open spaces or gardens"]
  },
  {
    name: "West",
    icon: "⬅️",
    deity: "Varuna (God of Rain & Water)",
    element: "Water",
    description: "West direction represents gains, profits, and prosperity. It's favorable for business and financial growth.",
    bestFor: ["Children's bedroom", "Study room", "Dining room", "Storage room", "Guest room"],
    colors: [{ name: "Blue", code: "#4169E1" }, { name: "White", code: "#F0F8FF" }, { name: "Silver", code: "#C0C0C0" }],
    benefits: ["Financial gains and profits", "Business success", "Children's growth and education", "Good fortune"],
    avoid: ["Main entrance (not ideal)", "Overhead water tank", "Too much open space", "Very low level"]
  },
  {
    name: "Northwest",
    icon: "↖️",
    deity: "Vayu (God of Wind)",
    element: "Air",
    description: "Northwest represents movement, change, and relationships. It's associated with air element and social connections.",
    bestFor: ["Guest room", "Bathroom or toilet", "Garage or vehicle parking", "Store room", "Unmarried girls' bedroom"],
    colors: [{ name: "White", code: "#FFFFFF" }, { name: "Gray", code: "#808080" }, { name: "Light Blue", code: "#B0E0E6" }],
    benefits: ["Social connections and networking", "Movement and opportunities", "Support from friends", "Adaptability to changes"],
    avoid: ["Master bedroom", "Pooja room", "Heavy storage", "Overhead water tank on this side"]
  }
];

export const vastuColors = [
  {
    name: "White & Light Colors",
    primary: "#FFFFFF",
    shades: ["#FFFFFF", "#F8F9FA", "#F0F0F0", "#FFFEF7"],
    element: "Space",
    energy: "Purity, Peace, and Clarity",
    bestFor: ["Pooja room", "Northeast corner", "Living room", "Study room"],
    effects: "Promotes mental peace, clarity, and positive energy. Reflects light and makes spaces feel larger."
  },
  {
    name: "Yellow & Gold",
    primary: "#FFD700",
    shades: ["#FFEB3B", "#FFD700", "#FFC107", "#FFEAA7"],
    element: "Earth",
    energy: "Happiness, Wisdom, and Prosperity",
    bestFor: ["Study room", "Children's bedroom", "Living room", "Dining area"],
    effects: "Enhances concentration, promotes happiness, and attracts prosperity. Good for mental stimulation."
  },
  {
    name: "Green",
    primary: "#138808",
    shades: ["#90EE90", "#7FFF00", "#32CD32", "#138808"],
    element: "Wood",
    energy: "Growth, Harmony, and Health",
    bestFor: ["Bedroom", "Study room", "Living room", "North or East walls"],
    effects: "Promotes growth, healing, and balance. Creates a calming and refreshing environment."
  },
  {
    name: "Blue",
    primary: "#0066CC",
    shades: ["#87CEEB", "#4169E1", "#0066CC", "#000080"],
    element: "Water",
    energy: "Calmness, Trust, and Communication",
    bestFor: ["Bedroom", "Study room", "Meditation space", "North or East walls"],
    effects: "Brings mental peace, improves communication, and promotes restful sleep."
  },
  {
    name: "Red & Orange",
    primary: "#FF6B00",
    shades: ["#FFC0CB", "#FF8C00", "#FF6B00", "#DC143C"],
    element: "Fire",
    energy: "Energy, Passion, and Enthusiasm",
    bestFor: ["Kitchen", "Southeast corner", "Dining room (as accent)", "South walls"],
    effects: "Stimulates energy, passion, and activity. Use sparingly as it can be overwhelming."
  },
  {
    name: "Brown & Earthy Tones",
    primary: "#8B4513",
    shades: ["#F5F5DC", "#D2B48C", "#A0522D", "#8B4513"],
    element: "Earth",
    energy: "Stability, Security, and Grounding",
    bestFor: ["Southwest bedroom", "Living room", "South or West walls", "Furniture"],
    effects: "Provides stability, grounding, and sense of security. Creates warm and welcoming atmosphere."
  }
];

export const vastuRemedies = [
  {
    icon: "🚪",
    problem: "Wrong Main Door Direction",
    solutions: [
      "Place a Vastu pyramid on the main door",
      "Hang a Swastik or Om symbol above the door",
      "Use bright lighting at the entrance",
      "Keep entrance clean and decorated with rangoli",
      "Place green plants on either side of the door"
    ],
    note: "If South-facing door cannot be changed, these remedies can minimize negative effects."
  },
  {
    icon: "🚽",
    problem: "Toilet in Northeast",
    solutions: [
      "Place a Vastu salt bowl in the toilet (change weekly)",
      "Keep an image of Lord Ganesha outside the toilet",
      "Use sea salt and camphor for cleansing",
      "Install an exhaust fan for continuous ventilation",
      "Keep toilet door closed and covered with curtain"
    ],
    note: "This is highly inauspicious. Consider relocating if doing major renovation."
  },
  {
    icon: "🛏️",
    problem: "Bedroom in Northeast",
    solutions: [
      "Place a brass Vastu pyramid in Northeast corner",
      "Use copper strips on Northeast wall",
      "Hang a picture of mountains on Southwest wall",
      "Sleep with head towards South or East",
      "Use earthy colors like brown or yellow"
    ],
    note: "Northeast bedroom affects health and finances. Shift to Southwest if possible."
  },
  {
    icon: "🍳",
    problem: "Kitchen in Wrong Direction",
    solutions: [
      "Place cooking stove in Southeast corner of kitchen",
      "Use red or orange colors in kitchen",
      "Install a Vastu copper helix on wall",
      "Keep a crystal bowl with rock salt",
      "Ensure good ventilation and lighting"
    ],
    note: "If kitchen cannot be moved, ensure stove placement is correct."
  },
  {
    icon: "🪜",
    problem: "Staircase in Northeast",
    solutions: [
      "Place a Vastu lead metal pyramid under first step",
      "Hang a wind chime on the staircase",
      "Use bright lighting on the staircase",
      "Paint in light colors like white or cream",
      "Place plants at the start of staircase"
    ],
    note: "This creates significant Vastu defects. Professional consultation recommended."
  },
  {
    icon: "💧",
    problem: "Water Leakage or Seepage",
    solutions: [
      "Fix all leaks immediately",
      "Ensure proper waterproofing",
      "Check and repair drainage systems",
      "Use dehumidifiers in damp areas",
      "Apply Vastu-approved waterproofing solutions"
    ],
    note: "Water leakage indicates financial losses. Urgent repair is essential."
  },
  {
    icon: "🕸️",
    problem: "Clutter and Unused Items",
    solutions: [
      "Declutter regularly, especially Northeast",
      "Remove broken items immediately",
      "Donate unused items to charity",
      "Organize storage in Southwest",
      "Keep pathways and corners clean"
    ],
    note: "Clutter blocks positive energy flow and causes stagnation in life."
  },
  {
    icon: "🌳",
    problem: "Trees Too Close to House",
    solutions: [
      "Trim branches that touch the building",
      "Avoid large trees in North or East",
      "Plant trees at safe distance (minimum 6 feet)",
      "Remove dead or dying trees immediately",
      "Keep small plants in North or East instead"
    ],
    note: "Large trees too close can obstruct positive energy and cause structural issues."
  },
  {
    icon: "🪞",
    problem: "Mirrors in Wrong Places",
    solutions: [
      "Avoid mirrors facing main door or bed",
      "Place mirrors on North or East walls only",
      "Cover mirrors in bedroom at night",
      "Don't place mirrors facing each other",
      "Use smaller mirrors instead of large ones"
    ],
    note: "Mirrors reflect energy. Wrong placement can amplify negative energies."
  }
];

export const vastuDosAndDonts = {
  dos: [
    "Keep Northeast corner clean, light, and clutter-free always",
    "Place main door in North, East, or Northeast direction",
    "Sleep with head towards South or East for better health",
    "Keep heavy furniture and storage in Southwest",
    "Ensure proper cross-ventilation in all rooms",
    "Use appropriate colors for each direction",
    "Keep the center of house (Brahmasthan) empty and open",
    "Fix any leaking taps or seepage immediately",
    "Keep all doors and windows in good working condition",
    "Light a lamp in Northeast corner daily for positive energy",
    "Plant Tulsi (basil) in Northeast or East",
    "Keep cash locker in North facing South",
    "Ensure regular cleaning and maintenance of the house",
    "Use natural materials like wood and stone where possible",
    "Keep indoor plants for fresh air and positive energy"
  ],
  donts: [
    "Never have toilet or bathroom in Northeast corner",
    "Avoid main entrance in South or Southwest",
    "Don't keep broken mirrors, clocks, or non-functional items",
    "Never place pooja room or temple in bedroom",
    "Avoid having bedroom in Northeast direction",
    "Don't keep dustbin or trash near main entrance",
    "Avoid dark colors in Northeast corner",
    "Never construct kitchen in Northeast corner",
    "Don't place heavy objects or overhead beams above bed",
    "Avoid keeping shoes or footwear inside the house",
    "Don't have septic tank in Northeast or North",
    "Never ignore water leakage or seepage issues",
    "Avoid sharp corners pointing towards sleeping or sitting areas",
    "Don't keep too many mirrors in the house",
    "Never leave clutter in corners, especially Northeast",
    "Avoid having staircase in Northeast or center of house"
  ]
};