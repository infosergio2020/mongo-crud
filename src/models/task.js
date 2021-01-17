const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const TaskSchema = new Schema({  
    title: String,
    description: String,
    status: {
        type:Boolean,
        default: false
    }
});
//este esquema es solo para que funcione internamente, para utilizarlo lo voy a tener que pasar a un metodo llamado model, toma el esquema y lo usa para guardar datos dentro de una coleccion mongodb

module.exports = mongoose.model('tasks',TaskSchema)//cada conjunto de tareas se van a almacenar en una coleccion llamado tasks