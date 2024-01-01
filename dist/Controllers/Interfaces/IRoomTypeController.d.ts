import { RoomType } from '@entities/RoomType';
import { CreateRoomTypeDto, UpdateRoomTypeDto } from 'Entities/Dto/RoomType';
import { UserDto } from 'Shared/user.dto';
import { Request } from 'express';
export interface IRoomTypeController {
    getAllRoomTypes(request: Request, user: UserDto): Promise<RoomType[]>;
    getRoomTypeDetails(id: string, user: UserDto): Promise<RoomType>;
    createRoomType(createRoomTypeDto: CreateRoomTypeDto, user: UserDto): Promise<RoomType>;
    updateRoomType(updateRoomTypeDto: UpdateRoomTypeDto, user: UserDto, id: string): Promise<RoomType>;
    removeRoomType(id: string, user: UserDto): Promise<string>;
    restoreRoomType(id: string, user: UserDto): Promise<string>;
    deleteRoomType(id: string, user: UserDto): Promise<string>;
}
