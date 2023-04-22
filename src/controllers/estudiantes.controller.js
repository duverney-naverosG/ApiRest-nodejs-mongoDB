import estudiantes from '../models/estudiantes.model.js'
import asignaturas from "../models/asignaturas.model.js";

const obtenerEstudiantes = async (req, res) => {
    try {
        const estudiante = await estudiantes.find();
        res.status(200).json(estudiante);
    } catch (error) {
        res.status(500).json({ "mensaje": error });
    }
};

const obtenerEstudiante = async (req, res) => {
    try {
        const estudiante = await estudiantes.find({
            $or: [{ "identificacion": req.params.id }, { "codigo": req.params.id }]
        });
        if (estudiante.length <= 0) {
            return res.status(500).json({ "mensaje": "el estudiante no esta registrado" });
        }
        res.status(200).json(estudiante);
    } catch (error) {
        res.status(500).json({ "mensaje": error });
    }
};

const insertarEstudiante = async (req, res) => {
    const { identificacion, nombre, carrera, codigo, telefono, correo } = req.body
    if (identificacion == null || nombre == null | carrera == null || codigo == null || telefono == null || correo == null) {
        return res.status(400).json({ "mensaje": "llenar todo los datos" });
    }

    try {
        const estudiante = await estudiantes({
            identificacion,
            nombre,
            carrera,
            codigo,
            telefono,
            correo
        })
        await estudiante.save();
        res.status(200).json({ "mensaje": "estudiante insertado" });
    } catch (err) {
        res.status(500).json({ "mensaje": err });
    }
};

const actualizarEstudiante = async (req, res) => {
    const { identificacion, nombre, carrera, codigo, telefono, correo } = req.body
    if (identificacion == null || nombre == null | carrera == null || codigo == null || telefono == null || correo == null) {
        return res.status(400).json({ "mensaje": "llenar todo los datos" });
    }

    try {
        const estudiante = await estudiantes.findOne({
            codigo: req.params.id
        })
        if (!estudiante) {
            return res.status(200).json({ "mensaje": "estudiante no registrado" });
        }
        await estudiantes.findByIdAndUpdate(estudiante._id, {
            identificacion,
            nombre,
            carrera,
            codigo,
            telefono,
            correo
        })
        res.status(200).json({ "mensaje": "estudiante actualizado" });
    } catch (err) {
        res.status(500).json({ "mensaje": err });
    }
};

const eliminarEstudiante = async (req, res) => {
    try {
        const estudiante = await estudiantes.findOne({
            codigo: req.params.id
        })
        if (!estudiante) {
            return res.status(200).json({ "mensaje": "estudiante no registrado" });
        }
        await estudiantes.findByIdAndDelete(estudiante._id, req.body);
        res.status(200).json({ "mensaje": "estudiante eliminado" });
    } catch (error) {
        res.status(500).json({ "mensaje": error });
    }
};

const obtenerMatricula = async (req, res) => {
    try {
        const estudiante = await estudiantes.findOne({
            codigo: req.params.id
        });
        if (!estudiante) {
            return res.status(500).json({ "mensaje": "el estudiante no esta registrado" });
        }
        res.status(200).json(estudiante.matricula);
    } catch (error) {
        res.status(500).json({ "mensaje": error });
    }
};

const insertarMatriculaAsignatura = async (req, res) => {
    try {
        const asignatura = await asignaturas.findById(req.params.idAsignatura);
        if (!asignatura) {
            return res.status(500).json({ "mensaje": "asignatura no encontrada" });
        }
        const estudiante = await estudiantes.findOne({
            "codigo": req.params.id
        });
        if (!estudiante) {
            return res.status(500).json({ "mensaje": "el estudiante no esta registrado" });
        }
        estudiante.matricula.push(asignatura);
        await estudiante.save()
        res.send("asignatura agregada")
    } catch (error) {
        res.status(500).json({ "mensaje": error });
    }
};

const eliminarMatricula = async (req, res) => {
    try {
        const estudiante = await estudiantes.findOne({
            "codigo": req.params.id
        });
        if (!estudiante) {
            return res.status(500).json({ "mensaje": "el estudiante no esta registrado" });
        }
        estudiante.matricula = [];
        await estudiante.save()
        res.send("matricula eliminada")
    } catch (error) {
        res.status(500).json({ "mensaje": error });
    }
};

const eliminarMatriculaAsignatura = async (req, res) => {
    try {
        const estudiante = await estudiantes.findOne({
            "codigo": req.params.id
        });
        if (!estudiante) {
            return res.status(500).json({ "mensaje": "el estudiante no esta registrado" });
        }
        if (estudiante.matricula.length <= 0) {
            return res.status(500).json({ "mensaje": "el estudiante no presenta matricula" });
        }

        const asignaturaMatricula = estudiante.matricula.filter((asignatura) => {
            if (asignatura._id != req.params.idAsignatura) {
                return asignatura;
            }
        })

        estudiante.matricula = asignaturaMatricula;
        await estudiante.save()
        res.json("asignatura eliminadada");
    } catch (error) {
        res.status(500).json({ "mensaje": error });
    }
}

