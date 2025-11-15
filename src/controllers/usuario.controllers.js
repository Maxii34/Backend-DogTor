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
    // Buscar el usuario por su email
    const usuarioEncontrado = await Usuario.findOne({ email });
    // Si no se encuentra el usuario, devolver un error
    if (!usuarioEncontrado) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    // Comparar la contraseña proporcionada con la almacenada
    const passwordCorrecta = bcrypt.compareSync(
      password,
      usuarioEncontrado.password
    );
    // Si la contraseña no es correcta, devolver un error
    if (!passwordCorrecta) {
      return res.status(401).json({ message: "Contraseña incorrecta" });
    }
    //generar el token JWT
    const token = generarJWT(usuarioEncontrado.email)
    res.status(200).json({ message: "Inicio de sesión exitoso", token })
  } catch (error) {
    consol.log(error);
    res.status(500).json({ message: "Error al iniciar sesión" });
  }
};
