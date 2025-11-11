export interface Planet {
  id: string
  name: string
  system: string
  description: string
  climate: string
  rating: number
  images: string[]
  distance: number // años luz
  price: number // en créditos galácticos
  position: { x: number; y: number } // para posicionamiento en el mapa
}
