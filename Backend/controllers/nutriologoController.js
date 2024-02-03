import Nutriologo from "../models/Nutriologo.js";
import generarJWT from "../helpers/generarJWT.js";

/*----------REGISTRAR NUEVO DOC O NUTRIOLOGO------------ */
const registrar = async (req,res) =>{
    console.log(req.body);
    const { email } = req.body;

    //Previnir usuarios DUPLICADOS
    const existeUsuario = await Nutriologo.findOne({ email });

    if(existeUsuario){
        const error = new Error("Usuario ya registrado");
        return res.status(400).json({msg: error.message});
    }

    try {
        const nutriologo = new Nutriologo(req.body);
        const nutriologoGuardado = await nutriologo.save();

        res.json(nutriologoGuardado);
    } catch (error) {
        console.log(error)
    }

    
};

/*----------PERFIL------------ */
const perfil = (req,res) =>{
    res.json({msg: "Mostrando perfil"});
};

/*----------CONFIRMAR CUENTA------------ */
const confirmar = async (req, res) =>{
    const { token } = req.params;

    const usuarioConfirmar = await Nutriologo.findOne({token});

    if(!usuarioConfirmar){
        const error = new Error('Token no valido');
        return res.status(404).json({msg: error.message});
    }

    try {
        usuarioConfirmar.token = null;
        usuarioConfirmar.confirmado = true
        await usuarioConfirmar.save()


        res.json({msg: "Usuarrio Confirmado Corectamente"});
    } catch (error) {
        console.log(error);
    }

    
};

/*----------LOGIN------------ */
const autenticar = async (req, res) =>{
    const { email, password } = req.body
    
    //Comprobar si el usuario existe
    const usuario = await Nutriologo.findOne({ email });

    if(!usuario){
        const error = new Error("El Usuario no existe");
        return res.status(404).json({msg: error.message});
    }

    //Comprobar si el usuario esta confirmado
    if(!usuario.confirmado){
        const error = new Error('Tu cuenta no esta confirmada');
        return res.status(403).json({msg: error.message});
    }
    //Revisar password
    if(await usuario.comprobarPassword(password)){

     //Autenticar 
     res.json({token: generarJWT(usuario.id) });   
    }else{
        const error = new Error("El Password es incorecto");
        return res.status(403).json({msg: error.message});
    }


};




export{
    registrar,
    perfil,
    confirmar,
    autenticar
}