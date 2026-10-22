import type { PlanetData, UniverseTheme } from '../types/solar';

export const UNIVERSES: UniverseTheme[] = [
  {
    id: 'prime',
    name: 'Prime Cosmos',
    subtitle: 'Our Real Universe',
    description: 'The standard Sol system accurately calibrated to our physical laws, planetary geometries, and authentic celestial mechanics.',
    badge: '🌌 REALITY',
    starColor: '#FFF2C6',
    starGlow: '#FF8800',
    ambientLightColor: '#1A243B',
    ambientIntensity: 0.18,
    spaceBackgroundColor: '#030712',
    orbitLineColor: '#3A506B',
    hudAccentColor: '#00F0FF',
    warpEffectColor: '#48E5C2'
  },
  {
    id: 'cyberpunk',
    name: 'Neon Synthwave',
    subtitle: 'Cybernetic Grid Multiverse',
    description: 'A digitized synthetic cosmos where orbits glow like laser circuitry, stellar cores pulse with violet plasma, and planetary crusts radiate neon luminescence.',
    badge: '⚡ SYNTHWAVE',
    starColor: '#FF007F',
    starGlow: '#00F0FF',
    ambientLightColor: '#2B0938',
    ambientIntensity: 0.28,
    spaceBackgroundColor: '#090214',
    orbitLineColor: '#FF007F',
    hudAccentColor: '#FF007F',
    warpEffectColor: '#00F0FF'
  },
  {
    id: 'inferno',
    name: 'Infernal Magma Realm',
    subtitle: 'Hyperthermal Volcanic Reality',
    description: 'A universe where the central star undergoes perpetual coronal flares, rivers of liquid basalt carve planetary mantles, and sulfur storms scorch every orbit.',
    badge: '🔥 INFERNO',
    starColor: '#FF3300',
    starGlow: '#FF6600',
    ambientLightColor: '#3D0C02',
    ambientIntensity: 0.35,
    spaceBackgroundColor: '#120301',
    orbitLineColor: '#FF4500',
    hudAccentColor: '#FF5722',
    warpEffectColor: '#FFA500'
  },
  {
    id: 'cryo',
    name: 'Glacial Cryo-Cosmos',
    subtitle: 'Sub-Zero Diamond Dimension',
    description: 'An ancient entropy-cooled reality illuminated by a pale sapphire white dwarf. Planets are shrouded in crystalline methane glaciers and diamond dust.',
    badge: '❄️ CRYO-VOID',
    starColor: '#A0E6FF',
    starGlow: '#3A86FF',
    ambientLightColor: '#05192D',
    ambientIntensity: 0.22,
    spaceBackgroundColor: '#010A14',
    orbitLineColor: '#5BC0BE',
    hudAccentColor: '#70D6FF',
    warpEffectColor: '#80ED99'
  },
  {
    id: 'exoplanets',
    name: 'Kepler Exoplanet Sanctuary',
    subtitle: 'Alien Habitable & Exotic Worlds',
    description: 'A deep-space excursion to extraordinary confirmed exoplanets: Trappist-1e, Kepler-452b, 55 Cancri e (the Diamond World), and HD 189733b (Glass Rain).',
    badge: '🪐 EXOPLANETS',
    starColor: '#FFD166',
    starGlow: '#06D6A0',
    ambientLightColor: '#122620',
    ambientIntensity: 0.25,
    spaceBackgroundColor: '#030E0A',
    orbitLineColor: '#06D6A0',
    hudAccentColor: '#06D6A0',
    warpEffectColor: '#118AB2'
  }
];

