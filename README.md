# Rick and Morty Explorer 🧪

Una aplicación web moderna para explorar el universo de Rick and Morty, construida con Next.js 16.1.6, React 19 y Tailwind CSS v4.

## 🚀 Características

- **Exploración de Personajes**: Navega a través de todos los personajes de la serie con una interfaz de cuadrícula responsive.
- **Detalle de Personaje**: Información detallada de cada personaje, incluyendo origen, ubicación y episodios.
- **Paginación**: Navegación fluida entre páginas de resultados.
- **Diseño Responsive**: Optimizado para móviles, tablets y escritorio.
- **Modo Oscuro**: Interfaz oscura por defecto con estética acorde a la serie.
- **Server-Side Rendering (SSR)**: Carga rápida y SEO optimizado gracias a Next.js App Router.

## 🛠️ Tecnologías

- **Framework**: [Next.js 16.1.6](https://nextjs.org/) (App Router)
- **Biblioteca UI**: [React 19](https://react.dev/)
- **Estilos**: [Tailwind CSS v4](https://tailwindcss.com/)
- **API**: [The Rick and Morty API](https://rickandmortyapi.com/)
- **Tipado**: TypeScript

## 📦 Instalación y Ejecución Local

1.  **Clonar el repositorio** (o descargar el código):
    ```bash
    git clone <tu-repositorio>
    cd rick-and-morty-testing-activity
    ```

2.  **Instalar dependencias**:
    ```bash
    npm install
    # o
    pnpm install
    # o
    yarn install
    ```

3.  **Ejecutar el servidor de desarrollo**:
    ```bash
    npm run dev
    # o
    pnpm dev
    # o
    yarn dev
    ```

4.  Abrir [http://localhost:3000](http://localhost:3000) en tu navegador.

## Pruebas automatizadas

La suite de Vitest verifica las tarjetas de personajes, los límites de paginación, las páginas de listado y detalle, la estructura de la aplicación y los estados de carga y error. Las pruebas del cliente HTTP simulan `fetch` para comprobar las URL solicitadas, los errores HTTP y de conexión, y la normalización de cero, uno o varios episodios. Las pruebas de páginas invocan los componentes de servidor con parámetros controlados y comprueban el HTML resultante.

Para reproducir el reporte con el archivo de bloqueo del proyecto, usá Node.js 24 y ejecutá estos comandos desde la carpeta que contiene `package.json`.

```bash
npx pnpm@10.30.0 install --frozen-lockfile
npm run test:coverage
```

El script ejecuta `vitest run --coverage`. La configuración en `vitest.config.ts` mide todos los archivos TypeScript y TSX de `src/` con código ejecutable. Las interfaces de `src/types/` solo existen durante la compilación. Si alguna de las cuatro métricas globales baja del 80 %, el comando termina con error.

| Métrica | Cobertura obtenida | Mínimo exigido |
| --- | ---: | ---: |
| Sentencias (Statements) | 100 % (46/46) | 80 % |
| Ramas (Branches) | 100 % (29/29) | 80 % |
| Funciones (Functions) | 100 % (16/16) | 80 % |
| Líneas (Lines) | 100 % (45/45) | 80 % |

**Resultado de la ejecución:** 30 pruebas aprobadas en 6 archivos. Para explorar la cobertura línea por línea, abrí [el reporte HTML](coverage/index.html) en tu navegador después de descargar el proyecto. [Ver captura de la consola](evidencias/cobertura-consola.png).

## 🚀 Despliegue

La forma más sencilla de desplegar esta aplicación es utilizando [Vercel](https://vercel.com/new).

1.  Sube tu código a un repositorio de GitHub, GitLab o Bitbucket.
2.  Importa el proyecto en Vercel.
3.  Vercel detectará automáticamente que es un proyecto Next.js.
4.  Haz clic en **Deploy**.

## 📂 Estructura del Proyecto

- `src/app`: Rutas de la aplicación (App Router).
  - `page.tsx`: Página principal (lista de personajes).
  - `character/[id]/page.tsx`: Página de detalle de personaje.
  - `loading.tsx` / `error.tsx`: Estados de carga y error.
  - `layout.tsx`: Layout principal con Header y Footer.
- `src/components`: Componentes reutilizables (`CharacterCard`, `Pagination`).
- `src/lib`: Lógica de cliente API (`api.ts`).
- `src/types`: Definiciones de tipos TypeScript (`rickandmorty.ts`).

## ✅ Requisitos Cumplidos

- [x] Consumo de API de Personajes.
- [x] Vista de cuadrícula con imagen, nombre, estado y especie.
- [x] Paginación.
- [x] Vista de detalle con información completa.
- [x] Lista de episodios en la vista de detalle.
- [x] Enrutamiento cliente-servidor (Next.js).
- [x] Diseño Responsive.
- [x] Loading states y manejo de errores.
