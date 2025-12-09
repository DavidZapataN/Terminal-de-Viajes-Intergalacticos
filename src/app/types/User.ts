export interface User {
  id: string
  name: string
  email: string
  password?: string // Solo para mock
  role: 'user' | 'admin'
  createdAt: string
}
