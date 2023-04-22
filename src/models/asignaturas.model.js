import { Schema, model } from "mongoose";

const asignaturaShema = new Schema(
    {
        nombre_asignatura: {
            type: String,
            require: true,
            trim: true,
        },
        nombre_profesor: {
            type: String,
            require: true,
            trim: true,
        },
        salon: {
            type: Number,
            require: true,
        },
        semestre: {
            type: String,
            require: true,
            trim: true,
        },
        horario: {
            type: String,
            require: true,
            trim: true,
        },
    },
    {
        timestamps: false,
        versionKey: false,
    }
);

export default model("asignaturas", asignaturaShema);
