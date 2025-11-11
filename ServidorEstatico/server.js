// server.js (o index.js)

import express from 'express'; // [cite: 92]

const app = express(); // [cite: 93, 94]
const PORT = 3000;

// **Middleware para servir archivos estáticos**
// Esto le dice a Express que sirva todos los archivos dentro de la carpeta 'public'. [cite: 91, 95]
app.use(express.static('public')); 

// Opcional: Define una ruta para la página de inicio (root /).
// Esto servirá automáticamente 'public/index.html' debido a express.static, 
// pero puedes ser explícito si es necesario.
app.get('/', (req, res) => {
    // Si tienes un archivo llamado index.html dentro de 'public', 
    // Express lo servirá automáticamente sin necesidad de esta línea.
    // Si quisieras ser explícito, lo harías con res.sendFile (requiere 'path').
    // Por ahora, lo dejamos vacío ya que express.static maneja el índice.
    // [cite: 96, 97]
});


// **Middleware para ruta no encontrada (404)**
// Este middleware DEBE ir al final de todas tus rutas. [cite: 330, 331]
app.use((req, res, next) => {
    res.status(404).send("404 página no encontrada"); // [cite: 334]
});


// Iniciar el servidor 
app.listen(5000, () => {
    console.log(`Servidor corriendo en http://localhost:5000`); // 
});