export const PRIME_PLANETS_DATA: PlanetData[] = [
  {
    id: 'sun',
    name: 'The Sun',
    glyph: '☉',
    tagline: 'The blazing yellow dwarf powerhouse of our solar system',
    category: 'Star',
    color: '#FDB813',
    glowColor: '#FF7700',
    accentColor: '#FFA500',
    surfaceType: 'sun',
    radius: 4.8,
    actualRadiusKm: 696340,
    orbitDistance: 0,
    actualDistanceKm: 0,
    orbitPeriodDays: 0,
    rotationPeriodHours: 609.6,
    orbitalSpeed: 0,
    rotationSpeed: 0.003,
    axialTiltDeg: 7.25,
    temperatureAvgC: 5500, // Surface
    gravityMps2: 274.0,
    escapeVelocityKps: 617.5,
    atmosphericPressure: 'Photosphere ~0.01 bar; Core ~250 billion bar',
    surfaceAreaMillionKm2: 6090000,
    moonsCount: 0,
    atmosphere: ['Hydrogen (73.4%)', 'Helium (25%)', 'Oxygen (0.8%)', 'Carbon (0.3%)', 'Neon (0.12%)'],
    description: 'The Sun is a G-type main-sequence star comprising 99.86% of the solar system’s total mass. Its roaring thermonuclear core fuses 600 million tons of hydrogen into helium every second, generating radiant energy that illuminates our worlds and powers all terrestrial life.',
    geology: 'Layered gaseous plasma: a dense thermonuclear core at 15 million °C, radiative zone transferring photons over 100,000 years, and a churning convective zone generating colossal magnetic dynamo loops, sunspots, and coronal mass ejections.',
    habitability: {
      score: 0,
      verdict: 'Completely Inhospitable',
      details: 'Extreme thermal radiation, high-energy gamma emissions, and gravitational crushing make physical biological existence impossible.'
    },
    missions: [
      { name: 'Parker Solar Probe', agency: 'NASA', year: '2018–Present', achievement: 'Became the fastest human-made object (690,000 km/h) and first to touch the solar corona.' },
      { name: 'Solar Orbiter', agency: 'ESA/NASA', year: '2020–Present', achievement: 'Captures the closest images ever taken of the Sun and maps unexplored polar magnetic fields.' },
      { name: 'SOHO', agency: 'ESA/NASA', year: '1995–Present', achievement: 'Discovered over 4,000 comets and revolutionized space weather coronal mass ejection warnings.' }
    ],
    funFacts: [
      'Over 1.3 million Earths could fit comfortably inside the volume of the Sun.',
      'Photons born in the solar core take up to 100,000 years to slowly bounce out through the radiative zone, but only 8 minutes and 20 seconds to reach Earth once freed into space.',
      'The solar corona (outer atmosphere) reaches 2 million °C, paradoxically hundreds of times hotter than the visible surface (5,500 °C).'
    ]
  },
  {
    id: 'mercury',
    name: 'Mercury',
    glyph: '☿',
    tagline: 'The iron-cored, crater-scarred innermost world',
    category: 'Terrestrial Planet',
    color: '#A8A8A8',
    glowColor: '#B0B0C0',
    accentColor: '#8C8C9A',
    surfaceType: 'rocky',
    radius: 0.75,
    actualRadiusKm: 2439.7,
    orbitDistance: 11,
    actualDistanceKm: 57.9,
    orbitPeriodDays: 88,
    rotationPeriodHours: 1407.6,
    orbitalSpeed: 0.04,
    rotationSpeed: 0.004,
    axialTiltDeg: 0.034,
    temperatureAvgC: 167,
    gravityMps2: 3.7,
    escapeVelocityKps: 4.25,
    atmosphericPressure: '10⁻¹⁴ bar (Virtually a hard vacuum exosphere)',
    surfaceAreaMillionKm2: 74.8,
    moonsCount: 0,
    atmosphere: ['Oxygen (42%)', 'Sodium (29%)', 'Hydrogen (22%)', 'Helium (6%)', 'Potassium (0.5%)'],
    description: 'Mercury is the smallest planet and closest to the Sun. Stripped of any insulating atmosphere, it undergoes the most savage thermal oscillations in the solar system, plunging from lead-melting daytime heat to cryogenic nighttime cold.',
    geology: 'Dominated by an enormous metallic iron core occupying 85% of its planetary radius. The silicate crust is covered in impact craters and lobate scarps (cliffs up to 3 km high) formed as the planet cooled and literally shrank by 7 km.',
    habitability: {
      score: 2,
      verdict: 'Extreme Vacuum Desert',
      details: 'Unshielded solar radiation, hard vacuum, and 600°C temperature swings make surface life unviable, though water ice survives in permanently shadowed polar craters.'
    },
    missions: [
      { name: 'MESSENGER', agency: 'NASA', year: '2004–2015', achievement: 'First spacecraft to orbit Mercury; proved the existence of water ice inside permanently shadowed polar craters.' },
      { name: 'BepiColombo', agency: 'ESA/JAXA', year: '2018–Present', achievement: 'Dual-probe mission en route to perform comprehensive magnetospheric and surface composition surveys.' },
      { name: 'Mariner 10', agency: 'NASA', year: '1973–1975', achievement: 'First spacecraft to visit Mercury, capturing initial high-resolution flyby imagery of its Moon-like crust.' }
    ],
    funFacts: [
      'Despite daytime temperatures reaching 430°C, NASA’s MESSENGER found billions of tons of water ice inside deep polar craters where sunlight never penetrates.',
      'A solar day on Mercury (sunrise to sunrise) lasts 176 Earth days—exactly twice as long as its entire 88-day year!',
      'Mercury has a magnetic field despite its small size, proving its giant iron core remains partially molten.'
    ]
  },
  {
    id: 'venus',
    name: 'Venus',
    glyph: '♀',
    tagline: 'Earth’s runaway greenhouse twin shrouded in acid storms',
    category: 'Terrestrial Planet',
    color: '#E8C587',
    glowColor: '#FFD700',
    accentColor: '#D4A373',
    surfaceType: 'cloudy',
    radius: 1.18,
    actualRadiusKm: 6051.8,
    orbitDistance: 17,
    actualDistanceKm: 108.2,
    orbitPeriodDays: 224.7,
    rotationPeriodHours: -5832.5, // Clockwise retrograde!
    orbitalSpeed: 0.026,
    rotationSpeed: -0.002,
    axialTiltDeg: 177.3,
    temperatureAvgC: 464,
    gravityMps2: 8.87,
    escapeVelocityKps: 10.36,
    atmosphericPressure: '92 bar (Equivalent to 900 meters deep in Earth oceans)',
    surfaceAreaMillionKm2: 460.2,
    moonsCount: 0,
    atmosphere: ['Carbon Dioxide (96.5%)', 'Nitrogen (3.5%)', 'Sulfur Dioxide (0.015%)', 'Sulfuric Acid Clouds'],
    description: 'Often called Earth’s twin due to near-identical size and mass, Venus is a hellish greenhouse world. Crushing carbon dioxide atmosphere traps solar heat so intensely that surface temperatures surpass Mercury, easily hot enough to liquify lead.',
    geology: 'A dynamic volcanic terrain featuring vast basaltic plains, pancake dome volcanoes, arachnoids, and rift valleys. Thousands of volcanic vents suggest the planet was resurfaced completely in catastrophic global volcanic events 500 million years ago.',
    habitability: {
      score: 12,
      verdict: 'Hostile Surface / Potential Cloud Microbes',
      details: 'Surface conditions are lethal; however, 50 km up in the cloud decks, temperatures are 20–30°C with 1 bar pressure, sparking intense debate about airborne microbial life.'
    },
    missions: [
      { name: 'Venera 13 & 14', agency: 'Soviet Union', year: '1981–1982', achievement: 'Landed directly on the incandescent surface, transmitting the first color panoramas and soil acoustic telemetry.' },
      { name: 'Magellan', agency: 'NASA', year: '1989–1994', achievement: 'Used synthetic aperture radar to map 98% of Venus’s hidden surface through the impenetrable sulfuric cloud layers.' },
      { name: 'Akatsuki', agency: 'JAXA', year: '2010–Present', achievement: 'Japanese orbiter monitoring equatorial gravity waves, super-rotating jet streams, and volcanic lightning.' }
    ],
    funFacts: [
      'Venus spins backwards (retrograde rotation), meaning the Sun rises in the west and sets in the east.',
      'A single Venusian day (243 Earth days) lasts longer than its entire orbital year around the Sun (225 Earth days)!',
      'Atmospheric winds whip around Venus at 360 km/h in a phenomenon called "super-rotation," circling the entire globe in just 4 days.'
    ]
  },
  {
    id: 'earth',
    name: 'Earth',
    glyph: '⊕',
    tagline: 'The pristine azure jewel pulsating with complex life',
    category: 'Terrestrial Planet',
    color: '#2B82C9',
    glowColor: '#00F0FF',
    accentColor: '#48E5C2',
    surfaceType: 'earth',
    radius: 1.25,
    actualRadiusKm: 6371.0,
    orbitDistance: 24,
    actualDistanceKm: 149.6,
    orbitPeriodDays: 365.25,
    rotationPeriodHours: 23.93,
    orbitalSpeed: 0.018,
    rotationSpeed: 0.015,
    axialTiltDeg: 23.44,
    temperatureAvgC: 15,
    gravityMps2: 9.807,
    escapeVelocityKps: 11.19,
    atmosphericPressure: '1.013 bar (Sea level standard)',
    surfaceAreaMillionKm2: 510.1,
    moonsCount: 1,
    hasMoons: true,
    hasClouds: true,
    atmosphere: ['Nitrogen (78.08%)', 'Oxygen (20.95%)', 'Argon (0.93%)', 'Carbon Dioxide (0.04%)', 'Water Vapor (1–4%)'],
    description: 'Earth is humanity’s home cradle and the only celestial body confirmed to harbor life. It features vast oceans of liquid water, a protective magnetosphere powered by a churning molten core, active plate tectonics, and a dynamically balanced oxygen-nitrogen atmosphere.',
    geology: 'Constantly renewed crust powered by seven major tectonic plates that drive volcanism, subduction, continental drift, and mountain building. It possesses a solid iron inner core and liquid iron-nickel outer core creating our magnetospheric shield.',
    habitability: {
      score: 100,
      verdict: 'Perfect Biological Oasis',
      details: 'Optimal Goldilocks orbital distance, stable ozone layer, liquid water oceans covering 71% of the crust, and nutrient cycling.'
    },
    moonsList: [
      { name: 'The Moon (Luna)', diameterKm: 3474.8, orbitalPeriodDays: 27.3, highlight: 'Stabilizes Earth’s axial tilt preventing catastrophic climate fluctuations; tidal driver of evolutionary adaptations.' }
    ],
    missions: [
      { name: 'International Space Station', agency: 'NASA/ESA/JAXA/Roscosmos', year: '1998–Present', achievement: 'Continuously inhabited orbital laboratory for microgravity biotechnology, physics, and Earth observation.' },
      { name: 'Landsat Program', agency: 'NASA/USGS', year: '1972–Present', achievement: 'Longest continuous space-based record of Earth’s surface, glaciers, forests, and climatic shifts.' },
      { name: 'Apollo Missions', agency: 'NASA', year: '1968–1972', achievement: 'Twelve humans walked on the Moon and returned 382 kg of lunar samples that unlocked solar system dating.' }
    ],
    funFacts: [
      'Earth is not a perfect sphere; centrifugal force from its 1,670 km/h spin causes an equatorial bulge of about 43 km.',
      'Our magnetic field shields the atmosphere from being stripped away by the supersonic solar wind.',
      '99% of all species that have ever lived on Earth are estimated to be extinct, showcasing life’s relentless cycle of reinvention.'
    ]
  },
  {
    id: 'mars',
    name: 'Mars',
    glyph: '♂',
    tagline: 'The rusty red frontier of future human colonization',
    category: 'Terrestrial Planet',
    color: '#C1440E',
    glowColor: '#FF5722',
    accentColor: '#E27D60',
    surfaceType: 'mars',
    radius: 0.88,
    actualRadiusKm: 3389.5,
    orbitDistance: 32,
    actualDistanceKm: 227.9,
    orbitPeriodDays: 687,
    rotationPeriodHours: 24.62,
    orbitalSpeed: 0.013,
    rotationSpeed: 0.012,
    axialTiltDeg: 25.19,
    temperatureAvgC: -63,
    gravityMps2: 3.72,
    escapeVelocityKps: 5.03,
    atmosphericPressure: '0.006 bar (Less than 1% of Earth’s sea level)',
    surfaceAreaMillionKm2: 144.8,
    moonsCount: 2,
    atmosphere: ['Carbon Dioxide (95.3%)', 'Nitrogen (2.6%)', 'Argon (1.9%)', 'Oxygen (0.13%)', 'Carbon Monoxide (0.08%)'],
    description: 'Mars is a cold desert world cloaked in fine iron oxide dust that gives it its iconic crimson hue. Ancient dried river valleys, delta deposits, and shorelines prove that billions of years ago, Mars was a warmer world with flowing rivers and deep northern oceans.',
    geology: 'Features Olympus Mons—the tallest shield volcano in the solar system rising 22 km high—and Valles Marineris, an immense rift canyon system spanning over 4,000 km in length and gouging up to 7 km deep.',
    habitability: {
      score: 42,
      verdict: 'Prime Colonization Candidate',
      details: 'Subsurface water ice reservoirs, accessible minerals, and a 24.6-hour day make Mars humanity’s prime terraforming candidate, though low gravity, thin air, and UV radiation pose challenges.'
    },
    moonsList: [
      { name: 'Phobos', diameterKm: 22.2, orbitalPeriodDays: 0.32, highlight: 'Orbits just 6,000 km above Mars; tidal deceleration will cause it to crash into Mars or form a ring in 50M years.' },
      { name: 'Deimos', diameterKm: 12.4, orbitalPeriodDays: 1.26, highlight: 'Tiny, smooth cratered captured asteroid with escape velocity of just 20 km/h (human sprint speed)!' }
    ],
    missions: [
      { name: 'Perseverance & Ingenuity', agency: 'NASA', year: '2021–Present', achievement: 'Coring rock samples for return to Earth; deployed the first powered atmospheric aircraft on another planet.' },
      { name: 'Curiosity Rover', agency: 'NASA', year: '2012–Present', achievement: 'Confirmed ancient Gale Crater once contained a long-lived habitable freshwater lake with organic molecules.' },
      { name: 'Tianwen-1 & Zhurong', agency: 'CNSA', year: '2020–Present', achievement: 'China’s historic mission achieving orbiter, lander, and rover deployment simultaneously in Utopia Planitia.' }
    ],
    funFacts: [
      'Martian sunsets glow with an eerie, serene pale-blue light because atmospheric fine dust scatters reddish wavelengths away from the line of sight.',
      'Gravity on Mars is only 38% of Earth’s—you could jump nearly three times higher and easily hoist heavy equipment.',
      'Mars hosts global dust storms that can envelope the entire planet in an impenetrable shroud for months at a time.'
    ]
  },
  {
    id: 'jupiter',
    name: 'Jupiter',
    glyph: '♃',
    tagline: 'The colossal gas sovereign harboring alien ocean moons',
    category: 'Gas Giant',
    color: '#C88B3A',
    glowColor: '#F4A261',
    accentColor: '#DDA15E',
    surfaceType: 'gas_bands',
    radius: 3.1,
    actualRadiusKm: 69911,
    orbitDistance: 45,
    actualDistanceKm: 778.6,
    orbitPeriodDays: 4333,
    rotationPeriodHours: 9.93, // Fastest spinning world!
    orbitalSpeed: 0.007,
    rotationSpeed: 0.025,
    axialTiltDeg: 3.13,
    temperatureAvgC: -110,
    gravityMps2: 24.79,
    escapeVelocityKps: 59.5,
    atmosphericPressure: 'Cloud tops ~1 bar; Mantle > 2,000,000 bar',
    surfaceAreaMillionKm2: 61420,
    moonsCount: 95,
    atmosphere: ['Hydrogen (89.8%)', 'Helium (10.2%)', 'Methane (0.3%)', 'Ammonia (0.026%)', 'Water Vapor'],
    description: 'Jupiter is an astronomical behemoth more than twice as massive as all other solar system planets combined. Its breathtaking atmosphere features alternating bands of ammonia clouds and the legendary Great Red Spot—an anticyclonic storm larger than Earth raging for centuries.',
    geology: 'Has no solid surface. Under increasing depth and crushing pressure, gaseous hydrogen condenses into a glowing ocean of liquid metallic hydrogen, an exotic electrical conductor that generates Jupiter’s colossal magnetosphere.',
    habitability: {
      score: 18,
      verdict: 'Inhospitable / Ocean Moons are Prime Targets',
      details: 'Jupiter itself is an uninhabitable pressure cooker, but its icy moons Europa and Ganymede conceal deep subsurface oceans considered top candidates for extraterrestrial biology.'
    },
    moonsList: [
      { name: 'Europa', diameterKm: 3121.6, orbitalPeriodDays: 3.55, highlight: 'Harbors a global saltwater ocean under an ice shell, holding twice as much water as all of Earth’s oceans combined!' },
      { name: 'Ganymede', diameterKm: 5268.2, orbitalPeriodDays: 7.15, highlight: 'Largest moon in the solar system (larger than Mercury); the only moon with its own internally generated magnetic field.' },
      { name: 'Io', diameterKm: 3643.2, orbitalPeriodDays: 1.77, highlight: 'Most volcanically active body in the solar system, with 400+ active volcanoes erupting sulfur plumes 500 km high.' },
      { name: 'Callisto', diameterKm: 4820.6, orbitalPeriodDays: 16.69, highlight: 'Most heavily cratered object in the solar system; an ancient primordial ice-rock world.' }
    ],
    missions: [
      { name: 'Juno', agency: 'NASA', year: '2016–Present', achievement: 'Swoops 4,000 km above cloud tops; discovered 3,000-km-deep atmospheric roots and polar cyclone clusters.' },
      { name: 'Galileo', agency: 'NASA', year: '1989–2003', achievement: 'First spacecraft to orbit Jupiter; dropped an atmospheric probe and proved Europa’s subsurface ocean.' },
      { name: 'JUICE & Europa Clipper', agency: 'ESA/NASA', year: '2023–2024 Launch', achievement: 'En route to conduct dedicated astrobiology investigations into Europa and Ganymede’s habitability.' }
    ],
    funFacts: [
      'Jupiter rotates in under 10 hours—the fastest spin of any planet—causing its equator to bulge out noticeably by 7% compared to its poles.',
      'The Great Red Spot is an immense crimson hurricane wider than planet Earth that has been continuously observed since the 1600s.',
      'Jupiter acts as the solar system’s gravitational vacuum cleaner, deflecting thousands of potentially catastrophic comets away from the inner planets.'
    ]
  },
  {
    id: 'saturn',
    name: 'Saturn',
    glyph: '♄',
    tagline: 'The magnificent ringed wonder of the cosmos',
    category: 'Gas Giant',
    color: '#E4C284',
    glowColor: '#FFE082',
    accentColor: '#F3C98B',
    surfaceType: 'saturn_bands',
    radius: 2.5,
    actualRadiusKm: 58232,
    orbitDistance: 58,
    actualDistanceKm: 1433.5,
    orbitPeriodDays: 10759,
    rotationPeriodHours: 10.7,
    orbitalSpeed: 0.005,
    rotationSpeed: 0.022,
    axialTiltDeg: 26.73,
    temperatureAvgC: -140,
    gravityMps2: 10.44,
    escapeVelocityKps: 35.5,
    atmosphericPressure: 'Cloud tops ~1 bar; Mantle > 1,000,000 bar',
    surfaceAreaMillionKm2: 42700,
    moonsCount: 146,
    hasRings: true,
    ringsRadiusInner: 3.1,
    ringsRadiusOuter: 5.8,
    ringColor: '#D8C29D',
    atmosphere: ['Hydrogen (96.3%)', 'Helium (3.25%)', 'Methane (0.45%)', 'Ammonia (0.01%)', 'Hydrogen Deuteride'],
    description: 'Saturn is the crowned jewel of our planetary system, celebrated for its astonishing and intricate ring system made of billions of water-ice fragments. A low-density gas giant, it could theoretically float in a bathtub of water if one were large enough!',
    geology: 'Gaseous hydrogen-helium mantle transitioning into liquid metallic hydrogen surrounding a dense rocky-ice core. At Saturn’s north pole lies an enigmatic, perfectly geometrical hexagonal jet stream storm 30,000 km across.',
    habitability: {
      score: 22,
      verdict: 'Inhospitable / Ocean Moons are Astrobiological Jewels',
      details: 'Titan possesses prebiotic chemistry with lakes of liquid methane; Enceladus erupts warm hydrothermal ocean geysers containing organic macromolecules.'
    },
    moonsList: [
      { name: 'Titan', diameterKm: 5149.5, orbitalPeriodDays: 15.95, highlight: 'Only moon with a dense atmosphere (1.5x Earth); features rivers, lakes, and seas of liquid methane and ethane.' },
      { name: 'Enceladus', diameterKm: 504.2, orbitalPeriodDays: 1.37, highlight: 'Shoots supersonic geysers of salty ocean water and organic molecules into space from hydrothermal vents.' },
      { name: 'Mimas', diameterKm: 396.4, orbitalPeriodDays: 0.94, highlight: 'Features colossal Herschel crater giving it an uncanny resemblance to the sci-fi "Death Star".' },
      { name: 'Iapetus', diameterKm: 1468.9, orbitalPeriodDays: 79.3, highlight: 'Yin-yang moon with one hemisphere pitch black as coal and the other brilliant snow white.' }
    ],
    missions: [
      { name: 'Cassini-Huygens', agency: 'NASA/ESA/ASI', year: '1997–2017', achievement: 'Explored Saturn for 13 years; landed Huygens probe on Titan and discovered Enceladus’s habitable water geysers.' },
      { name: 'Voyager 1 & 2', agency: 'NASA', year: '1980–1981', achievement: 'Provided first detailed images of the intricate braided ringlets, spokes, and Titan’s thick nitrogen smog.' },
      { name: 'Dragonfly (Upcoming)', agency: 'NASA', year: 'Launch 2028', achievement: 'Autonomous nuclear rotorcraft designed to fly across Titan’s dunes to explore prebiotic chemical evolution.' }
    ],
    funFacts: [
      'Saturn’s rings span 282,000 km across, yet they are paper-thin—averaging merely 10 to 30 meters thick!',
      'Saturn is the least dense planet in the solar system (0.687 g/cm³)—less dense than liquid water.',
      'A persistent geometric hexagonal hurricane 30,000 km wide spins perpetually at Saturn’s north pole.'
    ]
  },
  {
    id: 'uranus',
    name: 'Uranus',
    glyph: '♅',
    tagline: 'The enigmatic aquamarine giant tilted on its side',
    category: 'Ice Giant',
    color: '#70D6FF',
    glowColor: '#5BC0BE',
    accentColor: '#A0EADE',
    surfaceType: 'ice_blue',
    radius: 1.85,
    actualRadiusKm: 25362,
    orbitDistance: 71,
    actualDistanceKm: 2872.5,
    orbitPeriodDays: 30687,
    rotationPeriodHours: -17.24, // Retrograde & sideways!
    orbitalSpeed: 0.0035,
    rotationSpeed: -0.014,
    axialTiltDeg: 97.77,
    temperatureAvgC: -195,
    gravityMps2: 8.69,
    escapeVelocityKps: 21.3,
    atmosphericPressure: 'Cloud tops ~1 bar; Mantle thousands of bars',
    surfaceAreaMillionKm2: 8115,
    moonsCount: 28,
    hasRings: true,
    ringsRadiusInner: 2.3,
    ringsRadiusOuter: 3.3,
    ringColor: '#4A6FA5',
    atmosphere: ['Hydrogen (82.5%)', 'Helium (15.2%)', 'Methane (2.3%)', 'Hydrogen Deuteride', 'Ammonia Ice'],
    description: 'Uranus is an icy giant of serene turquoise hue caused by methane absorbing red wavelengths of sunlight. Uniquely knocked onto its side by a colossal ancient proto-planet impact, it essentially rolls along its orbital path like a giant cosmic bowling ball.',
    geology: 'A slushy, superheated interior mantle of "hot ice" consisting of water, ammonia, and methane fluids overlying a compact rocky core. Its magnetic poles are tilted an astonishing 59 degrees from its rotational axis.',
    habitability: {
      score: 5,
      verdict: 'Sub-Zero Cryogenic Giant',
      details: 'Supercritical high-pressure ice fluids and absence of any solid surface make physical habitability implausible.'
    },
    moonsList: [
      { name: 'Miranda', diameterKm: 471.6, orbitalPeriodDays: 1.41, highlight: 'Features Verona Rupes—the tallest cliff in the solar system (20 km sheer drop); walking off it takes 12 minutes to fall!' },
      { name: 'Titania', diameterKm: 1577.8, orbitalPeriodDays: 8.71, highlight: 'Largest moon of Uranus, crisscrossed by massive canyon fault valleys thousands of kilometers long.' },
      { name: 'Ariel', diameterKm: 1157.8, orbitalPeriodDays: 2.52, highlight: 'Brightest and geologically youngest surface among the Uranian moons with extensive cryovolcanic resurfacing.' }
    ],
    missions: [
      { name: 'Voyager 2', agency: 'NASA', year: 'January 1986', achievement: 'Only robotic emissary to ever visit Uranus, discovering 10 new moons, 2 new rings, and its bizarre tilted magnetosphere.' }
    ],
    funFacts: [
      'Because of its 98° axial tilt, each pole points almost directly at the Sun for 42 years, followed by 42 years of total darkness!',
      'Uranus holds the record for the coldest atmosphere recorded in the entire solar system, dropping to -224°C (-371°F).',
      'All 28 of Uranus’s moons are named after characters from the literary works of William Shakespeare and Alexander Pope.'
    ]
  },
  {
    id: 'neptune',
    name: 'Neptune',
    glyph: '♆',
    tagline: 'The tempestuous deep-azure guardian of the outer rim',
    category: 'Ice Giant',
    color: '#274690',
    glowColor: '#4361EE',
    accentColor: '#3A86FF',
    surfaceType: 'deep_blue',
    radius: 1.75,
    actualRadiusKm: 24622,
    orbitDistance: 83,
    actualDistanceKm: 4495.1,
    orbitPeriodDays: 60190,
    rotationPeriodHours: 16.11,
    orbitalSpeed: 0.0028,
    rotationSpeed: 0.016,
    axialTiltDeg: 28.32,
    temperatureAvgC: -201,
    gravityMps2: 11.15,
    escapeVelocityKps: 23.5,
    atmosphericPressure: 'Cloud tops ~1 bar; Mantle > 100,000 bar',
    surfaceAreaMillionKm2: 7618,
    moonsCount: 16,
    atmosphere: ['Hydrogen (80.0%)', 'Helium (19.0%)', 'Methane (1.5%)', 'Hydrogen Deuteride', 'Ethane'],
    description: 'Neptune is a world of vivid cobalt blue situated at the outermost edge of the major planetary realm. Despite receiving only 0.1% of Earth’s solar energy, it drives the most violent, supersonic winds in the solar system, gusting up to 2,100 km/h (1,300 mph).',
    geology: 'A fluid mantle of high-pressure water, ammonia, and methane ices over a dense rocky core the size of Earth. Thermodynamic models predict the crushing pressure compresses carbon into solid diamond crystals that rain down toward the core like gemstones.',
    habitability: {
      score: 6,
      verdict: 'Supersonic Cryogenic Inferno',
      details: 'Extreme hurricane velocities and supercritical ice fluids preclude life, though its captured moon Triton has an active cryovolcanic crust.'
    },
    moonsList: [
      { name: 'Triton', diameterKm: 2706.8, orbitalPeriodDays: -5.88, highlight: 'Orbits backwards (retrograde orbit); captured Kuiper Belt dwarf planet featuring liquid nitrogen geysers erupting 8 km high!' },
      { name: 'Proteus', diameterKm: 420.0, orbitalPeriodDays: 1.12, highlight: 'One of the darkest objects in space; irregular polygonal shape just below the threshold of gravity pulling it into a sphere.' }
    ],
    missions: [
      { name: 'Voyager 2', agency: 'NASA', year: 'August 1989', achievement: 'Historic flyby discovering the Great Dark Spot, complete ring arcs, and active cryogeysers on Triton.' }
    ],
    funFacts: [
      'Neptune was discovered purely through mathematics in 1846 after astronomers calculated that an unseen gravitational mass was tugging on Uranus’s orbit.',
      'Winds on Neptune are supersonic, blowing cirrus clouds faster than the speed of sound at over 2,100 km/h!',
      'Under intense mantle heat and pressure, methane breaks apart and carbon crystallizes into literal diamond rain.'
    ]
  }
];

