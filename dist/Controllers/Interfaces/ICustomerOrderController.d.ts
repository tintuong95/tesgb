import { CustomerOrder } from '@entities/CustomerOrder';
import { CreatedCustomerOrderDto, UpdatedCustomerOrderDto } from 'Entities/Dto/CustomerOrder';
import { UserDto } from 'Shared/user.dto';
import { Request } from 'express';
export interface ICustomerOrderController {
    getAllCustomerOrders(request: Request, user: UserDto): Promise<CustomerOrder[]>;
    getCustomerOrderDetails(id: string, user: UserDto): Promise<CustomerOrder>;
    createCustomerOrder(createCustomerOrderDto: CreatedCustomerOrderDto[], user: UserDto): Promise<CustomerOrder[]>;
    updateCustomerOrder(updateCustomerOrderDto: UpdatedCustomerOrderDto, user: UserDto, id: string): Promise<CustomerOrder>;
    removeCustomerOrder(id: string, user: UserDto): Promise<string>;
    restoreCustomerOrder(id: string, user: UserDto): Promise<string>;
    deleteCustomerOrder(id: string, user: UserDto): Promise<string>;
}
