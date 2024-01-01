import { CustomerOrderService, CustomerService, OrderService, OtherOrderService, RevenueService, RoomOrderService, RoomService, ServiceOrderService } from '../services/core';
import { UpdateOrderDto } from '../Entities/Dto/core';
import { Order } from '../Entities/Order';
import { Request } from 'express';
import { IOrderController } from './Interfaces/IOrderController';
import { UserDto } from 'Shared/user.dto';
import { OrderStatus } from '@entities/Types/Order';
import { RoomOrder } from '@entities/RoomOrder';
export declare class OrderController implements IOrderController {
    private orderService;
    private customerService;
    private roomOrderService;
    private customerOrderService;
    private seriveOrderService;
    private roomService;
    private revenueService;
    private otherOrderService;
    constructor(orderService: OrderService, customerService: CustomerService, roomOrderService: RoomOrderService, customerOrderService: CustomerOrderService, seriveOrderService: ServiceOrderService, roomService: RoomService, revenueService: RevenueService, otherOrderService: OtherOrderService);
    getAllOrders(request: Request, user: UserDto): Promise<Order[]>;
    getOrderDetails(id: string, user: UserDto): Promise<Order>;
    createOrder(createOrderDto: any, user: UserDto): Promise<Order | any>;
    createUpdateOrder(createUpdateOrderDto: any, user: UserDto): Promise<import("../entities/ServiceOrder").ServiceOrder[] | Order | import("../entities/CustomerOrder").CustomerOrder[] | RoomOrder[] | import("../entities/OtherOrder").OtherOrder[]>;
    updateOrder(updateOrderDto: UpdateOrderDto, user: UserDto, id: string): Promise<Order>;
    changeStatusOrder(status: {
        status: OrderStatus;
    }, user: UserDto, id: string): Promise<Order>;
    removeOrder(id: string, user: UserDto): Promise<string>;
    restoreOrder(id: string, user: UserDto): Promise<string>;
    deleteOrder(id: string, user: UserDto): Promise<string>;
    countRoomsStatus(user: UserDto, request: Request): Promise<string>;
    countRoomsStatusCurrent(user: UserDto, request: Request): Promise<string>;
}
