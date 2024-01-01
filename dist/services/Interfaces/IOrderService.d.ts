import { Order } from '@entities/Order';
import { CreateOrderDto, UpdateOrderDto } from 'Entities/Dto/Order';
import { UserDto } from 'Shared/user.dto';
import { Request } from 'express';
export interface IOrderService {
    findAllAsync(request: Request, user: UserDto): Promise<any>;
    findOneAsync(id: string, user: UserDto): Promise<Order>;
    createAsync(createOrderDto: CreateOrderDto, user: UserDto): Promise<Order>;
    updateAsync(id: string, updateOrderDto: UpdateOrderDto, user: UserDto): Promise<Order>;
    removeAsync(id: string, user: UserDto): Promise<string>;
    restoreAsync(id: string, user: UserDto): Promise<string>;
    deleteAsync(id: string, user: UserDto): Promise<string>;
    findOrderByListRoomId(idList: string[], user: UserDto): Promise<Order[]>;
}
