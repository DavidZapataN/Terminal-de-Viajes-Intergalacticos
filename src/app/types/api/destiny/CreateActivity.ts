export interface CreateActivity {
  name: string
  description: string
  difficulty: 'easy' | 'medium' | 'hard'
  duration: string
  category: 'mountain' | 'water' | 'air' | 'forest' | 'desert'
  image: string
}
