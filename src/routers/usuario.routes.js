import { Router } from "express";
import { crearUsuario } from "../controllers/usuario.controllers.js";

const router = Router();

router.route("/").post(crearUsuario);



export default router;