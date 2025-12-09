import type { Destiny } from '@/app/types/Destiny'
import { Badge } from '@/shared/components/Bagde'
import { Button } from '@/shared/components/Button'
import { ImageWithFallback } from '@/shared/components/ImageWithFallback'
import { Camera, ChevronLeft, ChevronRight } from 'lucide-react'
import { motion, AnimatePresence } from 'motion/react'
import { useState } from 'react'

interface Props {
  planet: Destiny
  planetImages: string[]
}

export const CarrouselImage = ({ planet, planetImages }: Props) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const nextImage = () => {
    setCurrentImageIndex(prev => (prev + 1) % planetImages.length)
  }

  const prevImage = () => {
    setCurrentImageIndex(
      prev => (prev - 1 + planetImages.length) % planetImages.length
    )
  }

  return (
    <div className="relative h-96 overflow-hidden rounded-t-xl bg-linear-to-br from-indigo-950 to-purple-950">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentImageIndex}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0"
        >
          <ImageWithFallback
            src={planetImages[currentImageIndex]}
            alt={`${planet.name} vista ${currentImageIndex + 1}`}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />
        </motion.div>
      </AnimatePresence>

      <button
        onClick={prevImage}
        className="absolute top-1/2 left-4 flex h-10 w-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-cyan-400/50 bg-black/50 transition-all duration-300 hover:border-cyan-400 hover:bg-black/70"
      >
        <ChevronLeft size={16} className="text-cyan-400" />
      </button>
      <button
        onClick={nextImage}
        className="absolute top-1/2 right-4 flex h-10 w-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-cyan-400/50 bg-black/50 transition-all duration-300 hover:border-cyan-400 hover:bg-black/70"
      >
        <ChevronRight size={16} className="text-cyan-400" />
      </button>

      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
        {planetImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentImageIndex(index)}
            className={`h-2 w-2 rounded-full transition-all duration-300 ${
              index === currentImageIndex
                ? 'w-6 bg-cyan-400'
                : 'bg-white/50 hover:bg-white/70'
            }`}
          />
        ))}
      </div>

      <div className="absolute top-4 left-4">
        <Badge className="border-cyan-400/50 bg-black/50 text-white backdrop-blur-sm">
          {planet.system}
        </Badge>
      </div>

      <div className="absolute top-4 right-4 flex gap-2">
        <Button
          variant="text"
          className="cursor-text! border border-cyan-400/50 bg-black/50! text-white backdrop-blur-sm"
        >
          <Camera size={16} className="mr-2" />
          Galería
        </Button>
      </div>
    </div>
  )
}
