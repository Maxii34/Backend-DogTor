import {  Router } from "express";
import { prueba } from "../controllers/productos.controllers.js";

const router = Router();

//http://localhost:3000/api/productos/
router.route("/").get(prueba);

export default router;