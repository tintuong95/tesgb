import { RoomOrder } from '@entities/RoomOrder';
import { CreatedRoomOrderDto, UpdatedRoomOrderDto } from 'Entities/Dto/RoomOrder';
import { UserDto } from 'Shared/user.dto';
import { Request } from 'express';
export interface IRoomOrderService {
    findAllAsync(request: Request, user: UserDto): Promise<any>;
    findOneAsync(id: string, user: UserDto): Promise<RoomOrder | any>;
    createAsync(createRoomOrderDto: CreatedRoomOrderDto[], user: UserDto): Promise<RoomOrder[]>;
    updateAsync(id: string, updateRoomOrderDto: UpdatedRoomOrderDto, user: UserDto): Promise<RoomOrder>;
    removeAsync(id: string, user: UserDto): Promise<string>;
    restoreAsync(id: string, user: UserDto): Promise<string>;
    deleteAsync(id: string, user: UserDto): Promise<string>;
}
