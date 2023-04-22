import Router from "express";
import {
    actualizarEstudiante, actualizarHistorial, actualizarNotaAsignatura,
    eliminarEstudiante, eliminarHistorial, eliminarMatricula, eliminarMatriculaAsignatura,
    insertarEstudiante, insertarHistorial, insertarMatriculaAsignatura,
    obtenerEstudiante, obtenerEstudiantes, obtenerHistorial, obtenerMatricula
} from "../controllers/estudiantes.controller.js";

const router = Router();

//RUTAS DE ESTUDIANTES
router.get('/estudiantes', obtenerEstudiantes);

router.get('/estudiantes/:id', obtenerEstudiante);

router.post('/estudiantes', insertarEstudiante);

router.delete('/estudiantes/:id', eliminarEstudiante);

router.put('/estudiantes/:id', actualizarEstudiante);

//RUTAS DE ESTUDIANTES Y LA MATRICULA VIGENTE
router.get('/estudiantes/:id/matricula', obtenerMatricula);

router.post('/estudiantes/:id/matricula/:idAsignatura', insertarMatriculaAsignatura);

router.delete('/estudiantes/:id/matricula/', eliminarMatricula);

router.delete('/estudiantes/:id/matricula/:idAsignatura', eliminarMatriculaAsignatura);

router.put('/estudiantes/:id/matricula/:idAsignatura', actualizarNotaAsignatura);

// RUTAS DE ESTUDIANTES Y SU HISTORIAL  
router.get('/estudiantes/:id/historial', obtenerHistorial);

router.post('/estudiantes/:id/historial', insertarHistorial);

router.delete('/estudiantes/:id/historial/:corte', eliminarHistorial);

router.put('/estudiantes/:id/historial/:corte/:idAsignatura', actualizarHistorial);

export default router;