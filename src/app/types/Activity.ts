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

export interface Activity {
  id: number
  name: string
  description: string
  difficulty: 'easy' | 'medium' | 'hard'
  duration: string
  category: 'mountain' | 'water' | 'air' | 'forest' | 'desert'
  image: string
}
