import { Order } from '@entities/Order';
import { UpdateOrderDto } from 'Entities/Dto/Order';
import { UserDto } from 'Shared/user.dto';
import { Request } from 'express';
export interface IOrderController {
    getAllOrders(request: Request, user: UserDto): Promise<Order[]>;
    getOrderDetails(id: string, user: UserDto): Promise<Order>;
    createOrder(createOrderDto: any, user: UserDto): Promise<Order>;
    updateOrder(updateOrderDto: UpdateOrderDto, user: UserDto, id: string): Promise<Order>;
    removeOrder(id: string, user: UserDto): Promise<string>;
    restoreOrder(id: string, user: UserDto): Promise<string>;
    deleteOrder(id: string, user: UserDto): Promise<string>;
}
