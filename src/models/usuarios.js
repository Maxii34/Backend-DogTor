import mongoose, { Schema } from "mongoose";

const usuarioSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    },
    password: {
      type: String,
      required: true,
      minLength: 8,
      validate: {
        validator: function (v) {
          // Al menos: 1 mayúscula, 1 minúscula, 1 número, 1 carácter especial
          return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#.])[A-Za-z\d@$!%*?&#.]{8,}$/.test(
            v
          );
        },
      },
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
