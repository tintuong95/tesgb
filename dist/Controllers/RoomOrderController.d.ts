import { CreatedRoomOrderDto, UpdatedRoomOrderDto } from '../Entities/Dto/core';
import { RoomOrder } from '../entities/RoomOrder';
import { RoomOrderService } from '@services/RoomOrderService';
import { IRoomOrderController } from './Interfaces/IRoomOrderController';
import { UserDto } from 'Shared/user.dto';
import { Request } from 'express';
export declare class RoomOrderController implements IRoomOrderController {
    private roomOrderService;
    constructor(roomOrderService: RoomOrderService);
    getAllRoomOrders(request: Request, user: UserDto): Promise<RoomOrder[]>;
    getRoomOrderDetails(id: string, user: UserDto): Promise<RoomOrder>;
    createRoomOrder(createRoomOrderDto: CreatedRoomOrderDto[]): Promise<RoomOrder[]>;
    updateRoomOrder(updateRoomOrderDto: UpdatedRoomOrderDto, user: UserDto, id: string): Promise<RoomOrder>;
    removeRoomOrder(id: string, user: UserDto): Promise<string>;
    restoreRoomOrder(id: string, user: UserDto): Promise<string>;
    deleteRoomOrder(id: string, user: UserDto): Promise<string>;
}
