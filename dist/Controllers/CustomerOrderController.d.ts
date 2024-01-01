import { CustomerOrderService } from '../services/core';
import { CreatedCustomerOrderDto, UpdatedCustomerOrderDto } from '../Entities/Dto/core';
import { CustomerOrder } from '../entities/CustomerOrder';
import { ICustomerOrderController } from './Interfaces/core';
import { UserDto } from 'Shared/user.dto';
import { Request } from 'express';
export declare class CustomerOrderController implements ICustomerOrderController {
    private customerOrderService;
    constructor(customerOrderService: CustomerOrderService);
    getAllCustomerOrders(request: Request, user: UserDto): Promise<CustomerOrder[]>;
    getCustomerOrderDetails(id: string, user: UserDto): Promise<CustomerOrder>;
    createCustomerOrder(createCustomerOrderDto: CreatedCustomerOrderDto[], user: UserDto): Promise<CustomerOrder[]>;
    updateCustomerOrder(updateCustomerOrderDto: UpdatedCustomerOrderDto, user: UserDto, id: string): Promise<CustomerOrder>;
    removeCustomerOrder(id: string, user: UserDto): Promise<string>;
    restoreCustomerOrder(id: string, user: UserDto): Promise<string>;
    deleteCustomerOrder(id: string, user: UserDto): Promise<string>;
}
