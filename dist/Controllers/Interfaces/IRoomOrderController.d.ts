import { RoomOrder } from '@entities/RoomOrder';
import { CreatedRoomOrderDto, UpdatedRoomOrderDto } from 'Entities/Dto/RoomOrder';
import { UserDto } from 'Shared/user.dto';
import { Request } from 'express';
export interface IRoomOrderController {
    getAllRoomOrders(request: Request, user: UserDto): Promise<RoomOrder[]>;
    getRoomOrderDetails(id: string, user: UserDto): Promise<RoomOrder>;
    createRoomOrder(createRoomOrderDto: CreatedRoomOrderDto[], user: UserDto): Promise<RoomOrder[]>;
    updateRoomOrder(updateRoomOrderDto: UpdatedRoomOrderDto, user: UserDto, id: string): Promise<RoomOrder>;
    removeRoomOrder(id: string, user: UserDto): Promise<string>;
    restoreRoomOrder(id: string, user: UserDto): Promise<string>;
    deleteRoomOrder(id: string, user: UserDto): Promise<string>;
}
