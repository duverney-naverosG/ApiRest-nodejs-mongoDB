import { Schema, model } from "mongoose";

const estudiantesShema = new Schema(
    {
        identificacion: {
            type: Number,
            require: true,
        },
        nombre: {
            type: String,
            require: true,
            trim: true,
        },
        carrera: {
            type: String,
            require: true,
            trim: true,
        },
        codigo: {
            type: Number,
            require: true,
            unique: true,
        },
        telefono: {
            type: Number,
        },
        correo: {
            type: String,
            trim: true,
        },
        matricula: {
            type: Array,
        },
        historial: {
            type: Array,
        },
    },
    {
        timestamps: false,
        versionKey: false,
    }
);

export default model("estudiantes", estudiantesShema);
