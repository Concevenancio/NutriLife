import Paciente from "../models/Paciente.js";
import Nutriologo from "../models/Nutriologo.js";

const agregarPaciente = async (req, res) =>{
    const paciente = new Paciente(req.body);
    paciente.nutriologo = req.nutriologo._id;
    try {
        const pacienteAlmacenado = await paciente.save();
        res.json(pacienteAlmacenado);
    } catch (error) {
        console.log(error);
    }
};
const obtenerPacientes = async (req, res) =>{
    const pacientes = await Paciente.find()
    .where('nutriologo')
    .equals(req.nutriologo);

    res.json(pacientes);
};

const obtenerPaciente = async (req, res) =>{
    const { id } = req.params;
    const paciente = await Paciente.findById(id);

    if(!paciente){
        return res.status(404).json({msg: 'No Encontrado'})
    }

    if(paciente.nutriologo._id.toString() !== req.nutriologo._id.toString()){
        return res.json({msg: 'Accion no válida'})
    }

        res.json(paciente);
    
};

const actualizarPaciente = async (req, res) =>{
    const { id } = req.params;
    const paciente = await Paciente.findById(id);

    if(!paciente){
        return resolveSoa.status(404).json({msg: 'No Encontrado'})
    }

    if(paciente.nutriologo._id.toString() !== req.nutriologo._id.toString()){
        return res.json({msg: 'Accion no válida'})
    }

    //Actualizar Paciente
    paciente.nombre = req.body.nombre || paciente.nombre;
    paciente.peso = req.body.peso || paciente.peso;
    paciente.estatura = req.body.estatura || paciente.estatura;
    paciente.telefono = req.body.telefono || paciente.telefono;
    paciente.anos = req.body.anos || paciente.anos;
    paciente.ejercicio = req.body.ejercicio || paciente.ejercicio;
    paciente.alergias = req.body.alergias || paciente.alergias;
    paciente.padecimiento = req.body.padecimiento || paciente.padecimiento;
    paciente.alimentosNoConsume = req.body.alimentosNoConsume || paciente.alimentosNoConsume;
    paciente.direccion = req.body.direccion || paciente.direccion;
    paciente.cuandoEmpieza = req.body.cuandoEmpieza || paciente.cuandoEmpieza;
    paciente.proximaCita = req.body.proximaCita || paciente.proximaCita;
    paciente.tipoPaquete = req.body.tipoPaquete || paciente.tipoPaquete;
    paciente.formaPago = req.body.formaPago || paciente.formaPago;
    paciente.especial = req.body.especial || paciente.especial;
    paciente.mesa = req.body.mesa || paciente.mesa;
    paciente.adeudos = req.body.adeudos || paciente.adeudos;



    try {
        const pacienteActualizado = await paciente.save();
        res.json(pacienteActualizado);
    } catch (error) {
        console.log(error);
    }

};

const eliminarPaciente = async (req, res) =>{
    const { id } = req.params;
    const paciente = await Paciente.findById(id);

    if(!paciente){
        return resolveSoa.status(404).json({msg: 'No Encontrado'})
    }

    if(paciente.nutriologo._id.toString() !== req.nutriologo._id.toString()){
        return res.json({msg: 'Accion no válida'})
    }

    try {
        await paciente.deleteOne();
        res.json({msg: 'Paciente Eliminado  '})
    } catch (error) {
        console.log(error);
    }
};


export{
    agregarPaciente,
    obtenerPacientes,
    obtenerPaciente,
    actualizarPaciente,
    eliminarPaciente
}