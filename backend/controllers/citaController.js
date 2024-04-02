/* 
import Paciente from '../models/Paciente.js';

const obtenerCitas = async (req, res) => {
    const pacientes = await Paciente.find();
    const fechaproxcita = pacientes.map(paciente => paciente.fechaproxcita);

    // Organizar las fechas en un objeto donde las claves son las fechas y los valores son arrays de citas para esa fecha
    const calendario = fechaproxcita.reduce((calendario, cita) => {
        const fecha = cita.toISOString().split('T')[0]; // Convertir la fecha a formato YYYY-MM-DD
        if (!calendario[fecha]) {
            calendario[fecha] = [];
        }
        calendario[fecha].push(cita);
        return calendario;
    }, {});

    res.json(calendario);
}

export {obtenerCitas} */
/* import Paciente from '../models/Paciente.js';

const obtenerCitas = async (req, res) => {
    try {
        const pacientes = await Paciente.find({}, 'nombre fechaproxcita'); // Obtener solo el nombre y la fecha de la próxima cita de cada paciente
        const citas = pacientes.map(paciente => ({
            nombre: paciente.nombre,
            fecha: paciente.fechaproxcita.toISOString().split('T')[0] // Convertir la fecha a formato YYYY-MM-DD
        }));
        
        res.json(citas);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al obtener citas" });
    }
}

export { obtenerCitas } */
import Paciente from '../models/Paciente.js';

const obtenerCitas = async (req, res) => {
    try {
        const pacientes = await Paciente.find({}, 'nombre fechaproxcita'); // Obtener solo el nombre y la fecha de la próxima cita de cada paciente
        
        // Organizar las citas por fecha
        const citasPorFecha = {};
        pacientes.forEach(paciente => {
            const fechaCita = paciente.fechaproxcita.toISOString().split('T')[0]; // Convertir la fecha a formato YYYY-MM-DD
            if (!citasPorFecha[fechaCita]) {
                citasPorFecha[fechaCita] = [];
            }
            citasPorFecha[fechaCita].push(paciente.nombre);
        });
        
        res.json(citasPorFecha);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al obtener citas" });
    }
}

export { obtenerCitas }

