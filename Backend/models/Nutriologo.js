import mongoose from "mongoose";
import bcrypt from "bcrypt";
import Token from "../helpers/Token.js";

const nutriologoSchema = mongoose.Schema({
    nombre:{
        type: String,
        required: true,
        trim: true
    },
    password:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    telefono:{
        type: String,
        default: null,
        trim: true
    },
    web:{
        type: String,
        default: null,
    },
    token:{
        type: String,
        default:Token(),
    },
    confirmado:{
        type: Boolean,
        default: false,
    },
});

/*----------INCCRIPTAR CONTRASEÑA------------ */
nutriologoSchema.pre('save', async function(next){
    if(!this.isModified('password')){
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

nutriologoSchema.methods.comprobarPassword = async function (passwordFormulario){
    return await bcrypt.compare(passwordFormulario, this.password);
};

const Nutriologo = mongoose.model("Nutriologo", nutriologoSchema);

export default Nutriologo;