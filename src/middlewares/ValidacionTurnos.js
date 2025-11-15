import { body } from "express-validator";
import resultadoValidacion from "./resultadoValidacion.js";
import Turnos from "../models/Turnos.js";

const validarTurnos = [
  body("nombreDueno")
    .trim() 
    .notEmpty()
    .withMessage("El nombre del dueño es obligatorio")
    .isLength({ min: 3, max: 25 })
    .withMessage("El nombre del dueño debe tener entre 3 y 25 caracteres"),

  body("email")
    .trim() 
    .toLowerCase() 
    .notEmpty()
    .withMessage("El email es obligatorio")
    .isEmail()
    .withMessage("El email debe ser válido"),

  body("nombreMascota")
    .trim() 
    .notEmpty()
    .withMessage("El nombre de la mascota es obligatorio")
    .isLength({ min: 3, max: 25 })
    .withMessage("El nombre de la mascota debe tener entre 3 y 25 caracteres"),

  body("tipoMascota")
    .notEmpty()
    .withMessage("El tipo de mascota es obligatorio")
    .isIn(["Perro", "Gato", "Aves", "Conejos", "Tortugas", "Otros"]) 
    .withMessage("El tipo de mascota no es válido"),

  body("tipoServicios")
    .notEmpty()
    .withMessage("El tipo de servicio es obligatorio")
    .isIn([
      "Consultas",
      "Vacunas",
      "Cirugías",
      "Esterilización",
      "Análisis clínicos",
      "Peluquería",
      "Estética",
    ])
    .withMessage("El tipo de servicio no es válido"),

  body("descripcion")
    .trim()
    .notEmpty()
    .withMessage("La descripción es obligatoria")
    .isLength({ min: 10, max: 200 })
    .withMessage("La descripción debe tener entre 10 y 200 caracteres"),

  body("horario")
    .notEmpty()
    .withMessage("El horario es obligatorio")
    .isIn([
      "09:00",
      "09:30",
      "10:00",
      "10:30",
      "11:00",
      "11:30",
      "12:00",
      "12:30",
      "17:00",
      "17:30",
      "18:00",
      "18:30",
      "19:00",
      "19:30",
      "20:00",
      "20:30",
      "21:00",
      "21:30",
      "22:00",
    ])
    .withMessage("El horario no es válido"),

  body("fecha")
    .notEmpty()
    .withMessage("La fecha es obligatoria")
    .isISO8601()
    .toDate()
    .withMessage("La fecha debe ser válida (formato YYYY-MM-DD)")
    .custom((value) => {
    // Convertir ambas fechas a strings YYYY-MM-DD para comparar sin zona horaria
    const fechaSeleccionada = new Date(value).toISOString().split('T')[0];
    const hoy = new Date().toISOString().split('T')[0];

    if (fechaSeleccionada < hoy) {
      throw new Error("La fecha debe ser hoy o en el futuro");
    }
    return true;
  })
  .custom(async (value, { req }) => {
    // Validar que no exista ya un turno en esa fecha y horario
    const turnoExistente = await Turnos.findOne({
      fecha: value,
      horario: req.body.horario
    });
    
    if (turnoExistente) {
      throw new Error("Ya existe un turno para esa fecha y horario");
    }
    return true;
  }),

  (req, res, next)=>resultadoValidacion(req, res, next),
];

export default validarTurnos;
