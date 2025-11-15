import generarJWT from "../middlewares/generarJWT.js";
import Usuario from "../models/usuarios.js";
import bcrypt from "bcrypt";

export const crearUsuario = async (req, res) => {
  try {
    // Hashear la contraseña antes de guardarla
    const saltos = bcrypt.genSaltSync(10);
    const passwordHasheada = bcrypt.hashSync(req.body.password, saltos);
    req.body.password = passwordHasheada;
    const usuarioNuevo = new Usuario(req.body);
    await usuarioNuevo.save();
    res.status(201).json({ message: "Usuario creado exitosamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al crear el usuario" });
  }
};

export const listarUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.find();
    res.status(200).json(usuarios);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al listar los usuarios" });
  }
};

export const iniciarSesion = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validación de entrada
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email y contraseña son requeridos" });
    }

    // Buscar el usuario por su email
    const usuarioEncontrado = await Usuario.findOne({ email });

    // Verificar si el usuario existe
    if (!usuarioEncontrado) {
      return res.status(401).json({ message: "Credenciales inválidas" });
    }

    // Comparar la contraseña de forma asíncrona
    const passwordCorrecta = await bcrypt.compare(
      password,
      usuarioEncontrado.password
    );
    // Si no hay contraceña correcta, manda error
    if (!passwordCorrecta) {
      return res.status(401).json({ message: "Credenciales inválidas" });
    }

    // Generar el token JWT
    const token = generarJWT(usuarioEncontrado._id);

    res.status(200).json({
      message: "Inicio de sesión exitoso",
      token,
      usuario: {
        id: usuarioEncontrado._id,
        email: usuarioEncontrado.email,
      },
    });
  } catch (error) {
    console.error("Error en inicio de sesión:", error);
    res.status(500).json({ message: "Error al iniciar sesión" });
  }
};
