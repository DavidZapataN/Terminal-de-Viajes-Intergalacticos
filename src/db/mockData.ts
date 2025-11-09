import type { ReservationAdmin } from '@/features/admin/components/PassengersList'
import type { Planet } from '@/features/admin/components/PlanetCard'
import type { Spaceship } from '@/features/admin/components/StarshipsList'
import type { Reservation } from '@/features/profile/components/ReservationCard'

export const mockSpaceships: Spaceship[] = [
  {
    id: 'starweaver',
    name: 'Starweaver',
    class: 'Crucero Galáctico',
    capacity: 500,
    speed: 9.8,
    status: 'active',
    amenities: [
      'Spa cuántico',
      'Holodeck',
      'Casino gravitacional',
      'Restaurante molecular',
    ],
  },
  {
    id: 'void-runner',
    name: 'Void Runner',
    class: 'Explorador Rápido',
    capacity: 150,
    speed: 12.5,
    status: 'active',
    amenities: [
      'Laboratorio de investigación',
      'Gimnasio de gravedad cero',
      'Lounge panorámico',
    ],
  },
  {
    id: 'nebula-dream',
    name: 'Nebula Dream',
    class: 'Lujoso Imperial',
    capacity: 200,
    speed: 8.2,
    status: 'maintenance',
    amenities: [
      'Suites imperiales',
      'Teatro holográfico',
      'Jardines biológicos',
      'Spa de teletransporte',
    ],
  },
  {
    id: 'cosmic-odyssey',
    name: 'Cosmic Odyssey',
    class: 'Transbordador Interplanetario',
    capacity: 300,
    speed: 10.0,
    status: 'unavailable',
    amenities: [
      'Cafetería estelar',
      'Sala de juegos antigravedad',
      'Observatorio espacial',
    ],
  },
]

export const mockPlanets: Planet[] = [
  {
    id: 'kepler-442b',
    name: 'Kepler-442b',
    system: 'Sistema Lyra',
    description:
      'Un exoplaneta rocoso en la zona habitable con océanos cristalinos y auroras perpetuas.',
    climate: 'Templado tropical',
    activities: [
      'Exploración submarina',
      'Observación de auroras',
      'Senderismo alienígena',
    ],
    rating: 4.8,
    reviews: 2847,
    image: 'https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=800',
    distance: 1.2,
    price: 15000,
    position: { x: 25, y: 30 },
  },
  {
    id: 'proxima-centauri-b',
    name: 'Proxima Centauri b',
    system: 'Sistema Alpha Centauri',
    description:
      'El exoplaneta más cercano a la Tierra, con vastos desiertos rojos y formaciones cristalinas.',
    climate: 'Árido con oasis',
    activities: [
      'Minería de cristales',
      'Exploración de cuevas',
      'Sandboarding espacial',
    ],
    rating: 4.2,
    reviews: 1563,
    image: 'https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?w=800',
    distance: 4.2,
    price: 8500,
    position: { x: 60, y: 45 },
  },
  {
    id: 'trappist-1e',
    name: 'TRAPPIST-1e',
    system: 'Sistema TRAPPIST-1',
    description:
      'Mundo acuático con archipiélagos flotantes y vida marina bioluminiscente.',
    climate: 'Oceánico templado',
    activities: [
      'Buceo con aliens',
      'Navegación interdimensional',
      'Pesca cuántica',
    ],
    rating: 4.9,
    reviews: 3924,
    image: 'https://images.unsplash.com/photo-1518066000-4b1b4adefcb4?w=800',
    distance: 39.6,
    price: 25000,
    position: { x: 75, y: 20 },
  },
  {
    id: 'gliese-667cc',
    name: 'Gliese 667Cc',
    system: 'Sistema Gliese 667C',
    description:
      'Planeta volcánico con géiseres de lava y ciudades subterráneas habitadas.',
    climate: 'Volcánico extremo',
    activities: [
      'Turismo volcánico',
      'Intercambio cultural',
      'Deportes de gravedad',
    ],
    rating: 4.1,
    reviews: 891,
    image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800',
    distance: 23.6,
    price: 18500,
    position: { x: 40, y: 70 },
  },
  {
    id: 'hd-40307g',
    name: 'HD 40307g',
    system: 'Sistema Pictor',
    description:
      'Supera-Tierra con bosques de cristal y fauna simbiótica única.',
    climate: 'Bosque cristalino',
    activities: [
      'Safari alienígena',
      'Meditación cuántica',
      'Fotografía holográfica',
    ],
    rating: 4.7,
    reviews: 2156,
    image: 'https://images.unsplash.com/photo-1502134249126-9f3755a50d78?w=800',
    distance: 42.0,
    price: 22000,
    position: { x: 15, y: 55 },
  },
  {
    id: 'wolf-1061c',
    name: 'Wolf 1061c',
    system: 'Sistema Wolf 1061',
    description:
      'Mundo helado con cañones de hielo y auroras que danzan entre lunas gemelas.',
    climate: 'Polar ártico',
    activities: [
      'Esquí gravitacional',
      'Escalada en hielo',
      'Observación lunar',
    ],
    rating: 4.3,
    reviews: 1247,
    image: 'https://images.unsplash.com/photo-1551188449-8f0a48831b14?w=800',
    distance: 13.8,
    price: 12000,
    position: { x: 85, y: 35 },
  },
]

export const mockReservations: Reservation[] = [
  {
    id: 'RES-001',
    destination: 'Kepler-442b',
    departureDate: '2024-12-15',
    returnDate: '2024-12-22',
    status: 'confirmed',
    ship: 'Stellar Voyager',
    cabin: 'Premium',
  },
  {
    id: 'RES-002',
    destination: 'Proxima Centauri b',
    departureDate: '2024-11-28',
    returnDate: '2024-12-05',
    status: 'completed',
    ship: 'Galaxy Explorer',
    cabin: 'Lujo Imperial',
  },
  {
    id: 'RES-003',
    destination: 'TRAPPIST-1e',
    departureDate: '2025-01-10',
    returnDate: '2025-01-17',
    status: 'pending',
    ship: 'Nebula Cruiser',
    cabin: 'Económica',
  },
]

export const mockReservationsAdmin: ReservationAdmin[] = [
  {
    id: 'res-001',
    planetId: 'kepler-442b',
    shipId: 'starweaver',
    departureDate: '2025-12-15',
    returnDate: '2025-12-22',
    passengers: 2,
    cabinClass: 'Lujo',
    status: 'confirmed',
    totalCost: 30000,
  },
  {
    id: 'res-002',
    planetId: 'trappist-1e',
    shipId: 'void-runner',
    departureDate: '2025-11-28',
    returnDate: '2025-12-05',
    passengers: 1,
    cabinClass: 'Estándar',
    status: 'completed',
    totalCost: 25000,
  },
  {
    id: 'res-003',
    planetId: 'gliese-667cc',
    shipId: 'void-runner',
    departureDate: '2025-11-28',
    returnDate: '2025-12-05',
    passengers: 4,
    cabinClass: 'Estándar',
    status: 'cancelled',
    totalCost: 25000,
  },
]
