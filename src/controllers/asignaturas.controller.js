import asignaturas from "../models/asignaturas.model.js";

const obtenerAsignaturas = async (req, res) => {
    try {
        const asignatura = await asignaturas.find();
        res.status(200).json(asignatura);
    } catch (error) {
        res.status(500).json({ "mensaje": error });
    }
};

const obtenerAsignatura = async (req, res) => {
    try {
        const asignatura = await asignaturas.findById(req.params.id);
        if (!asignatura) {
            return res.status(500).json({ "mensaje": "asignatura no encontrada" });
        }
        res.status(200).json(asignatura);
    } catch (error) {
        res.status(500).json({ "mensaje": error });
    }
};

const insertarAsignatura = async (req, res) => {
    const { nombre_asignatura, nombre_profesor, salon, semestre, horario } = req.body;
    if (nombre_asignatura == null || nombre_profesor == null || horario == null || semestre == null) {
        return res.status(400).json({ "mensaje": "llenar todo los datos" });
    };

    try {
        const asignatura = await asignaturas({
            nombre_asignatura,
            nombre_profesor,
            semestre,
            horario,
            salon
        });
        await asignatura.save();
        res.status(200).json({ "mensaje": "asignatura insertada" });
    } catch (error) {
        res.status(500).json({ "mensaje": error });
    }
};

const actualizarAsignatura = async (req, res) => {
    const { nombre_asignatura, nombre_profesor, salon, semestre, horario } = req.body;
    if (nombre_asignatura == null || nombre_profesor == null || horario == null || semestre == null) {
        return res.status(400).json({ "mensaje": "llenar todo los datos" });
    };
    try {
        await asignaturas.findByIdAndUpdate(req.params.id, {
            nombre_asignatura,
            nombre_profesor,
            salon: salon || null,
            semestre,
            horario
        });
        res.status(200).json({ "mensaje": "asignatura actualizada" });
    } catch (error) {
        res.status(500).json({ "mensaje": error });
    }
};

const eliminarAsignatura = async (req, res) => {
    try {
        await asignaturas.findByIdAndDelete(req.params.id, req.body);
        res.status(200).json({ "mensaje": "asignatura eliminada" });
    } catch (error) {
        res.status(500).json({ "mensaje": error });
    }
};

export {
    obtenerAsignaturas,
    obtenerAsignatura,
    insertarAsignatura,
    actualizarAsignatura,
    eliminarAsignatura,
};
