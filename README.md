# GenHora Frontend

Aplicacion web en react para la generacion de horarios para los estudiantes de ESPOL.

## 📋 Pre-requisitos

- **Node.js** (version 20.x o superior)


### Dependencias Principales

- **Frontend**: React 18 with TypeScript
- **Estilos**: Tailwind CSS y shadcn/ui 
- **Manejador de Estado**: Zustand
- **Forms**: React Hook Form y Zod
- **HTTP Client**: Axios y TanStack Query
- **Routing**: React Router DOM
- **Build Tool**: Vite
- **Testing**: Cypress (E2E)

## 🚀 Instalacion

1. **Clonar repositorio**<br>
Clonar el repositorio y crear un archivo `.env` con las variables definidas en el archivo : `.env.template`

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Ejecutar el proyecto**
   ```bash
   npm run dev
   ```
4. **Visitar:**
   ```http://localhost:5173/ ```

## 👩‍💻 Desarrollo

### Git Hooks

Este proyecto tiene configurado git hooks, para asegurar la calidad del codigo. Actualmente se tienen configurado los siguientes hooks:
1. **Pre-commit:** Antes de realizar un commit se hara verificacion de formato de codigo y linter.
2. **Pre-push:** Antes de realizar push el codigo tiene que pasar los tests.

### Code Style

Este proyecto usa ESLint y Prettier for code formatting:

```bash
# Check linting
npm run lint

# Fix linting issues
npm run lint:fix

# Check formatting
npm run format:check

# Fix formatting
npm run format
```

### Estructura del proyecto

```
src/
├── components/         # Reusable UI components
│   ├── ui/             # shadcn/ui components
│   └── workflows/      # Schedule-specific components
├── lib/                # Utility functions and configurations
├── hooks/              # Custom React hooks
├── pages/              # Page components
├── api/                # API service functions
├── store/             # Zustand store definitions
├── types/              # TypeScript type definitions
└── utils/              # Helper functions
```

### Pull Request Guidelines

- Fill out the PR template completely
- Ensure all checks pass
- Request review from maintainers
- Keep PRs focused and atomic

## 🔧 Troubleshooting

### Errores comunes

**No se puede hacer commit or push**

*Solucion*: Ejecutar el formateador `npm run format` o verificar el linter con `npm run lint`.

