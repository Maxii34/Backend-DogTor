import jwt from "jsonwebtoken";

const generarJWT = (usuario, email) => {
  try {
    const payload = { usuario, email };
    const token = jwt.sign(payload, process.env.SECRET, { expiresIn: "2h" });
    return token;
  } catch (error) {
    console.error(error);
    throw new Error("Error al generar el token JWT");
  }
};

export default generarJWT;
