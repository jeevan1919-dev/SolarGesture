import type { PlanetData } from '../types/solar';

export const PLANETS_DATA: PlanetData[] = [
  {
    id: 'sun',
    name: 'The Sun',
    tagline: 'The blazing heart of our solar system',
    category: 'Star',
    color: '#FDB813',
    glowColor: '#FF7700',
    accentColor: '#FFA500',
    radius: 4.5,
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
    moonsCount: 0,
    atmosphere: ['Hydrogen (73.4%)', 'Helium (25%)', 'Oxygen (0.8%)', 'Carbon (0.3%)'],
    description: 'The Sun is a yellow dwarf star at the center of our solar system, containing 99.86% of its total mass. Its nuclear fusion produces energy that lights the planets and sustains life on Earth.',
    geology: 'Gaseous plasma organized into convective and radiative zones. Magnetic storms create sunspots, coronal mass ejections, and solar wind that bathes the solar system.',
    funFacts: [
      'About 1.3 million Earths could fit inside the Sun.',
      'Light from the Sun takes roughly 8 minutes and 20 seconds to reach Earth.',
      'The core temperature of the Sun reaches an astounding 15 million °C (27 million °F).'
    ]
  },
  {
    id: 'mercury',
    name: 'Mercury',
    tagline: 'The swift, cratered innermost world',
    category: 'Terrestrial Planet',
    color: '#A5A5A5',
    glowColor: '#B0B0C0',
    accentColor: '#8C8C9A',
    radius: 0.7,
    actualRadiusKm: 2439.7,
    orbitDistance: 11,
    actualDistanceKm: 57.9,
    orbitPeriodDays: 88,
    rotationPeriodHours: 1407.6, // 58.6 Earth days
    orbitalSpeed: 0.04,
    rotationSpeed: 0.004,
    axialTiltDeg: 0.034,
    temperatureAvgC: 167,
    gravityMps2: 3.7,
    moonsCount: 0,
    atmosphere: ['Trace Oxygen (42%)', 'Sodium (29%)', 'Hydrogen (22%)', 'Helium (6%)'],
    description: 'Mercury is the smallest planet in the solar system and closest to the Sun. Due to having virtually no atmosphere to trap heat, it experiences the most extreme temperature swings in the solar system.',
    geology: 'Dense metallic core making up 85% of its radius, covered by a silicate mantle and heavily cratered crust resembling Earth’s Moon.',
    funFacts: [
      'Day temperatures reach 430°C while night temperatures plunge to -180°C.',
      'Despite being closest to the Sun, radar has detected water ice inside permanently shadowed polar craters.',
      'One solar day on Mercury lasts two of its Martian/Mercurian years (176 Earth days)!'
    ]
  },
  {
    id: 'venus',
    name: 'Venus',
    tagline: 'Earth’s toxic twin draped in sulfuric clouds',
    category: 'Terrestrial Planet',
    color: '#E3BB7B',
    glowColor: '#FFD700',
    accentColor: '#D4A373',
    radius: 1.15,
    actualRadiusKm: 6051.8,
    orbitDistance: 16.5,
    actualDistanceKm: 108.2,
    orbitPeriodDays: 224.7,
    rotationPeriodHours: -5832.5, // Retrograde rotation!
    orbitalSpeed: 0.025,
    rotationSpeed: -0.002,
    axialTiltDeg: 177.3,
    temperatureAvgC: 464,
    gravityMps2: 8.87,
    moonsCount: 0,
    atmosphere: ['Carbon Dioxide (96.5%)', 'Nitrogen (3.5%)', 'Sulfuric Acid Clouds'],
    description: 'Venus is often called Earth’s twin due to similar size and structure, but a runaway greenhouse effect makes it the hottest planet in the solar system, hot enough to melt lead.',
    geology: 'Volcanic plains covered in basalt lava, fractured highlands, and thousands of active or dormant volcanoes under crushing atmospheric pressure 92 times that of Earth.',
    funFacts: [
      'Venus rotates clockwise (retrograde), meaning the Sun rises in the west and sets in the east.',
      'A day on Venus (243 Earth days) is longer than its entire year (225 Earth days).',
      'The Soviet spacecraft Venera 13 survived for 127 minutes on the surface, sending back full-color panoramas before succumbing to the heat and pressure.'
    ]
  },
  {
    id: 'earth',
    name: 'Earth',
    tagline: 'The vibrant blue marble teeming with life',
    category: 'Terrestrial Planet',
    color: '#2B82C9',
    glowColor: '#00F0FF',
    accentColor: '#48E5C2',
    radius: 1.25,
    actualRadiusKm: 6371.0,
    orbitDistance: 23,
    actualDistanceKm: 149.6,
    orbitPeriodDays: 365.25,
    rotationPeriodHours: 23.93,
    orbitalSpeed: 0.018,
    rotationSpeed: 0.015,
    axialTiltDeg: 23.44,
    temperatureAvgC: 15,
    gravityMps2: 9.807,
    moonsCount: 1,
    hasMoons: true,
    atmosphere: ['Nitrogen (78%)', 'Oxygen (21%)', 'Argon (0.93%)', 'Carbon Dioxide (0.04%)'],
    description: 'Earth is our home planet and the only celestial body known to harbor life. It boasts abundant liquid water oceans, an active magnetosphere protecting against cosmic radiation, and a dynamic oxygen-rich atmosphere.',
    geology: 'Active tectonic plates that continuously renew the surface through continental drift, subduction, earthquakes, volcanism, and mountain building.',
    funFacts: [
      'Over 71% of Earth’s surface is covered by liquid oceans, holding 96.5% of all water on the planet.',
      'Earth’s magnetic field is generated by a churning molten iron outer core 3,000 km below ground.',
      'Earth is the only planet not named after a Greek or Roman deity.'
    ]
  },
  {
    id: 'mars',
    name: 'Mars',
    tagline: 'The crimson frontier of human exploration',
    category: 'Terrestrial Planet',
    color: '#C1440E',
    glowColor: '#FF5722',
    accentColor: '#E27D60',
    radius: 0.85,
    actualRadiusKm: 3389.5,
    orbitDistance: 31,
    actualDistanceKm: 227.9,
    orbitPeriodDays: 687,
    rotationPeriodHours: 24.62,
    orbitalSpeed: 0.012,
    rotationSpeed: 0.012,
    axialTiltDeg: 25.19,
    temperatureAvgC: -63,
    gravityMps2: 3.72,
    moonsCount: 2,
    atmosphere: ['Carbon Dioxide (95.3%)', 'Nitrogen (2.6%)', 'Argon (1.9%)', 'Trace Water Vapor'],
    description: 'Known as the Red Planet due to iron oxide (rust) on its surface, Mars is a dusty, cold desert world with a very thin atmosphere, giant extinct volcanoes, and frozen water at its poles.',
    geology: 'Features Olympus Mons—the tallest volcano in the solar system (22 km high)—and Valles Marineris, a canyon system 4,000 km long and up to 7 km deep.',
    funFacts: [
      'Sunsets on Mars appear ethereal blue because fine atmospheric dust scatters red light forward.',
      'Mars has two tiny captured asteroid moons named Phobos (Fear) and Deimos (Panic).',
      'Ancient riverbeds and lake basins prove liquid water once flowed profusely across Mars billions of years ago.'
    ]
  },
  {
    id: 'jupiter',
    name: 'Jupiter',
    tagline: 'The colossal king of the planetary realm',
    category: 'Gas Giant',
    color: '#C88B3A',
    glowColor: '#F4A261',
    accentColor: '#DDA15E',
    radius: 2.8,
    actualRadiusKm: 69911,
    orbitDistance: 43,
    actualDistanceKm: 778.6,
    orbitPeriodDays: 4333, // 11.86 Earth years
    rotationPeriodHours: 9.93, // Fastest spinning planet!
    orbitalSpeed: 0.007,
    rotationSpeed: 0.025,
    axialTiltDeg: 3.13,
    temperatureAvgC: -110,
    gravityMps2: 24.79,
    moonsCount: 95,
    atmosphere: ['Hydrogen (89.8%)', 'Helium (10.2%)', 'Methane', 'Ammonia', 'Water'],
    description: 'Jupiter is more than twice as massive as all other solar system planets combined. Its iconic swirling cloud bands and Great Red Spot—a storm larger than Earth raging for over 300 years—dominate its appearance.',
    geology: 'No solid surface. As depth increases, extreme pressure compresses hydrogen gas into an exotic liquid metallic ocean surrounding a dense rocky/metallic core.',
    funFacts: [
      'Jupiter acts as a gravitational shield, deflecting or capturing comets and asteroids that could otherwise strike Earth.',
      'Europa, one of its Galilean moons, hides a subsurface liquid ocean containing twice the water of all Earth’s oceans combined.',
      'Jupiter rotates in under 10 hours, causing its equator to noticeably bulge outward.'
    ]
  },
  {
    id: 'saturn',
    name: 'Saturn',
    tagline: 'The celestial jewel with resplendent rings',
    category: 'Gas Giant',
    color: '#E2BF7D',
    glowColor: '#FFE082',
    accentColor: '#F3C98B',
    radius: 2.3,
    actualRadiusKm: 58232,
    orbitDistance: 55,
    actualDistanceKm: 1433.5,
    orbitPeriodDays: 10759, // 29.45 Earth years
    rotationPeriodHours: 10.7,
    orbitalSpeed: 0.005,
    rotationSpeed: 0.022,
    axialTiltDeg: 26.73,
    temperatureAvgC: -140,
    gravityMps2: 10.44,
    moonsCount: 146,
    hasRings: true,
    ringsRadiusInner: 2.8,
    ringsRadiusOuter: 5.2,
    ringColor: '#D8C29D',
    atmosphere: ['Hydrogen (96.3%)', 'Helium (3.25%)', 'Methane', 'Ammonia'],
    description: 'Saturn is the sixth planet from the Sun and famous for its spectacular ring system made of billions of chunks of water ice and rock, ranging in size from dust grains to mountain-sized boulders.',
    geology: 'Like Jupiter, Saturn is composed primarily of hydrogen and helium with deep liquid metallic layers. It is the least dense planet—so light it would theoretically float in a sufficiently large bathtub of water!',
    funFacts: [
      'The rings span up to 282,000 km across, yet are remarkably thin—averaging only about 10 to 30 meters thick.',
      'Its largest moon Titan has a thick nitrogen atmosphere, methane rain, and liquid hydrocarbon seas.',
      'Another moon, Enceladus, shoots geysers of salty water vapor into space from an underground ocean.'
    ]
  },
  {
    id: 'uranus',
    name: 'Uranus',
    tagline: 'The sideways ice giant with pale cyan hues',
    category: 'Ice Giant',
    color: '#70D6FF',
    glowColor: '#5BC0BE',
    accentColor: '#A0EADE',
    radius: 1.7,
    actualRadiusKm: 25362,
    orbitDistance: 68,
    actualDistanceKm: 2872.5,
    orbitPeriodDays: 30687, // 84 Earth years
    rotationPeriodHours: -17.24, // Retrograde
    orbitalSpeed: 0.0035,
    rotationSpeed: -0.014,
    axialTiltDeg: 97.77, // Tilted on its side!
    temperatureAvgC: -195,
    gravityMps2: 8.69,
    moonsCount: 28,
    hasRings: true,
    ringsRadiusInner: 2.1,
    ringsRadiusOuter: 2.9,
    ringColor: '#4A6FA5',
    atmosphere: ['Hydrogen (82.5%)', 'Helium (15.2%)', 'Methane (2.3%)', 'Ammonia Ice'],
    description: 'Uranus is an ice giant with a unique 98-degree axial tilt, causing it to effectively rotate on its side like a rolling ball. Methane in its upper atmosphere absorbs red light, giving the planet its serene aquamarine color.',
    geology: 'A fluid interior mantle rich in "icy" volatiles (water, methane, and ammonia) overlying a small rocky core. The magnetic poles are displaced 60 degrees from the rotational axis.',
    funFacts: [
      'Because of its extreme sideways tilt, each pole experiences 42 straight years of continuous sunlight followed by 42 years of darkness.',
      'Uranus was the first planet discovered using a telescope, by astronomer William Herschel in 1781.',
      'It has the coldest planetary atmosphere recorded in the solar system, with minimum temperatures dipping to -224°C.'
    ]
  },
  {
    id: 'neptune',
    name: 'Neptune',
    tagline: 'The stormy deep-azure giant of the outer rim',
    category: 'Ice Giant',
    color: '#274690',
    glowColor: '#4361EE',
    accentColor: '#3A86FF',
    radius: 1.6,
    actualRadiusKm: 24622,
    orbitDistance: 80,
    actualDistanceKm: 4495.1,
    orbitPeriodDays: 60190, // 164.8 Earth years
    rotationPeriodHours: 16.11,
    orbitalSpeed: 0.0028,
    rotationSpeed: 0.016,
    axialTiltDeg: 28.32,
    temperatureAvgC: -201,
    gravityMps2: 11.15,
    moonsCount: 16,
    atmosphere: ['Hydrogen (80%)', 'Helium (19%)', 'Methane (1.5%)', 'Hydrogen Deuteride'],
    description: 'Neptune is the most distant major planet from the Sun. An ice giant of vibrant cobalt blue, it is home to the most ferocious supersonic winds in the solar system, whipping clouds at over 2,100 km/h (1,300 mph).',
    geology: 'A thick, super-hot dense fluid of water, ammonia, and methane ices over an Earth-sized rocky/metal core. Intense pressures might even form diamond rain deep within its mantle.',
    funFacts: [
      'Neptune was discovered through mathematical calculations rather than direct observation when astronomers noticed irregularities in Uranus’s orbit.',
      'Voyager 2 is the only spacecraft that has ever visited Neptune, flying past in August 1989.',
      'Its largest moon Triton orbits backward (retrograde orbit) and is volcanically active with liquid nitrogen geysers.'
    ]
  }
];

export const SCALE_DISCLAIMER = {
  title: 'Visual Scale vs. Astronomical Scale',
  content: 'In our 3D Explorer, distances and planet sizes are scaled artistically so all worlds are visible simultaneously. In reality, the Sun is over 100 times wider than Earth, and if Earth were a marble, Neptune would be more than 3.5 kilometers away!'
};
