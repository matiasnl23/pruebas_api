import { Customer, ICustomer } from "@models/customer";

export class CustomersService {
  protected async create(customer: ICustomer) {
    return Customer.create(customer);
  }

  protected async findOne(id: string) {
    return Customer.findById(id);
  }

  protected async findAll() {
    return Customer.find({});
  }

  protected async update(id: string, customer: ICustomer) {
    return Customer.findByIdAndUpdate(id, customer, { new: true });
  }

  protected async delete(id: string) {
    return Customer.findByIdAndRemove(id);
  }
}
