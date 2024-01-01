import { Customer } from '@entities/Customer';
import { CreateCustomerDto, UpdateCustomerDto } from 'Entities/Dto/Customer';
import { UserDto } from 'Shared/user.dto';
import { Request } from 'express';
export interface ICustomerService {
    findAllAsync(user: UserDto, request: Request): Promise<any>;
    findOneAsync(id: string, user: UserDto): Promise<Customer>;
    createAsync(createCustomerDto: CreateCustomerDto[], user: UserDto): Promise<Customer[]>;
    updateAsync(id: string, updateCustomerDto: UpdateCustomerDto, user: UserDto): Promise<Customer>;
    removeAsync(id: string, user: UserDto): Promise<string>;
    restoreAsync(id: string, user: UserDto): Promise<string>;
    deleteAsync(id: string, user: UserDto): Promise<string>;
    findByIdCards(user: UserDto, idCards: Array<string>): Promise<Customer[]>;
}
