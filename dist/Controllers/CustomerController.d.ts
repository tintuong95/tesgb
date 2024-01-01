import { CustomerService } from '../services/core';
import { CreateCustomerDto, UpdateCustomerDto } from '../Entities/Dto/core';
import { Customer } from '../entities/Customer';
import { Request } from 'express';
import { UserDto } from 'Shared/user.dto';
import { ICustomerController } from './Interfaces/core';
export declare class CustomerController implements ICustomerController {
    private customerService;
    constructor(customerService: CustomerService);
    getAllCustomers(request: Request, user: UserDto): Promise<Customer[]>;
    getCustomerDetails(id: string, user: UserDto): Promise<Customer>;
    createCustomer(createCustomerDto: CreateCustomerDto[]): Promise<Customer[]>;
    updateCustomer(updateCustomerDto: UpdateCustomerDto, user: UserDto, id: string): Promise<Customer>;
    removeCustomer(id: string, user: UserDto): Promise<string>;
    restoreCustomer(id: string, user: UserDto): Promise<string>;
    deleteCustomer(id: string, user: UserDto): Promise<string>;
}
