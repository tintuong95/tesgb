import { CustomerOrder } from '@entities/CustomerOrder';
import { CreatedCustomerOrderDto, UpdatedCustomerOrderDto } from 'Entities/Dto/CustomerOrder';
import { UserDto } from 'Shared/user.dto';
import { Request } from 'express';
export interface ICustomerOrderService {
    findAllAsync(request: Request, user: UserDto): Promise<CustomerOrder[]>;
    findOneAsync(id: string, user: UserDto): Promise<CustomerOrder>;
    createAsync(createdCustomerOrderDto: CreatedCustomerOrderDto, user: UserDto): Promise<CustomerOrder[]>;
    updateAsync(id: string, user: UserDto, updatedCustomerOrderDto: UpdatedCustomerOrderDto): Promise<CustomerOrder>;
    removeAsync(id: string, user: UserDto): Promise<string>;
    restoreAsync(id: string, user: UserDto): Promise<string>;
    deleteAsync(id: string, user: UserDto): Promise<string>;
}
