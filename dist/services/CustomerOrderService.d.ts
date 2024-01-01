import { CustomerOrder } from '../entities/core';
import { Repository } from 'typeorm';
import { CreatedCustomerOrderDto, UpdatedCustomerOrderDto } from 'Entities/Dto/core';
import { UserDto } from 'Shared/user.dto';
import { ICustomerOrderService } from './Interfaces/core';
import { Request } from 'express';
export declare class CustomerOrderService implements ICustomerOrderService {
    private customerOrderRepository;
    constructor(customerOrderRepository: Repository<CustomerOrder>);
    findAllAsync(request: Request, user: UserDto): Promise<CustomerOrder[]>;
    findOneAsync(id: string, user: UserDto): Promise<CustomerOrder>;
    createAsync(createCustomerOrderDto: CreatedCustomerOrderDto[] | any, user: UserDto): Promise<CustomerOrder[]>;
    updateAsync(id: string, user: UserDto, updateCustomerOrderDto: UpdatedCustomerOrderDto): Promise<CustomerOrder>;
    removeAsync(id: string, user: UserDto): Promise<string>;
    restoreAsync(id: string, user: UserDto): Promise<string>;
    deleteAsync(id: string, user: UserDto): Promise<string>;
}
