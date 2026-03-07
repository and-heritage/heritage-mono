export const locations = [
  {
    id: 1,
    name: "Court of Judicature at Maxwell's House",
    subname: "The First Official Courthouse",
    coords: [1500, 1700],
    category: "Healthcare",
    year: "1910",
    description:
      "Founded by the Cantonese community, this was one of Singapore's first Chinese hospitals providing affordable healthcare to immigrants.",
    models: [
      "https://socialservicestrail.sg/upload/file/sites/673190474e016718e803270e/Former%20Social%20Welfare%20Department.glb",
      "https://socialservicestrail.sg/upload/file/sites/673190474e016718e803270e/Former%20Social%20Welfare%20Department.glb",
    ],
  },
  {
    id: 2,
    name: "Court of Judicature at Maxwell's House",
    subname: "The First Official Courthouse",
    coords: [1600, 2900],
    category: "Healthcare",
    year: "1910",
    description:
      "Founded by the Cantonese community, this was one of Singapore's first Chinese hospitals providing affordable healthcare to immigrants.",
  },
  {
    id: 3,
    name: "Court of Judicature at Maxwell's House",
    subname: "The First Official Courthouse",
    coords: [600, 3200],
    category: "Healthcare",
    year: "1910",
    description:
      "Founded by the Cantonese community, this was one of Singapore's first Chinese hospitals providing affordable healthcare to immigrants.",
  },
  {
    id: 4,
    name: "Court of Judicature at Maxwell's House",
    subname: "The First Official Courthouse",
    coords: [650, 2200],
    category: "Healthcare",
    year: "1910",
    description:
      "Founded by the Cantonese community, this was one of Singapore's first Chinese hospitals providing affordable healthcare to immigrants.",
  },
  {
    id: 5,
    name: "Court of Judicature at Maxwell's House",
    subname: "The First Official Courthouse",
    coords: [150, 1500],
    category: "Healthcare",
    year: "1910",
    description:
      "Founded by the Cantonese community, this was one of Singapore's first Chinese hospitals providing affordable healthcare to immigrants.",
  },
  {
    id: 6,
    name: "Court of Judicature at Maxwell's House",
    subname: "The First Official Courthouse",
    coords: [600, 600],
    category: "Healthcare",
    year: "1910",
    description:
      "Founded by the Cantonese community, this was one of Singapore's first Chinese hospitals providing affordable healthcare to immigrants.",
  },
  {
    id: 7,
    name: "Court of Judicature at Maxwell's House",
    subname: "The First Official Courthouse",
    coords: [1100, 750],
    category: "Healthcare",
    year: "1910",
    description:
      "Founded by the Cantonese community, this was one of Singapore's first Chinese hospitals providing affordable healthcare to immigrants.",
  },
  {
    id: 8,
    name: "Court of Judicature at Maxwell's House",
    subname: "The First Official Courthouse",
    coords: [1550, 1100],
    category: "Healthcare",
    year: "1910",
    description:
      "Founded by the Cantonese community, this was one of Singapore's first Chinese hospitals providing affordable healthcare to immigrants.",
  },
];


export interface CompetitionData {
  id: number;
  title: string;
  description: string;
  students: string[];
  category: 'Upper Primary' | 'Secondary' | 'Pre-University'
}

