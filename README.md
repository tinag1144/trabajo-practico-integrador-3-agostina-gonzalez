# 📝 Trabajo Integrador III – Taller de Lenguajes de Programación II

Este proyecto corresponde al **Trabajo Integrador III**, donde se desarrolla una aplicación completa utilizando **Node.js**, **Express**, **Sequelize**, **MySQL** y un frontend en **React**.

La app implementa autenticación con **JWT + Cookies**, validaciones, rutas protegidas, manejo de tareas y persistencia total en una base de datos SQL.

---

## 📌 Descripción breve

El proyecto incluye:

- Registro de usuarios  
- Inicio y cierre de sesión  
- Validaciones con `express-validator`  
- Rutas públicas y privadas en React (PublicRoute y PrivateRoute)  
- Gestión de tareas del usuario:
  - Crear  
  - Editar  
  - Marcar completada / pendiente  
  - Eliminar  
  - Listar  
- Modelos y relaciones con Sequelize  
- Base de datos MySQL completamente funcional  
- API REST con manejo de errores y middlewares  

---

## ⚙️ Instalación del proyecto

### 🔧 1. Clonar el repositorio
git clone <URL_DEL_REPOSITORIO>

---

### 📦 2. Instalar dependencias del backend
cd servidor
npm install

---

### 🗄 3. Crear la base de datos MySQL
Crear una base vacía, por ejemplo:

CREATE DATABASE tareas_db;

---

### 🌱 4. Ejecutar el script de seed
Esto recrea las tablas y carga roles + usuarios + tareas de ejemplo.

node scripts/db-seed.js

---

### ▶️ 5. Levantar el backend
npm run dev

Backend disponible en:
http://localhost:3000

---

### 💻 6. Instalar dependencias del frontend
cd frontend
npm install

---

### ▶️ 7. Levantar el frontend
npm run dev

Frontend disponible en:
http://localhost:5173

---

## 🔑 Configuración del archivo `.env`

En la carpeta **servidor**, crear el archivo:

servidor/.env

Con este contenido:

PORT=3000

DB_NAME=tareas_db
DB_USER=root
DB_PASSWORD=tu_password
DB_HOST=localhost
DB_DIALECT=mysql

JWT_SECRET=clave_super_secreta

FRONTEND_URL=http://localhost:5173

---

## ✔ Listo
Ahora el proyecto está completamente funcional:
- Login / Registro ✔  
- Sesiones con cookies ✔  
- Rutas protegidas ✔  
- CRUD de tareas ✔  
- Base de datos integrada ✔  
