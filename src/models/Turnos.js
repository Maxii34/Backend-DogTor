import mongoose, { Schema } from "mongoose";

const turnosSchema = new Schema(
  {
    nombreDueno: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 25,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    },
    nombreMascota: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 25,
      trim: true,
    },
    tipoMascota: {
      type: String,
      required: true,
      enum: ["Perro", "Gato", "Aves", "Conejos", "Tortugas", "Otros"],
    },
    tipoServicios: {
      type: String,
      required: true,
      enum: [
        "Consultas",
        "Vacunas",
        "Cirugías",
        "Esterilización",
        "Análisis clínicos",
        "Peluquería",
        "Estética",
      ],
    },
    descripcion: {
      type: String,
      required: true,
      minLength: 10,
      maxLength: 200,
      trim: true,
    },
    horario: {
      type: String,
      required: true,
      enum: [
        "09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "12:00", "12:30", "13:00", // Mañana
        "17:00", "17:30", "18:00", "18:30", "19:00", "19:30", "20:00", "20:30", "21:00", "21:30", "22:00", "22:30" // Tarde
      ],
    },
    fecha: {
      type: Date,
      required: true,
      validate: {
        validator: function(v) {
      // Extraer solo año, mes y día ignorando zona horaria
      const fechaTurnoStr = new Date(v).toISOString().split('T')[0];
      const hoyStr = new Date().toISOString().split('T')[0];
      
      return fechaTurnoStr >= hoyStr;
    },
        message: "La fecha debe ser hoy o en el futuro"
      }
    },
    estado: {
      type: String,
      enum: ["Pendiente", "Confirmado", "Cancelado"],
      default: "Pendiente",
    },
  },
  {
    timestamps: true,
  }
);

// Índice único compuesto: no puede haber dos turnos en la misma fecha y horario
turnosSchema.index({ fecha: 1, horario: 1 }, { unique: true });

const Turno = mongoose.model("Turno", turnosSchema);

export default Turno;