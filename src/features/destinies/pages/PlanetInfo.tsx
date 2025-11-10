export const PlanetInfo = () => {
  return (
    <article className="relative">
      {/* Fondo estrellado */}
      <div className="fixed inset-0 h-full w-full">
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
          className="animate-twinkling absolute inset-0 z-[1] h-full w-full"
          style={{
            backgroundImage: "url('/images/estrellas-parpadeantes.png')",
            backgroundRepeat: 'repeat',
            backgroundPosition: 'top center',
          }}
        />
      </div>

      {/* Contenido */}
      <div className="mx-auto max-w-6xl text-white">
        <div className="relative z-10">
          <img
            className="relative z-10 max-w-full"
            src="/images/tests/planet.png"
            alt="Planeta X"
          />
          <div className="absolute top-0 h-full w-full scale-108 bg-[url('/images/tests/planet.png')] bg-cover opacity-50 blur-xl"></div>
        </div>
        <div className="relative">
          <h2 className="text-2xl font-bold">Descripción</h2>
          <p className="mt-4">
            Este es un viaje intergaláctico a {8}. Prepárate para explorar
            nuevos mundos y vivir aventuras inolvidables.
          </p>
        </div>
      </div>
      <div></div>
    </article>
  )
}
