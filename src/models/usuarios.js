import mongoose, { Schema } from "mongoose";

const usuarioSchema = new Schema(
  {
    nombre: {                              
      type: String,
      required: true,
      minLength: 3,
      maxLength: 100,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    },
    telefono: {                            
      type: String,
      required: true,
      minLength: 10,
      maxLength: 15,
    },
    password: {
      type: String,
      required: true,
      minLength: 8,
      validate: {
        validator: function (v) {
          return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#.])[A-Za-z\d@$!%*?&#.]{8,}$/.test(v);
        },
      },
    },
    tipo: {                                
      type: String,
      required: true,
      enum: ["usuario", "admin"],          
      default: "usuario",
    },
  },
  {
    timestamps: true,
  }
);

// Método para no devolver la contraseña en las consultas
usuarioSchema.methods.toJSON = function () {
  const usuario = this.toObject();
  delete usuario.password;
  return usuario;
};

const Usuario = mongoose.model("Usuario", usuarioSchema);

export default Usuario;