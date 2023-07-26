import {Schema, models, model} from "mongoose";

const userSchema = new Schema({
    nombre: String,
    cedula: Number,
    email: String,
    telefono: Number,
    marca: String,
    placa: String,
    fecha: String,
    tipo: String,
})

const Users = models.user || model('user',userSchema)
export default Users;