export const competition: CompetitionData[] = [
  {
    id: 1,
    title: "Echoes of Empress Place",
    category: "Upper Primary",
    description: "Echoes of Empress Place traces the transformation of the Supreme Court from a colonial courthouse built in 1867 into a cultural and civic landmark. Presented as a continuous narrative, the project blends archival visuals and vintage-inspired illustrations in a horizontal storytelling journey.",
    students: ["James", "Ethan", "Elly"],
  },
  {
    id: 2,
    title: "Threads of Time",
    category: "Upper Primary",
    description: "Threads of Time unspools the rich tapestry of early garment trade and textile industries. Utilizing dynamic multi-column layouts, the project guides users through a visual archive of vintage fabrics, seamlessly combining historical anecdotes with interactive timelines.",
    students: ["Sarah", "Michael", "Chloe"],
  },
  {
    id: 3,
    title: "Stories in Stone",
    category: "Upper Primary",
    description: "Stories in Stone offers a detailed catalog of forgotten colonial monuments and foundation stones. Designed as a seamless viewing experience, the narrative unfolds across carefully curated visual sections, emphasizing bold typography and archival photography.",
    students: ["Alex", "Budi", "Jane"],
  },
  {
    id: 4,
    title: "Footprints of the Past",
    category: "Upper Primary",
    description: "Footprints of the Past maps the old merchant routes that shaped the city's early economic foundation. The digital exhibition features sweeping panoramic visuals that progress organically, inviting users to trace the steps of early settlers.",
    students: ["Ethan", "James", "Siti"],
  },
  {
    id: 5,
    title: "Mapping Memory",
    category: "Upper Primary",
    description: "Mapping Memory acts as an interactive cartography of personal histories. By organizing oral histories into structured, flowing storytelling interfaces, it captures the fleeting memories of native residents before modern urban development.",
    students: ["Elly", "Chloe", "Michael"],
  },
  {
    id: 6,
    title: "Living the Landmark",
    category: "Upper Primary",
    description: "Living the Landmark critically examines the adaptive reuse of heritage buildings. The project leverages fluid spatial transitions to contrast original architectural blueprints with their modern, commercialized counterparts.",
    students: ["Sarah", "Budi"],
  },
  {
    id: 7,
    title: "Echoes Through Time",
    category: "Upper Primary",
    description: "Echoes Through Time juxtaposes the auditory landscape of the 1900s with today's urban noise. Presented through a carefully paced web experience, it merges soundscape data with visual waveforms for a sensory journey.",
    students: ["Jane", "James", "Alex"],
  },
  {
    id: 8,
    title: "Vanishing Vistas",
    category: "Upper Primary",
    description: "Vanishing Vistas documents the changing coastline and lost waterfronts through a series of interactive overlays. It explores how land reclamation has redefined the city's edge, using historical maps to reveal what lies beneath the modern concrete.",
    students: ["Michael", "Elly", "Ethan"],
  },
  {
    id: 9,
    title: "Foundations of Faith",
    category: "Upper Primary",
    description: "Foundations of Faith delves into the pluralistic history of early places of worship. This visual essay explores how temples, churches, and mosques coexisted in close quarters, reflecting the diverse cultural mosaic of early migrant communities.",
    students: ["Budi", "Sarah", "Siti", "Jane"],
  },
  {
    id: 10,
    title: "Bridges Between Eras",
    category: "Upper Primary",
    description: "Bridges Between Eras highlights the engineering marvels of early river crossings. Through detailed 3D renders and technical sketches, the project illustrates how these structures served as vital arteries for both social and commercial expansion.",
    students: ["Chloe", "Alex", "James"],
  },
  {
    id: 11,
    title: "Ink & Independence",
    category: "Secondary",
    description: "An analysis of early printing presses and how they fueled the regional independence movements. This project features a digital archive of radical pamphlets from the 1920s.",
    students: ["Rian", "Siti", "Kevin"],
  },
  {
    id: 12,
    title: "The Spice Logbook",
    category: "Secondary",
    description: "Tracing the global impact of the nutmeg and clove trade through a gamified web experience. Users can navigate 18th-century trade routes and see their economic consequences.",
    students: ["Lidya", "Fahri"],
  },
  {
    id: 13,
    title: "Steel & Sweat",
    category: "Secondary",
    description: "A tribute to the labor force behind the first railway tracks. Using parallax scrolling to showcase the harsh conditions and engineering triumphs of the industrial era.",
    students: ["Ahmad", "Zoe", "Rama"],
  },
  {
    id: 14,
    title: "Batik: The Hidden Code",
    category: "Secondary",
    description: "Exploring the mathematical patterns and philosophical meanings behind traditional batik motifs across the archipelago using interactive SVG overlays.",
    students: ["Indah", "Putu"],
  },
  {
    id: 15,
    title: "Cinema of Shadows",
    category: "Secondary",
    description: "Documenting the transition from Wayang Kulit to early silent films. This project uses audio-visual storytelling to preserve the evolution of performance art.",
    students: ["Dani", "Eka", "Sari"],
  },

  {
    id: 16,
    title: "Post-Colonial Palimpsest",
    category: "Pre-University",
    description: "A critical examination of urban 'erasure' in modern cities. It uses a slider interface to overlay 1950s urban maps onto 2024 satellite imagery, highlighting lost cultural pockets.",
    students: ["Aris", "Nina", "Jonathan"],
  },
  {
    id: 17,
    title: "The Gendered City",
    category: "Pre-University",
    description: "An academic digital essay on how colonial architecture dictated social gender roles. It features 3D walkthroughs of domestic vs. public spaces in heritage houses.",
    students: ["Clara", "Maya"],
  },
  {
    id: 18,
    title: "Hydro-Heritage",
    category: "Pre-University",
    description: "Investigating the sophisticated ancient drainage systems that prevented flooding centuries ago, and how modern engineering can learn from these 'forgotten' blueprints.",
    students: ["Bambang", "Rico", "Siska"],
  },
  {
    id: 19,
    title: "Dialectics of the Diaspora",
    category: "Pre-University",
    description: "A multimedia exploration of linguistic evolution within migrant communities. Features interactive 'sound maps' that track how dialects changed over three generations.",
    students: ["Hendra", "Aulia"],
  },
  {
    id: 20,
    title: "Brutalism vs. Tradition",
    category: "Pre-University",
    description: "A visual debate on the mid-century architectural shift. This project uses a split-screen narrative to compare traditional craftsmanship with the rise of concrete brutalism.",
    students: ["Gery", "Tania", "Fadel"],
  }
];