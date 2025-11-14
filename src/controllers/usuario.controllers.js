import Usuario from "../models/usuarios.js";
import bcrypt from "bcryptjs";

export const crearUsuario = async (req, res) => {
    try {
        // Hashear la contraseña antes de guardarla
        const saltos = bcrypt.genSaltSync(10);
        const passwordHasheada = bcrypt.hashSync(req.body.password, saltos);
        req.body.password = passwordHasheada
        const usuarioNuevo = new Usuario(req.body);
        await usuarioNuevo.save();
        res.status(201).json({ message: "Usuario creado exitosamente" });
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: "Error al crear el usuario" });
    }
}

export const listarUsuarios = async (req, res) => {
    try {
        const usuarios = await Usuario.find();
        res.status(200).json(usuarios);
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: "Error al listar los usuarios" });
    }
}