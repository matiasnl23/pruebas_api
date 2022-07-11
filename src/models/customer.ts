import { model, Schema } from "mongoose";

export interface IAddress {
  province: string;
  city: string;
  street: string;
  number: string;
  floor: string;
  door: string;
  extra: string;
}

export interface IPhone {
  number: string;
  int?: string;
}

export interface IDocument {
  type: string;
  number: string;
  primary: boolean;
}

export interface ICustomer {
  firstName?: string;
  lastName?: string;
  companyName?: string;
  document: IDocument[];
  email?: string;
  address: IAddress;
  phone?: {
    home?: IPhone;
    mobile?: IPhone;
    work?: IPhone;
  };
}

const schema = new Schema<ICustomer>({
  firstName: String,
  lastName: String,
  companyName: String,
  document: [
    {
      type: {
        type: String,
        enum: ["DNI", "CUIT", "PASSPORT"],
        required: true,
      },
      number: {
        type: String,
        required: true,
      },
      primary: {
        type: Boolean,
        default: false,
      },
    },
  ],
  email: String,
  address: {
    province: { type: String, required: true },
    city: { type: String, required: true },
    street: { type: String, required: true },
    number: { type: String, required: true },
    floor: String,
    door: String,
    extra: String,
  },
  phone: {
    home: {
      number: String,
      int: String,
    },
    mobile: {
      number: String,
      int: String,
    },
    work: {
      number: String,
      int: String,
    },
  },
});

export const Customer = model("customer", schema);
