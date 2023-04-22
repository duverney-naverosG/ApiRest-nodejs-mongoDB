import Express from "express";
import morgan from "morgan";
import { config } from "dotenv";

import './database/conexion.js'

import asignaturasRouter from "./routes/asignaturas.routes.js";
import estudiantesRouter from "./routes/estudiantes.routes.js";

const app = Express();
config();

app.use(morgan('dev'));
app.use(Express.json()); //uso de json 
app.use(Express.urlencoded({ extended: false })); //uso de datos de FORM 

app.use('/api', asignaturasRouter);
app.use('/api', estudiantesRouter);

export default app;