# 🚀 Terminal de Viajes Intergalácticos

Una aplicación web moderna para gestionar y explorar viajes espaciales a través de la galaxia. Construida con las últimas tecnologías de desarrollo web.

## 📋 Tabla de Contenidos

- [Descripción](#descripción)
- [Tecnologías](#tecnologías)
- [Requisitos Previos](#requisitos-previos)
- [Instalación](#instalación)
- [Uso](#uso)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Características](#características)

## 🌟 Descripción

Terminal de Viajes Intergalácticos es una plataforma completa de gestión de viajes espaciales que permite a los usuarios:

- 🪐 **Explorar destinos galácticos** con información detallada de planetas
- 🚀 **Reservar viajes espaciales** seleccionando naves y rutas
- 👤 **Gestionar perfiles** y hacer seguimiento de reservas
- 🎫 **Administrar viajes activos, completados y cancelados**
- 🛸 **Panel administrativo** para gestionar planetas, naves y pasajeros

Con una interfaz moderna, animaciones fluidas y un diseño responsivo, ofrece una experiencia inmersiva completa.

## 🛠️ Tecnologías

Este proyecto está construido con las siguientes tecnologías:

### Frontend

- **[React](https://react.dev/)** - Biblioteca de JavaScript para construir interfaces de usuario
- **[TypeScript](https://www.typescriptlang.org/)** - Superset de JavaScript con tipado estático
- **[Vite](https://vite.dev/)** - Herramienta de construcción y desarrollo ultrarrápida
- **[Tailwind CSS](https://tailwindcss.com/)** - Framework CSS para diseño rápido y responsivo
- **[TanStack Router](https://tanstack.com/router)** - Router moderno para aplicaciones React
- **[Zustand](https://zustand-demo.pmnd.rs/)** - Gestión de estado ligera y escalable
- **[Radix UI](https://www.radix-ui.com/)** - Componentes accesibles y sin estilos
- **[Lucide React](https://lucide.dev/)** - Iconos modernos y personalizables
- **[Motion](https://motion.dev/)** - Animaciones fluidas y naturales

### Desarrollo

- **[ESLint](https://eslint.org/)** - Linter para mantener calidad de código
- **[Prettier](https://prettier.io/)** - Formateador de código automático

## 📦 Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:

- **Node.js** (versión 18 o superior)
- **npm** (viene con Node.js)
- Un navegador web moderno

## 🚀 Instalación

1. **Clonar el repositorio:**

```bash
git clone https://github.com/DavidZapataN/Terminal-de-Viajes-Intergalacticos.git
cd Terminal-de-Viajes-Intergalacticos
```

2. **Instalar dependencias:**

```bash
npm install
```

## 💻 Uso

Para ejecutar la aplicación en modo desarrollo:

```bash
npm run dev
```

Luego abre tu navegador en [http://localhost:5173](http://localhost:5173)

## 📁 Estructura del Proyecto

```
terminal-de-viajes-intergalacticos/
├── public/
│   ├── fonts/                    # Fuentes personalizadas
│   └── images/                   # Imágenes y recursos estáticos
│
├── src/
│   ├── app/
│   │   ├── router/              # Configuración de rutas
│   │   │   └── routes/          # Definición de todas las rutas
│   │   │       ├── __root.tsx   # Layout raíz
│   │   │       ├── index.tsx    # Página principal
│   │   │       ├── login.tsx    # Página de inicio de sesión
│   │   │       ├── registro.tsx # Página de registro
│   │   │       ├── _protected/  # Rutas protegidas (requieren autenticación)
│   │   │       │   ├── admin/   # Panel administrativo
│   │   │       │   ├── perfil/  # Perfil de usuario
│   │   │       │   ├── reservas/# Gestión de reservas
│   │   │       │   └── viajes/  # Viajes del usuario
│   │   │       └── destinos/    # Exploración de destinos
│   │   │
│   │   ├── stores/              # Estado global con Zustand
│   │   │   ├── auth-store.ts    # Autenticación
│   │   │   ├── planets-store.ts # Planetas
│   │   │   ├── reservations-store.ts # Reservas
│   │   │   └── ships-store.ts   # Naves espaciales
│   │   │
│   │   └── types/               # Definiciones TypeScript
│   │       ├── User.ts
│   │       ├── Planet.ts
│   │       ├── Starship.ts
│   │       ├── Reservation.ts
│   │       └── ...
│   │
│   ├── features/                # Módulos por funcionalidad
│   │   ├── admin/              # Panel de administración
│   │   │   ├── components/     # Componentes de admin
│   │   │   └── pages/          # Páginas de admin
│   │   │
│   │   ├── auth/               # Autenticación
│   │   │   └── pages/          # Login y registro
│   │   │
│   │   ├── booking/            # Sistema de reservas
│   │   │   ├── components/     # Flujo de reserva
│   │   │   └── pages/
│   │   │
│   │   ├── dashboard/          # Dashboard principal
│   │   │   ├── components/     # Mapa interactivo, estadísticas
│   │   │   └── pages/
│   │   │
│   │   ├── destinies/          # Exploración de destinos
│   │   │   ├── components/     # Info de planetas, reviews
│   │   │   └── pages/
│   │   │
│   │   ├── profile/            # Perfil de usuario
│   │   │   ├── components/
│   │   │   └── pages/
│   │   │
│   │   └── trips/              # Gestión de viajes
│   │       ├── components/
│   │       └── pages/          # Activos, completados, cancelados
│   │
│   ├── shared/                 # Componentes compartidos
│   │   └── components/
│   │       ├── ui/             # Componentes UI de Radix UI
│   │       ├── Button.tsx
│   │       ├── Card.tsx
│   │       ├── Navbar.tsx
│   │       ├── Sidebar.tsx
│   │       ├── GalacticMap.tsx
│   │       └── ...
│   │
│   ├── hooks/                  # Custom hooks
│   ├── lib/                    # Utilidades
│   ├── db/                     # Datos mock
│   ├── assets/                 # Recursos del código
│   └── main.tsx               # Punto de entrada
│
├── eslint.config.js
├── vite.config.ts
├── tsconfig.json
├── tailwind.config.js
└── package.json
```

## ✨ Características

### 🎯 Funcionalidades Principales

- **🌌 Exploración de Destinos**
  - Catálogo completo de planetas con información detallada
  - Sistema de reseñas y calificaciones
  - Actividades disponibles por planeta
  - Galería de imágenes con carrusel

- **🎫 Sistema de Reservas**
  - Proceso de reserva guiado paso a paso
  - Selección de naves espaciales
  - Registro de datos de pasajeros
  - Confirmación y pago de reservas

- **👤 Gestión de Usuarios**
  - Autenticación y registro
  - Perfil personalizable
  - Historial de viajes
  - Favoritos y preferencias

- **🛸 Panel de Administración**
  - Gestión completa de planetas
  - Administración de naves espaciales
  - Control de pasajeros
  - Estadísticas y métricas

- **🚀 Gestión de Viajes**
  - Viajes activos con seguimiento
  - Historial de viajes completados
  - Gestión de cancelaciones

### 🎨 Características Técnicas

- ⚡ **Desarrollo ultrarrápido** con Vite y HMR
- 🎨 **Interfaz moderna** con Tailwind CSS y animaciones fluidas
- 📱 **Diseño responsivo** adaptado a todos los dispositivos
- 🔒 **Tipado fuerte** con TypeScript
- 🧭 **Enrutamiento avanzado** con TanStack Router
- 🗃️ **Gestión de estado eficiente** con Zustand
- 🎭 **Componentes accesibles** con Radix UI
- 🧹 **Código limpio** con ESLint y Prettier

## 🤝 Contribuir

Las contribuciones son bienvenidas. Para contribuir:

1. Haz un Fork del proyecto
2. Crea una rama para tu característica (`git checkout -b feature/NuevaCaracteristica`)
3. Realiza tus cambios y haz commit (`git commit -m 'Agregar nueva característica'`)
4. Sube los cambios a tu rama (`git push origin feature/NuevaCaracteristica`)
5. Abre un Pull Request