const actualizarNotaAsignatura = async (req, res) => {
    try {
        const estudiante = await estudiantes.findOne({
            "codigo": req.params.id
        });
        if (!estudiante) {
            return res.status(500).json({ "mensaje": "el estudiante no esta registrado" });
        }
        if (estudiante.matricula.length <= 0) {
            return res.status(500).json({ "mensaje": "el estudiante no presenta matricula" });
        }

        const asignaturaMatricula = estudiante.matricula.map((asignatura) => {
            if (req.body.nota == null) {
                return res.status(500).json({ "mensaje": "llenar el campo de nota" });
            }
            if (asignatura._id != req.params.idAsignatura) {
                return asignatura;
            } else {
                const asignaturaModif = {
                    "_id": asignatura._id,
                    "nombre_asignatura": asignatura.nombre_asignatura,
                    "nombre_profesor": asignatura.nombre_profesor,
                    "semestre": asignatura.semestre,
                    "horario": asignatura.horario,
                    "salon": asignatura.salon,
                    "nota": req.body.nota
                }
                return asignaturaModif;
            };
        });

        estudiante.matricula = asignaturaMatricula;
        await estudiante.save();
        res.status(200).json({ "mensaje": "estudiante actualizado" });
    } catch (error) {
        res.status(500).json({ "mensaje": error });
    }
}

const obtenerHistorial = async (req, res) => {
    try {
        const estudiante = await estudiantes.findOne({
            codigo: req.params.id
        });
        if (!estudiante) {
            return res.status(500).json({ "mensaje": "el estudiante no esta registrado" });
        }
        res.status(200).json(estudiante.historial);
    } catch (error) {
        res.status(500).json({ "mensaje": error });
    }
};

const insertarHistorial = async (req, res) => {
    const { corte } = req.body;
    let bandera = false;
    let promedio = 0;

    try {
        const estudiante = await estudiantes.findOne({
            "codigo": req.params.id
        });

        if (!estudiante) {
            return res.status(500).json({ "mensaje": "el estudiante no esta registrado" });
        }

        if (estudiante.matricula.length <= 0) {
            return res.status(500).json({ "mensaje": "el estudiante no presenta matricula" });
        }

        estudiante.historial.map((semestre) => {
            if (semestre.corte === corte) {
                bandera = true;
            }
        })

        if (bandera) {
            return res.status(500).json({ "mensaje": "ya existe un historial para la corte seleccionada, asegure de eliminar o actualizarla" });
        }

        estudiante.matricula.map((asignatura) => {
            promedio += asignatura.nota || 0;
        })

        promedio = (promedio / estudiante.matricula.length);

        estudiante.historial.push({
            "corte": corte,
            "asignaturas": estudiante.matricula,
            "promedio": promedio
        });

        await estudiante.save()
        res.send("historial agregado")
    } catch (error) {
        res.status(500).json({ "mensaje": error });
    }
};

const actualizarHistorial = async (req, res) => {
    if (req.body.nota == null || req.params.corte == null || req.params.idAsignatura == null) {
        return res.status(500).json({ "mensaje": "llenar el campo de nota" });
    };

    try {
        const estudiante = await estudiantes.findOne({
            "codigo": req.params.id
        });

        if (!estudiante) {
            return res.status(500).json({ "mensaje": "el estudiante no esta registrado" });
        };

        if (estudiante.historial.length <= 0) {
            return res.status(500).json({ "mensaje": "el estudiante no presenta historial" });
        };

        const asignaturaHistorial = estudiante.historial.map((historial) => {
            if (historial.corte !== req.params.corte) {
                return historial;
            } else {
                let promedio = 0;
                const historialModif = historial.asignaturas.map((asignatura) => {
                    if (asignatura._id != req.params.idAsignatura) {
                        promedio += asignatura.nota || 0;
                        return asignatura;

                    } else {
                        const asignaturaModif = {
                            "_id": asignatura._id,
                            "nombre_asignatura": asignatura.nombre_asignatura,
                            "nombre_profesor": asignatura.nombre_profesor,
                            "semestre": asignatura.semestre,
                            "horario": asignatura.horario,
                            "salon": asignatura.salon,
                            "nota": req.body.nota
                        };
                        promedio += req.body.nota;
                        return asignaturaModif;
                    };
                });

                promedio = (promedio / historial.asignaturas.length);

                const asignatur = {
                    "corte": historial.corte,
                    "asignaturas": historialModif,
                    "promedio": promedio
                };
                return asignatur;
            };
        });

        estudiante.historial = asignaturaHistorial;
        await estudiante.save();
        res.status(200).json({ "mensaje": "historial actualizado" });
    } catch (error) {
        res.status(500).json({ "mensaje": error });
    }
};

const eliminarHistorial = async (req, res) => {
    try {
        const estudiante = await estudiantes.findOne({
            "codigo": req.params.id
        });
        if (!estudiante) {
            return res.status(500).json({ "mensaje": "el estudiante no esta registrado" });
        }
        const asignaturaHistorial = estudiante.historial.filter((historial) => {
            if (historial.corte != req.params.corte) {
                return historial;
            }
        })

        estudiante.historial = asignaturaHistorial;
        await estudiante.save()
        res.send("historial eliminada")
    } catch (error) {
        res.status(500).json({ "mensaje": error });
    }
};

export {
    obtenerEstudiantes,
    obtenerEstudiante,
    insertarEstudiante,
    actualizarEstudiante,
    eliminarEstudiante,
    obtenerMatricula,
    insertarMatriculaAsignatura,
    eliminarMatricula,
    obtenerHistorial,
    insertarHistorial,
    actualizarHistorial,
    actualizarNotaAsignatura,
    eliminarHistorial,
    eliminarMatriculaAsignatura
}
