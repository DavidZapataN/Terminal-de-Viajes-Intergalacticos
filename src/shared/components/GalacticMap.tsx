import { mockPlanets } from '@/db/mockData'
import type { Planet } from '@/features/admin/components/PlanetCard'
import { Star, Thermometer, Users } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { useRef, useState } from 'react'
import { Title } from './Title'

interface GalacticMapProps {
  onPlanetClick: (planet: Planet) => void
}

export function GalacticMap({ onPlanetClick }: GalacticMapProps) {
  const [hoveredPlanet, setHoveredPlanet] = useState<string | null>(null)
  const [mapTransform, setMapTransform] = useState({ scale: 1, x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const mapRef = useRef<HTMLDivElement>(null)
  const dragStart = useRef({ x: 0, y: 0 })

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true)
    dragStart.current = {
      x: e.clientX - mapTransform.x,
      y: e.clientY - mapTransform.y,
    }
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return

    setMapTransform(prev => ({
      ...prev,
      x: e.clientX - dragStart.current.x,
      y: e.clientY - dragStart.current.y,
    }))
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault()
    const delta = e.deltaY * -0.001
    const newScale = Math.min(Math.max(0.5, mapTransform.scale + delta), 3)

    setMapTransform(prev => ({
      ...prev,
      scale: newScale,
    }))
  }

  const handlePlanetClick = (planet: Planet, e: React.MouseEvent) => {
    e.stopPropagation()
    // Trigger zoom galactic animation before navigating
    const planetElement = e.currentTarget as HTMLElement
    planetElement.style.transform = 'scale(3)'
    planetElement.style.transition = 'transform 0.5s ease-in-out'

    setTimeout(() => {
      onPlanetClick(planet)
    }, 300)
  }

  const connections = [
    { from: mockPlanets[0], to: mockPlanets[1] },
    { from: mockPlanets[1], to: mockPlanets[2] },
    { from: mockPlanets[2], to: mockPlanets[3] },
    { from: mockPlanets[0], to: mockPlanets[4] },
    { from: mockPlanets[4], to: mockPlanets[5] },
  ]

  return (
    <div className="relative h-80 w-full cursor-grab overflow-hidden rounded-lg bg-gradient-to-br from-black via-slate-950 to-indigo-950 active:cursor-grabbing">
      {/* Fondo estrellado */}
      <div className="pointer-events-none absolute inset-0 z-0 h-full w-full">
        {/* Capa de estrellas estáticas */}
        <div
          className="absolute inset-0 z-0 h-full w-full bg-black"
          style={{
            backgroundImage: "url('/images/estrellas-estaticas.png')",
            backgroundRepeat: 'repeat',
            backgroundPosition: 'top center',
          }}
        />
        {/* Capa de estrellas moviéndose */}
        <div
          className="animate-twinkling absolute inset-0 z-[1] h-full w-full opacity-50"
          style={{
            backgroundImage: "url('/images/estrellas-estaticas.png')",
            backgroundRepeat: 'repeat',
            backgroundPosition: 'top center',
          }}
        />
        {/* Capa de estrellas parpadeantes */}
        <div
          className="animate-twinkling absolute inset-0 z-[0] h-full w-full"
          style={{
            backgroundImage: "url('/images/estrellas-parpadeantes.png')",
            backgroundRepeat: 'repeat',
            backgroundPosition: 'top center',
          }}
        />
      </div>

      <div
        ref={mapRef}
        className="absolute inset-0 z-10 transition-transform duration-200"
        style={{
          transform: `translate(${mapTransform.x}px, ${mapTransform.y}px) scale(${mapTransform.scale})`,
          cursor: isDragging ? 'grabbing' : 'grab',
        }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onWheel={handleWheel}
      >
        <svg className="pointer-events-none absolute inset-0 h-full w-full">
          {connections.map((connection, index) => {
            const fromX = connection.from.position.x
            const fromY = connection.from.position.y
            const toX = connection.to.position.x
            const toY = connection.to.position.y

            return (
              <g key={index}>
                <defs>
                  <linearGradient
                    id={`route-${index}`}
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="0%"
                  >
                    <stop offset="0%" stopColor="rgba(6, 182, 212, 0.8)" />
                    <stop offset="50%" stopColor="rgba(139, 92, 246, 0.6)" />
                    <stop offset="100%" stopColor="rgba(6, 255, 165, 0.4)" />
                  </linearGradient>
                </defs>
                <motion.line
                  x1={`${fromX}%`}
                  y1={`${fromY}%`}
                  x2={`${toX}%`}
                  y2={`${toY}%`}
                  stroke={`url(#route-${index})`}
                  strokeWidth="2"
                  strokeDasharray="5,5"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 0.7 }}
                  transition={{ duration: 2, delay: index * 0.3 }}
                />
                <motion.circle
                  r="2"
                  fill="rgba(6, 255, 165, 0.8)"
                  initial={{
                    cx: `${fromX}%`,
                    cy: `${fromY}%`,
                  }}
                  animate={{
                    cx: `${toX}%`,
                    cy: `${toY}%`,
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: index * 0.5,
                    ease: 'linear',
                  }}
                />
              </g>
            )
          })}
        </svg>

        {mockPlanets.map((planet, index) => (
          <motion.div
            key={planet.id}
            className="group absolute cursor-pointer"
            style={{
              left: `${planet.position.x}%`,
              top: `${planet.position.y}%`,
              transform: 'translate(-50%, -50%)',
            }}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              delay: 0.5 + index * 0.2,
              duration: 0.8,
            }}
            onMouseEnter={() => setHoveredPlanet(planet.id)}
            onMouseLeave={() => setHoveredPlanet(null)}
            onClick={e => handlePlanetClick(planet, e)}
          >
            <div className="absolute inset-0 animate-pulse rounded-full bg-gradient-to-r from-cyan-400 to-purple-400 opacity-50 blur-md" />

            <div
              className="relative h-6 w-6 rounded-full border-2 border-cyan-400 bg-gradient-to-br from-cyan-500 to-purple-500 shadow-lg"
              style={{
                boxShadow:
                  '0 0 20px rgba(6, 182, 212, 0.6), inset 0 0 10px rgba(139, 92, 246, 0.4)',
              }}
            >
              <div className="absolute inset-1 rounded-full bg-gradient-to-br from-transparent via-white/10 to-transparent" />
            </div>

            <div
              className="absolute inset-0 animate-spin rounded-full border border-cyan-400/30"
              style={{
                width: '40px',
                height: '40px',
                left: '-7px',
                top: '-7px',
              }}
            />

            <AnimatePresence>
              {hoveredPlanet === planet.id && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.8 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.8 }}
                  transition={{ duration: 0.2 }}
                  className="absolute bottom-8 left-1/2 z-50 min-w-48 -translate-x-1/2 transform rounded-lg border border-cyan-400/50 bg-black/90 p-3 backdrop-blur-sm"
                  style={{
                    boxShadow: '0 0 20px rgba(6, 182, 212, 0.3)',
                  }}
                >
                  <div className="text-sm">
                    <Title className="mb-1">{planet.name}</Title>
                    <p className="mb-2 text-xs text-gray-300">
                      {planet.system}
                    </p>
                    <div className="mb-2 flex items-center gap-1 text-xs">
                      <Thermometer size={14} className="text-orange-400" />
                      <span>{planet.climate}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      <div className="flex items-center gap-1">
                        <Users size={14} className="text-blue-400" />
                        <span>{planet.reviews}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star size={14} className="text-yellow-400" />
                        <span>{planet.rating}</span>
                      </div>
                    </div>

                    <div className="mt-2 text-xs text-cyan-400">
                      Clic para explorar →
                    </div>
                  </div>

                  <div className="absolute top-full left-1/2 h-0 w-0 -translate-x-1/2 border-t-4 border-r-4 border-l-4 border-transparent border-t-cyan-400/50" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>

      <div className="absolute top-4 right-4 z-30 flex flex-col gap-2">
        <button
          onClick={() =>
            setMapTransform(prev => ({
              ...prev,
              scale: Math.min(3, prev.scale * 1.2),
            }))
          }
          className="h-8 w-8 rounded border border-cyan-400/50 bg-black/50 text-cyan-400 transition-colors hover:bg-cyan-400/10"
        >
          +
        </button>
        <button
          onClick={() =>
            setMapTransform(prev => ({
              ...prev,
              scale: Math.max(0.5, prev.scale / 1.2),
            }))
          }
          className="h-8 w-8 rounded border border-cyan-400/50 bg-black/50 text-cyan-400 transition-colors hover:bg-cyan-400/10"
        >
          −
        </button>
        <button
          onClick={() => setMapTransform({ scale: 1, x: 0, y: 0 })}
          className="h-8 w-8 rounded border border-cyan-400/50 bg-black/50 text-xs text-cyan-400 transition-colors hover:bg-cyan-400/10"
        >
          ⌂
        </button>
      </div>

      <div className="absolute bottom-4 left-4 z-30 rounded-lg border border-cyan-400/50 bg-black/50 p-3 backdrop-blur-sm">
        <div className="mb-2 text-xs text-gray-300">Leyenda:</div>
        <div className="flex flex-col gap-1 text-xs">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-gradient-to-r from-cyan-400 to-purple-400" />
            <span className="text-gray-300">Planetas habitables</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-0.5 w-6 bg-gradient-to-r from-cyan-400 to-purple-400" />
            <span className="text-gray-300">Rutas comerciales</span>
          </div>
        </div>
      </div>
    </div>
  )
}
