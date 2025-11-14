import Usuario from "../models/usuarios.js";

export const crearUsuario = async (req, res) => {
    try {
        const usuarioNuevo = new Usuario(req.body);
        await usuarioNuevo.save();
        res.status(201).json({ message: "Usuario creado exitosamente" });
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: "Error al crear el usuario" });
    }
}