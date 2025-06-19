# Products CRUD API

API REST desarrollada con NestJS para la gestión de productos, utilizando Prisma ORM y PostgreSQL como base de datos.

## 🚀 Características

- **Framework**: NestJS
- **Base de datos**: PostgreSQL
- **ORM**: Prisma
- **Operaciones CRUD** completas para productos
- **Validación** de datos

## 📋 Prerrequisitos

Antes de comenzar, asegúrate de tener instalado:

- [Node.js](https://nodejs.org/) (versión 16 o superior)
- [npm](https://www.npmjs.com/)
- [PostgreSQL](https://www.postgresql.org/)

## 🛠️ Instalación

### 1. Revisar pull request


### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar variables de entorno

Renombra el archivo `.env.template` a `.env`:

```bash
cp .env.template .env
```

Configura las siguientes variables de entorno en el archivo `.env`:

```env
NODE_ENV=dev
PORT=3000
DATABASE_URL=postgresql://postgres:password@localhost:5432/db?schema=public
```

> **Nota**: Asegúrate de actualizar la `DATABASE_URL` con tus credenciales de PostgreSQL.

### 4. Configurar la base de datos

```bash
# Generar el cliente de Prisma
npx prisma generate

# Ejecutar las migraciones
npx prisma migrate dev
```

## 🚀 Uso

### Desarrollo

Para ejecutar la aplicación en modo desarrollo:

```bash
npm run start:dev
```

La API estará disponible en `http://localhost:3000`

### Producción

```bash
# Construir la aplicación
npm run build

# Ejecutar en producción
npm run start:prod
```

## 🌱 Seed de datos

Para poblar la base de datos con productos de ejemplo, realiza una petición POST al endpoint de seed:

```bash
curl -X POST http://localhost:3000/api/v1/seed
```

Este endpoint agregará productos de muestra a tu base de datos para que puedas probar la API inmediatamente.

## 🧪 Testing

```bash
Para ejecutar las pruebas:
npm run test

# Ejecutar pruebas en modo watch
npm run test:watch

# Ejecutar pruebas de cobertura
npm run test:cov

# Ejecutar pruebas e2e
npm run test:e2e
```

## 📚 API Endpoints

### Productos

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/v1/products` | Obtener todos los productos |
| GET | `/api/v1/products/:id` | Obtener un producto por ID |
| POST | `/api/v1/products` | Crear un nuevo producto |
| PATCH | `/api/v1/products/:id` | Actualizar un producto |
| DELETE | `/api/v1/products/:id` | Eliminar un producto |

### Utilidades

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| POST | `/api/v1/seed` | Poblar la base de datos con productos de ejemplo |

### Ejemplo de uso

#### Poblar la base de datos con datos de ejemplo

```bash
curl -X POST http://localhost:3000/api/v1/seed
```

#### Crear un producto

```bash
curl -X POST http://localhost:3000/api/v1/products \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "Producto de ejemplo",
    "precio": 29.99,
    "stock": 100
  }'
```

#### Obtener todos los productos

```bash
curl http://localhost:3000/api/v1/products
```

## 🗂️ Estructura del proyecto

```
src/
├── products/           # Módulo de productos
│   ├── dto/           # Data Transfer Objects
│   ├── products.controller.ts
│   ├── products.service.ts
│   └── products.module.ts
├── prisma/            # Configuración de Prisma
│   ├── schema.prisma  # Esquema de la base de datos
│   └── migrations/    # Migraciones
├── app.module.ts      # Módulo principal
└── main.ts           # Punto de entrada
```

## 🛠️ Scripts disponibles

| Script | Descripción |
|--------|-------------|
| `npm run start` | Ejecutar en modo producción |
| `npm run start:dev` | Ejecutar en modo desarrollo |
| `npm run start:debug` | Ejecutar en modo debug |
| `npm run build` | Construir la aplicación |
| `npm run test` | Ejecutar pruebas unitarias |
| `npm run test:watch` | Ejecutar pruebas en modo watch |
| `npm run test:cov` | Ejecutar pruebas con cobertura |
| `npm run test:e2e` | Ejecutar pruebas end-to-end |

## 🔧 Tecnologías utilizadas

- **[NestJS](https://nestjs.com/)** - Framework de Node.js
- **[Prisma](https://www.prisma.io/)** - ORM de próxima generación
- **[PostgreSQL](https://www.postgresql.org/)** - Base de datos relacional
- **[TypeScript](https://www.typescriptlang.org/)** - Superset de JavaScript
- **[Jest](https://jestjs.io/)** - Framework de testing

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📝 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 👥 Autor

- Tu nombre - [@redmoart](https://github.com/redmoart23)

## 🐛 Reportar problemas

Si encuentras algún problema, por favor abre un [issue](https://github.com/tu_usuario/tu_repositorio/issues) en GitHub.