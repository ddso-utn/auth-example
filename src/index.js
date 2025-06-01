const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const app = express();
app.use(express.json());

// Datos en memoria
const users = [
    {
        id: 1,
        username: 'usuario1',
        password: bcrypt.hashSync('password123')
    }
];

const products = [
    { id: 1, name: 'Producto 1', userId: 1 },
    { id: 2, name: 'Producto 2', userId: 1 },
    { id: 3, name: 'Producto 3', userId: 1 }
];

// Middleware para verificar JWT
const verifyToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];
    
    if (!token) {
        return res.status(401).json({ message: 'Token no proporcionado' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'tu_secreto_seguro');
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(401).json({ message: 'Token inválido' });
    }
};

// Endpoint de login
app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    const user = users.find(u => u.username === username);
    if (!user) {
        return res.status(401).json({ message: 'Usuario no encontrado' });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
        return res.status(401).json({ message: 'Contraseña incorrecta' });
    }

    const token = jwt.sign(
        { id: user.id, username: user.username },
        process.env.JWT_SECRET || 'tu_secreto_seguro',
        { expiresIn: '1h' }
    );

    res.json({ token });
});

// Endpoint protegido para obtener productos
app.get('/products', verifyToken, (req, res) => {
    const userProducts = products.filter(p => p.userId === req.user.id);
    res.json(userProducts);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
}); 