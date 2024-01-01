import { Customer } from '../entities/core';
import { Repository } from 'typeorm';
import { CreateCustomerDto, UpdateCustomerDto } from '../Entities/Dto/core';
import { Request } from 'express';
import { UserDto } from 'Shared/user.dto';
import { ICustomerService } from './Interfaces/ICustomerService';
export declare class CustomerService implements ICustomerService {
    private customerRepository;
    constructor(customerRepository: Repository<Customer>);
    findAllAsync(user: UserDto, request: Request): Promise<any>;
    findByIdCards(user: UserDto, idCards: Array<string>): Promise<Customer[]>;
    findOneAsync(id: string, user: UserDto): Promise<Customer>;
    createAsync(createCustomerDto: CreateCustomerDto[]): Promise<Customer[]>;
    updateAsync(id: string, updateCustomerDto: UpdateCustomerDto, user: UserDto): Promise<Customer>;
    removeAsync(id: string, user: UserDto): Promise<string>;
    restoreAsync(id: string, user: UserDto): Promise<string>;
    deleteAsync(id: string, user: UserDto): Promise<string>;
}
