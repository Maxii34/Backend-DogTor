import jwt from "jsonwebtoken";

const validarToken = (req, res, next) => {
  try {
    const token = req.header("x-token");
    // Si no hay token, devolver un error
    if (!token) {
      return res
        .status(401)
        .json({ message: "No se proporcionó, el token en la petición." });
    }
    const payload = jwt.verify(token, process.env.SECRET);
    //se extrae el usuario del payload y se agrega al objeto req
    req.usuario = payload.usuario;
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: "Token inválido o expirado" });
  }
};
export default validarToken;
