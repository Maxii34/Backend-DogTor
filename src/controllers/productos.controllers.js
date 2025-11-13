import Turnos from "../models/Turnos.js";

export const crearTurno = async (req, res) => {
  try {
    //console.log(req);
    const nuevoTurno = new Turnos(req.body);
    await nuevoTurno.save();
    res.status(201).json({ message: "Turno creado exitosamente"});
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
}

export const borrarTurno = async (req, res) => {
    try {
        
    } catch (error) {
        
    }
}