//Declaramos que necesitamos estas librerias
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');
const app = express();

mongoose.connect('mongodb://localhost:27017/platillos');
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to Database'));


app.use(express.json());
//Le dejamos en claro a Node.Js que pueda leer archivos estaticos html desde la ruta '', la deje vacía ya que como ya esta abierta la carpeta Hostess desde
//VSC, y ahí tengo todos mis archivos, ya que los lea de ahí
app.use(express.static(path.join('')));



// // Le mandamos el archivo index.html, ya que es nuestro mainpage y de ahí partimos
// app.get('/', (req, res) => {
//     console.log('____');
//     res.sendFile(path.join(__dirname, 'index.html'));
// });



const platillosRouter = require('./platillos')
app.use('/platillos', platillosRouter)

const PORT = 3000;
app.listen(PORT, '0.0.0.0',() => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});