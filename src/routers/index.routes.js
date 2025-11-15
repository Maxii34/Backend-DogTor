import {  Router } from "express";
import productosRouter from "./productos.routes.js";
import usuarioRouter from "./usuario.routes.js";

const router = Router();

//http://localhost:3000/api/productos
router.use("/productos", productosRouter);
//http://localhost:3000/api/usuarios
router.use("/usuarios", usuarioRouter);

export default router;