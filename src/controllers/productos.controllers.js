import Turnos from "../models/Turnos.js";

export const crearTurno = async (req, res) => {
  try {
    //console.log(req);
    const nuevoTurno = new Turnos(req.body);
    await nuevoTurno.save();
    res.status(201).json({ message: "Turno creado exitosamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al crear el turno" });
  }
};

export const listarTurnos = async (req, res) => {
  try {
    const turnos = await Turnos.find();
    res.status(200).json(turnos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al listar los turnos" });
  }
};

export const borrarTurno = async (req, res) => {
  try {
    console.log(req.params.id);
    const turnoBorrado = await Turnos.findByIdAndDelete(req.params.id);
    if (!turnoBorrado) {
      res.status(404).json({ message: "El turno no fue encontrado" });
    }
    res.status(200).json({ message: "El turno fue borrado exitosamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al borrar el turno" });
  }
};

export const turnoEditado = async (req, res) => {
  try {
    console.log(req.params.id);
    const TurnoAdcualizado = await Turnos.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!TurnoAdcualizado) {
        res.status(404).json({ message: "El turno no fue encontrado" });
    }
    res.status(200).json({ message: "El turno fue editado exitosamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al editar el turno" });
  }
};

export const obtenerTurno = async (req, res) => {
    try {
        console.log(req.params.id);
        const turnoObtenido = await Turnos.findById(req.params.id);
        if (!turnoObtenido) {
            res.status(404).json({ message: "El turno no fue encontrado" });
        }
        res.status(200).json(turnoObtenido);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al obtener el turno" });
    }
}