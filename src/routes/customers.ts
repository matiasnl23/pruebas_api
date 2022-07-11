import { CustomersController } from "@controllers/customers.controller";
import { Router } from "express";

const controller = new CustomersController();

const customersRoutes = Router();

customersRoutes
  .get("/", (req, res) => controller.getCustomers(req, res))
  .get("/:id", (req, res) => controller.getCustomer(req, res))
  .post("/", (req, res) => controller.createCustomer(req, res))
  .put("/:id", (req, res) => controller.updateCustomer(req, res))
  .delete("/:id", (req, res) => controller.deleteCustomer(req, res));

export default customersRoutes;
