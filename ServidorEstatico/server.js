// server.js

import express from 'express'; 

const app = express(); 
const PORT = 3000;

app.use(express.static('public')); 

app.get('/', (req, res) => {

});

// Manejo de errores 
app.use((req, res, next) => {
    res.status(404).send("404 página no encontrada");
});


// Iniciar el servidor 
app.listen(3000, () => {
    console.log(`Servidor corriendo en http://localhost:3000`);
});