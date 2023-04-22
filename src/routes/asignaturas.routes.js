import  Router from "express";
import { actualizarAsignatura, eliminarAsignatura, insertarAsignatura, obtenerAsignatura, obtenerAsignaturas } from "../controllers/asignaturas.controller.js";

const router = Router();

router.get('/asignaturas', obtenerAsignaturas);

router.get('/asignaturas/:id', obtenerAsignatura);

router.post('/asignaturas', insertarAsignatura);

router.delete('/asignaturas/:id', eliminarAsignatura);

router.put('/asignaturas/:id', actualizarAsignatura);

export default router;