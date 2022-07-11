import { Router } from "express";
import customersRoutes from "./customers";

const routes = Router();

routes.use("/customers", customersRoutes);

export default routes;
