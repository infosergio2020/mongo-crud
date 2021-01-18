const path = require('path');
const express = require('express');
const morgan = require('morgan');
require('dotenv').config()

const mongoose = require('mongoose');


const app = express();

// connecting to db

var mongoDB = process.env.MONGO_URI;
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true});
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error: '));


//importing routes (enrutadores)
const indexRoutes = require('./routes/index');

//settings (configuraciones)
app.set('port', process.env.PORT || 3000); //toma el puerto de OS sino colocalo en el puerto 3000
app.set('views', path.join(__dirname,'views'));//le indica al server que la carpeta views esta en esta direccion (__dirname es la ruta absoluta al proyecto)
app.set('view engine', 'ejs')//configurando motor de plantillas, NOTA: no hacemos require por que express ya lo reconoce

//middlewares --> (son funciones que se ejecutan antes de que lleguen a las rutas --> procesar los datos antes de que lleguen a las rutas) 
app.use(morgan('dev')); //sirve para ver un mensaje corto
app.use(express.urlencoded({extended:false}));

//routes (aca utilizamos las rutas)
app.use('/',indexRoutes);

// starting the server
app.listen(app.get('port'), () => {
    console.log(`server on port ${app.get('port')}`);
});