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
    <div className="relative h-48 overflow-hidden rounded-t-xl bg-linear-to-br from-indigo-950 to-purple-950 sm:h-64 md:h-80 lg:h-96">
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

      {/* Navigation Arrows */}
      <button
        onClick={prevImage}
        className="absolute top-1/2 left-2 flex h-8 w-8 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-cyan-400/50 bg-black/50 transition-all duration-300 hover:border-cyan-400 hover:bg-black/70 md:left-4 md:h-10 md:w-10"
      >
        <ChevronLeft size={14} className="text-cyan-400 md:h-4 md:w-4" />
      </button>
      <button
        onClick={nextImage}
        className="absolute top-1/2 right-2 flex h-8 w-8 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-cyan-400/50 bg-black/50 transition-all duration-300 hover:border-cyan-400 hover:bg-black/70 md:right-4 md:h-10 md:w-10"
      >
        <ChevronRight size={14} className="text-cyan-400 md:h-4 md:w-4" />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-2 left-1/2 flex -translate-x-1/2 gap-1.5 md:bottom-4 md:gap-2">
        {planetImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentImageIndex(index)}
            className={`h-1.5 w-1.5 rounded-full transition-all duration-300 md:h-2 md:w-2 ${
              index === currentImageIndex
                ? 'w-4 bg-cyan-400 md:w-6'
                : 'bg-white/50 hover:bg-white/70'
            }`}
          />
        ))}
      </div>

      {/* System Badge */}
      <div className="absolute top-2 left-2 md:top-4 md:left-4">
        <Badge className="border-cyan-400/50 bg-black/50 text-xs text-white backdrop-blur-sm md:text-sm">
          {planet.system}
        </Badge>
      </div>

      {/* Gallery Button - Hidden on mobile */}
      <div className="absolute top-2 right-2 hidden gap-2 sm:flex md:top-4 md:right-4">
        <Button
          variant="text"
          className="cursor-text! border border-cyan-400/50 bg-black/50! text-xs text-white backdrop-blur-sm md:text-sm"
        >
          <Camera size={14} className="mr-1 md:mr-2 md:h-4 md:w-4" />
          Galería
        </Button>
      </div>
    </div>
  )
}
