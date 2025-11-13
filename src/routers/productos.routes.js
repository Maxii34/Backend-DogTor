import { Router } from "express";
import {
  crearTurno,
  listarTurnos,
  borrarTurno,
  turnoEditado,
  obtenerTurno,
} from "../controllers/productos.controllers.js";
import validacionIDTurnos from "../middlewares/validacionIDTurnos.js";
import validarTurnos from "../middlewares/ValidacionTurnos.js";

const router = Router();

//http://localhost:3000/api/productos/
router.route("/").post(validarTurnos, crearTurno).get(listarTurnos);
router
  .route("/:id")
  .delete(validacionIDTurnos, borrarTurno)
  .put([validacionIDTurnos, validarTurnos], turnoEditado)
  .get(validacionIDTurnos, obtenerTurno);

export default router;
