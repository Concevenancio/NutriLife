/* // citaController.js
import Paciente from '../models/Paciente.js';

const obtenerCitas = async (req, res) => {
  try {
    // Obtener todas las citas de los pacientes
    const citas = await Paciente.find({}, 'ProxCita');

    // Mapear solo las fechas de las citas
    const fechasCitas = citas.map(cita => cita.ProxCita);

    res.status(200).json({ citas: fechasCitas });
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener las citas.' });
  }
};

export { obtenerCitas };
 */

// citaController.js
import Paciente from '../models/Paciente.js';
const obtenerCitas = async (req, res) => {
    const pacientes = await Paciente.find();
    const ProxCitas = pacientes.map(paciente => paciente.ProxCita);
    res.json(ProxCitas);
}



/* const obtenerCitas = async (req, res) => {
  try {
    // Obtener citas futuras
    const citas = await Paciente.find(ProxCita);

    // Mapear solo las fechas de las citas
    const fechasCitas = citas.map(cita => cita.ProxCita);

    res.status(200).json({ citas: fechasCitas });
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener las citas.' });
  }
};

export { obtenerCitas };
 */
export {obtenerCitas}