import { Request, Response } from "express";
import Ajv, { JSONSchemaType } from "ajv";
import { CustomersService } from "@services/customers.service";
import { ICustomer } from "@models/customer";

const ajv = new Ajv({
  useDefaults: true,
  removeAdditional: true,
});

const customerSchema: JSONSchemaType<ICustomer> = {
  type: "object",
  additionalProperties: false,
  required: ["document", "address"],
  oneOf: [
    {
      required: ["firstName", "lastName"],
      properties: {
        companyName: { type: "null" },
      },
    },
    {
      required: ["companyName"],
      properties: {
        firstName: { type: "null" },
        lastName: { type: "null" },
      },
    },
  ],
  properties: {
    firstName: { type: "string", nullable: true, minLength: 1 },
    lastName: { type: "string", nullable: true, minLength: 1 },
    companyName: { type: "string", nullable: true, minLength: 1 },
    email: { type: "string", nullable: true },
    document: {
      type: "array",
      items: {
        type: "object",
        additionalProperties: false,
        required: ["type", "number"],
        properties: {
          type: { type: "string" },
          number: { type: "string" },
          primary: { type: "boolean", default: false },
        },
      },
    },
    address: {
      type: "object",
      additionalProperties: false,
      required: ["province", "city", "street", "number"],
      properties: {
        province: { type: "string", minLength: 1 },
        city: { type: "string", minLength: 1 },
        street: { type: "string", minLength: 1 },
        number: { type: "string", minLength: 1 },
        floor: { type: "string", minLength: 1 },
        door: { type: "string" },
        extra: { type: "string", minLength: 1 },
      },
    },
    phone: {
      type: "object",
      additionalProperties: false,
      nullable: true,
      properties: {
        home: {
          type: "object",
          additionalProperties: false,
          nullable: true,
          required: ["number"],
          properties: {
            number: { type: "string", minLength: 10 },
            int: { type: "string", nullable: true, minLength: 1 },
          },
        },
        mobile: {
          type: "object",
          additionalProperties: false,
          nullable: true,
          required: ["number"],
          properties: {
            number: { type: "string", minLength: 10 },
            int: { type: "string", nullable: true, minLength: 1 },
          },
        },
        work: {
          type: "object",
          additionalProperties: false,
          nullable: true,
          required: ["number"],
          properties: {
            number: { type: "string", minLength: 10 },
            int: { type: "string", nullable: true, minLength: 1 },
          },
        },
      },
    },
  },
};

const validateCustomerSchema = ajv.compile(customerSchema);

export class CustomersController extends CustomersService {
  async getCustomers(_req: Request, res: Response) {
    const data = await this.findAll();
    return res.json({ succeed: true, data });
  }

  async getCustomer(req: Request, res: Response) {
    const id = req.params.id;

    const data = await this.findOne(id);
    return res.json({ succeed: true, data });
  }

  async createCustomer(req: Request, res: Response) {
    const validSchema = validateCustomerSchema(req.body);
    if (!validSchema) {
      return res.status(400).json(validateCustomerSchema.errors);
    }

    const data = await this.create(req.body);
    return res.json({ succeed: true, data });
  }

  async updateCustomer(req: Request, res: Response) {
    const id = req.params.id;

    const validSchema = validateCustomerSchema(req.body);
    if (!validSchema) {
      return res.status(400).json(validateCustomerSchema.errors);
    }

    const data = await this.update(id, req.body);
    return res.json({ succeed: true, data });
  }

  async deleteCustomer(req: Request, res: Response) {
    const id = req.params.id;

    await this.delete(id);
    return res.json({ succeed: true });
  }
}
