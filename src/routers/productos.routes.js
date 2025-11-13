import {  Router } from "express";
import { crearTurno, listarTurnos } from "../controllers/productos.controllers.js";

const router = Router();

//http://localhost:3000/api/productos/
router.route("/").post(crearTurno).get(listarTurnos);

export default router;