export const EXOPLANETS_DATA: PlanetData[] = [
  {
    id: 'trappist1e',
    name: 'TRAPPIST-1e',
    glyph: '✦',
    tagline: 'The most promising Earth-sized habitable exoplanet',
    category: 'Exoplanet',
    color: '#38A3A5',
    glowColor: '#57CC99',
    accentColor: '#80ED99',
    surfaceType: 'earth',
    radius: 1.2,
    actualRadiusKm: 5800,
    orbitDistance: 16,
    actualDistanceKm: 390000000000000, // 39 light years
    orbitPeriodDays: 6.1,
    rotationPeriodHours: 146.4, // Tidally locked
    orbitalSpeed: 0.028,
    rotationSpeed: 0.005,
    axialTiltDeg: 0,
    temperatureAvgC: -15,
    gravityMps2: 9.12,
    escapeVelocityKps: 10.5,
    atmosphericPressure: '~0.8–1.2 bar estimated',
    surfaceAreaMillionKm2: 420,
    moonsCount: 0,
    atmosphere: ['Nitrogen', 'Carbon Dioxide', 'Water Vapor', 'Methane'],
    description: 'Located 39 light-years away in the constellation Aquarius, TRAPPIST-1e is an Earth-sized rocky exoplanet orbiting within the conservative habitable zone of an ultra-cool red dwarf star. It receives 66% of the starlight Earth gets, ideal for liquid water oceans.',
    geology: 'Dense iron-rich core comparable to Earth. Tidal locking means one hemisphere eternally faces the red dwarf star while the other sits in perpetual twilight frost, creating a rich habitable "terminator ring" along the day-night boundary.',
    habitability: {
      score: 88,
      verdict: 'Highest Known Exoplanet Habitability',
      details: 'James Webb Space Telescope spectroscopy indicates substantial rock mass and probable compact atmosphere capable of maintaining liquid oceans.'
    },
    funFacts: [
      'Six sister planets orbit alongside it in close proximity—from TRAPPIST-1e’s surface, neighboring planets would loom larger in the sky than our Moon!',
      'An entire year on TRAPPIST-1e takes just 6.1 Earth days.',
      'The red dwarf sun glows with an amber-red hue, bathing the landscape in perpetual golden sunset.'
    ]
  },
  {
    id: 'kepler452b',
    name: 'Kepler-452b',
    glyph: '♁',
    tagline: 'Earth’s older, larger cousin orbiting a Sun-like star',
    category: 'Super-Earth',
    color: '#588157',
    glowColor: '#A3B18A',
    accentColor: '#344E41',
    surfaceType: 'earth',
    radius: 1.6,
    actualRadiusKm: 10200,
    orbitDistance: 27,
    actualDistanceKm: 1400000000000000, // 1,400 light years
    orbitPeriodDays: 385,
    rotationPeriodHours: 28,
    orbitalSpeed: 0.017,
    rotationSpeed: 0.014,
    axialTiltDeg: 22,
    temperatureAvgC: 10,
    gravityMps2: 18.5,
    escapeVelocityKps: 18.2,
    atmosphericPressure: 'Estimated ~2 bar',
    surfaceAreaMillionKm2: 1300,
    moonsCount: 1,
    atmosphere: ['Thick Nitrogen-Oxygen Mix', 'Carbon Dioxide', 'Water Vapor'],
    description: 'Discovered by NASA’s Kepler Space Telescope in 2015, Kepler-452b is the first near-Earth-sized world discovered in the habitable zone of a G2-type star remarkably similar to our own Sun. Its star is 6 billion years old—1.5 billion years older than Sol.',
    geology: 'Likely a super-Earth with active volcanism, thick cloud layers, and substantial oceans. The higher gravity (nearly double Earth’s) would cause flatter topography and broader shallow seas.',
    habitability: {
      score: 79,
      verdict: 'Super-Earth Habitable Zone',
      details: 'Orbits at 1.05 AU with a 385-day year, receiving 10% more energy than Earth—a glimpse into Earth’s future as our Sun warms.'
    },
    funFacts: [
      'Kepler-452b is roughly 60% larger in diameter than Earth and five times as massive.',
      'Its 385-day orbital year is almost identical to Earth’s 365-day journey.',
      'Because its star is older, Kepler-452b may have enjoyed habitable conditions for over 5 billion years—ample time for life to evolve.'
    ]
  },
  {
    id: 'cancri55e',
    name: '55 Cancri e (Janssen)',
    glyph: '💎',
    tagline: 'The superheated diamond planet with carbon magma seas',
    category: 'Lava Planet',
    color: '#E07A5F',
    glowColor: '#F2CC8F',
    accentColor: '#DDA15E',
    surfaceType: 'lava',
    radius: 1.45,
    actualRadiusKm: 12000,
    orbitDistance: 40,
    actualDistanceKm: 400000000000000, // 40 light years
    orbitPeriodDays: 0.74, // 18 hours!
    rotationPeriodHours: 17.7,
    orbitalSpeed: 0.038,
    rotationSpeed: 0.03,
    axialTiltDeg: 5,
    temperatureAvgC: 2400,
    gravityMps2: 21.0,
    escapeVelocityKps: 24.0,
    atmosphericPressure: 'Vaporized mineral rock atmosphere',
    surfaceAreaMillionKm2: 1800,
    moonsCount: 0,
    atmosphere: ['Carbon Monoxide', 'Silicon Dioxide Vapor', 'Sodium', 'Hydrogen Cyanide'],
    description: '55 Cancri e is a carbon-rich Super-Earth situated a blistering 2.2 million km from its parent star. Its surface is a churning ocean of glowing liquid lava where carbon under colossal interior pressure crystallizes into thick layers of pure diamond!',
    geology: 'Composition is predominantly carbon (in the forms of graphite and diamond), iron, silicon carbide, and silicates. Thermal mapping shows the permanent dayside reaches 2,400°C with rivers of molten lava.',
    habitability: {
      score: 0,
      verdict: 'Molten Diamond Crucible',
      details: 'Surface rocks vaporize directly into the atmosphere; conditions are too extreme for any organic molecular structure.'
    },
    funFacts: [
      'A full year on 55 Cancri e lasts just 18 hours!',
      'Astronomers estimate at least a third of the planet’s mass—equivalent to three entire Earth masses—may be pure diamond.',
      'JWST detected evidence that the planet occasionally vents and re-condenses a mineral-rich secondary atmosphere.'
    ]
  },
  {
    id: 'hd189733b',
    name: 'HD 189733 b',
    glyph: '🌪️',
    tagline: 'The cobalt nightmare world where it rains sideways glass',
    category: 'Gas Giant',
    color: '#1D3557',
    glowColor: '#457B9D',
    accentColor: '#A8DADC',
    surfaceType: 'deep_blue',
    radius: 2.2,
    actualRadiusKm: 80000,
    orbitDistance: 56,
    actualDistanceKm: 630000000000000, // 64 light years
    orbitPeriodDays: 2.2,
    rotationPeriodHours: 52.8,
    orbitalSpeed: 0.015,
    rotationSpeed: 0.02,
    axialTiltDeg: 0,
    temperatureAvgC: 930,
    gravityMps2: 21.6,
    escapeVelocityKps: 42.0,
    atmosphericPressure: 'Deep gas envelope',
    surfaceAreaMillionKm2: 80000,
    moonsCount: 0,
    atmosphere: ['Hydrogen', 'Helium', 'Silicate Clouds', 'Methane', 'Sodium'],
    description: 'From deep space, HD 189733 b looks like a peaceful blue marble reminiscent of Earth. However, that azure color is caused by silicate particles scattering blue light—this is a "Hot Jupiter" where winds blow at 8,700 km/h and rain molten glass sideways!',
    geology: 'Gas giant with no solid boundary. The atmosphere features howling horizontal jet streams 7 times the speed of sound that whip molten silica droplets across the equator.',
    habitability: {
      score: 0,
      verdict: 'Lethal Silicate Storm',
      details: 'Superheated silicate winds and violent stellar flaring prevent any stable biology.'
    },
    funFacts: [
      'Winds rage at 8,700 km/h (5,400 mph)—nearly seven times the speed of sound!',
      'The rain consists of sharp molten silicate glass blowing horizontally in the wind.',
      'Its striking blue color comes from light scattering off silicate clouds rather than water oceans.'
    ]
  },
  {
    id: 'proximab',
    name: 'Proxima Centauri b',
    glyph: '⭐',
    tagline: 'Our nearest interstellar neighbor in the Alpha Centauri triad',
    category: 'Exoplanet',
    color: '#8338EC',
    glowColor: '#3A86FF',
    accentColor: '#FB5607',
    surfaceType: 'mars',
    radius: 1.15,
    actualRadiusKm: 6500,
    orbitDistance: 72,
    actualDistanceKm: 40000000000000, // 4.24 light years
    orbitPeriodDays: 11.2,
    rotationPeriodHours: 268.8,
    orbitalSpeed: 0.01,
    rotationSpeed: 0.006,
    axialTiltDeg: 0,
    temperatureAvgC: -39,
    gravityMps2: 10.1,
    escapeVelocityKps: 11.5,
    atmosphericPressure: 'Estimated 0.5–1.5 bar',
    surfaceAreaMillionKm2: 530,
    moonsCount: 0,
    atmosphere: ['Nitrogen', 'Trace Carbon Dioxide'],
    description: 'At just 4.24 light-years from Earth, Proxima Centauri b is the closest known exoplanet to our solar system. Orbiting in the habitable zone of our neighboring red dwarf, it will likely be the very first destination for future interstellar probes.',
    geology: 'Rocky terrestrial world with density indicating an iron core similar to Earth. Tidal locking produces distinct climate belts between the illuminated dayside and frozen nightside.',
    habitability: {
      score: 65,
      verdict: 'Interstellar Target / Flare Challenged',
      details: 'Ideal orbital temperature, but the planet is subjected to violent stellar ultraviolet flares from Proxima Centauri that could periodically erode its ozone layer.'
    },
    funFacts: [
      'It would take Voyager 1 about 73,000 years to reach Proxima b, but a laser-driven lightsail probe could reach it in 20 years!',
      'The parent star Proxima Centauri is part of a triple-star system with Alpha Centauri A and B.',
      'From Proxima b’s surface, two other suns would shine brightly in the sky like brilliant celestial lanterns.'
    ]
  }
];

export const SCALE_DISCLAIMER = {
  title: 'Visual Scale vs. Astronomical Scale',
  content: 'In our 3D Explorer, distances and planet sizes are scaled artistically so all worlds are visible simultaneously. In reality, the Sun is over 100 times wider than Earth, and if Earth were a marble, Neptune would be more than 3.5 kilometers away!'
};
