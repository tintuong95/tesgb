import { Order } from '../entities/core';
import { Repository } from 'typeorm';
import { CreateOrderDto, UpdateOrderDto } from '../Entities/Dto/core';
import { Request } from 'express';
import { UserDto } from 'Shared/user.dto';
import { IOrderService } from './Interfaces/IOrderService';
export declare class OrderService implements IOrderService {
    private orderRepository;
    constructor(orderRepository: Repository<Order>);
    findAllAsync(request: Request, user: UserDto): Promise<any>;
    findOneAsync(id: string, user: UserDto): Promise<Order | any>;
    createAsync(createOrderDto: CreateOrderDto, user: UserDto): Promise<Order>;
    updateAsync(id: string, updateOrderDto: UpdateOrderDto, user: UserDto): Promise<Order>;
    removeAsync(id: string, user: UserDto): Promise<string>;
    restoreAsync(id: string, user: UserDto): Promise<string>;
    deleteAsync(id: string, user: UserDto): Promise<string>;
    findOrderByListRoomId(idList: string[], user: UserDto): Promise<Order[]>;
    countRoomStatusByTime(user: UserDto, request: Request): Promise<any>;
    countRoomStatusCurrent(user: UserDto, request: Request): Promise<any>;
    sumTotalMoneyOfOrder(id: string, user: UserDto): Promise<number>;
}
