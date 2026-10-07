# Trabajo Práctico Integrador N° II

Frontend en React + Vite + Tailwind CSS para el Sistema de Gestión de Blog Personal con Autenticación (TP Integrador N° I).

## Backend utilizado

Repositorio del Trabajo Práctico Integrador N° I:
https://github.com/francovega690-cell/trabajo-practico-integrador-1

## Tecnologías

- React + Vite
- React Router (`react-router`)
- Tailwind CSS (`tailwindcss` + `@tailwindcss/vite`)
- `fetch` con `credentials: 'include'` para enviar la cookie con el JWT

## Cómo levantar el proyecto

### 1. Backend

```bash
git clone https://github.com/francovega690-cell/trabajo-practico-integrador-1.git
cd trabajo-practico-integrador-1
npm install
```

Crear un archivo `.env` en la raíz del backend con estas variables (el frontend espera el backend en el puerto `5501`):

```env
PORT=5501
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=tu_contraseña
DB_NAME=blog_db
JWT_SECRET=una_clave_secreta
```

Levantar el servidor:

```bash
npm run dev
```

El backend tiene configurado CORS para aceptar peticiones con credenciales desde `http://localhost:5173`.

### 2. Frontend

```bash
git clone https://github.com/francovega690-cell/trabajo-practico-integrador-2.git
cd trabajo-practico-integrador-2
npm install
npm run dev
```

Abrir http://localhost:5173 en el navegador.

## Estructura

```
src/
├── components/   → Navbar
├── hooks/        → useFetch y useForm
├── pages/        → HomePage, LoginPage y RegisterPage
├── router/       → AppRouter, PrivateRoutes y PublicRoutes
├── App.jsx
├── index.css
└── main.jsx
```

## Rutas

| Ruta        | Tipo    | Descripción                                   |
|-------------|---------|-----------------------------------------------|
| `/login`    | Pública | Inicio de sesión                              |
| `/register` | Pública | Registro de usuario y perfil                  |
| `/`         | Privada | Listado de artículos publicados               |
| `*`         | —       | Redirige según el estado de sesión            |

La sesión se maneja con `isLogged` en `localStorage`, que se guarda solo ante un login exitoso y se elimina al cerrar sesión.
