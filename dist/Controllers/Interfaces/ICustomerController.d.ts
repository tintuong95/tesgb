import { Customer } from '@entities/Customer';
import { CreateCustomerDto, UpdateCustomerDto } from 'Entities/Dto/Customer';
import { UserDto } from 'Shared/user.dto';
import { Request } from 'express';
export interface ICustomerController {
    getAllCustomers(request: Request, user: UserDto): Promise<Customer[]>;
    getCustomerDetails(id: string, user: UserDto): Promise<Customer>;
    createCustomer(createCustomerDto: CreateCustomerDto[], user: UserDto): Promise<Customer[]>;
    updateCustomer(updateCustomerDto: UpdateCustomerDto, user: UserDto, id: string): Promise<Customer>;
    removeCustomer(id: string, user: UserDto): Promise<string>;
    restoreCustomer(id: string, user: UserDto): Promise<string>;
    deleteCustomer(id: string, user: UserDto): Promise<string>;
}
