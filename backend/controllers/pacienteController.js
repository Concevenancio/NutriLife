import Paciente from "../models/Paciente.js";

const agregarPaciente = async (req, res) =>{
    const paciente = new Paciente(req.body);
    paciente.nutriologo = req.nutriologo._id;
    try { 
        console.log(req.nutriologo._id);  
        const pacienteGuardado = await paciente.save();
        res.json(pacienteGuardado)
    } catch (error) {
        console.log(error);
    }
}

const obtenerPacientes = async (req, res) =>{
    const pacientes = await Paciente.find().where('nutriologo').equals(req.nutriologo);

    res.json(pacientes);
}

const obtenerPaciente = async (req, res) => {
    const { id } = req.params;
    const paciente = await Paciente.findById(id);

    if(!paciente){
        return res.status(404).json({msg:"No encontrado"})
    }

    if(paciente.nutriologo._id.toString() !== req.nutriologo._id.toString()){
        return res.json({msg: "Accion no valida"})
    }
    res.json(paciente)
}

const actualizarPaciente = async (req, res) => {
    const { id } = req.params;
    const paciente = await Paciente.findById(id);

    if(!paciente){
        return res.status(404).json({msg:"No encontrado"})
    }
    if(paciente.nutriologo._id.toString() !== req.nutriologo._id.toString()){
        return res.json({msg: "Accion no valida"})
    }

    //Actualizar Paciente
    paciente.nombre = req.body.nombre || paciente.nombre;
    paciente.telefono = req,body.telefono || paciente.telefono;
    paciente.direccionDeEntrega = req.body.direccionDeEntrega || paciente.direccionDeEntrega;
    paciente.ejercicio = req.body.ejercicio || paciente.ejercicio;
    paciente.padecimiento = req.body.padecimiento || paciente.padecimiento;
    paciente.alergias = req.body.alergias || paciente.alergias;
    paciente.noconsume = req.body.noconsume || paciente.noconsume;
    paciente.fecha = req.body.fecha || paciente.fecha;
    paciente.tipopaquete = req.body.tipopaquete || paciente.tipopaquete;
    paciente.especial = req.body.especial || paciente.especial;
    paciente.mesa = req.body.mesa || paciente.mesa;
    paciente.diasadeber = req.body.diasadeber || paciente.diasadeber;
    
    try {
        const pacienteActualizado = await paciente.save();
        res.json(pacienteActualizado)
    } catch (error) {
        console.log(error);
    }

}

const eliminarPaciente = async (req, res) => {
    const { id } = req.params;
    const paciente = await Paciente.findById(id);

    if(!paciente){
        return res.status(404).json({msg:"No encontrado"})
    }
    if(paciente.nutriologo._id.toString() !== req.nutriologo._id.toString()){
        return res.json({msg: "Accion no valida"})
    }

    try {
        await paciente.deleteOne()
        res.json({msg: "Paciente Eliminado"})
    } catch (error) {
        console.log(error);
    }
}

export {
    agregarPaciente,
    obtenerPacientes,
    obtenerPaciente,
    actualizarPaciente,
    eliminarPaciente,
};