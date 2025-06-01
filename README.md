# Ejemplo de Autenticación JWT con Express

Este proyecto demuestra cómo implementar autenticación JWT en una API REST con Express.

## Instalación

1. Instalar dependencias:
```bash
npm install
```

2. Crear archivo `.env` con las siguientes variables:
```
JWT_SECRET=mi_secreto_super_seguro_para_jwt
PORT=3000
```

## Uso

1. Iniciar el servidor:
```bash
npm run dev
```

2. Endpoints disponibles:

### Login
```bash
POST http://localhost:3000/login
Content-Type: application/json

{
    "username": "usuario1",
    "password": "password123"
}
```

### Obtener Productos (requiere autenticación)
```bash
GET http://localhost:3000/products
Authorization: Bearer <token_recibido_en_login>
```

## Notas
- Los datos se mantienen en memoria
- El usuario de prueba es:
  - Username: usuario1
  - Password: password123 