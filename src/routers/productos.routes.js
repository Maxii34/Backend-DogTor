import {  Router } from "express";
import { crearTurno, listarTurnos, borrarTurno, turnoEditado, obtenerTurno } from "../controllers/productos.controllers.js";

const router = Router();

//http://localhost:3000/api/productos/
router.route("/").post(crearTurno).get(listarTurnos);
router.route("/:id").delete(borrarTurno).put(turnoEditado).get(obtenerTurno);

export default router;