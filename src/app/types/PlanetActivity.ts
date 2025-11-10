export interface PlanetActivity {
  id: string
  planetId: string
  name: string
  description: string
  difficulty: 'low' | 'medium' | 'high'
  duration: string
  price: number
  image: string
  icon: string
}
