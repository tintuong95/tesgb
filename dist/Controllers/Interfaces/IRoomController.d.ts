import { Room } from '@entities/Room';
import { CreateRoomDto, UpdateRoomDto } from 'Entities/Dto/Room';
import { UserDto } from 'Shared/user.dto';
import { Request } from 'express';
export interface IRoomController {
    getAllRooms(request: Request, user: UserDto): Promise<Room[]>;
    getAllPriceRooms(idList: string[], user: UserDto): Promise<Room[]>;
    getRoomDetails(id: string, user: UserDto): Promise<Room>;
    createRoom(createRoomDto: CreateRoomDto[], user: UserDto): Promise<Room[]>;
    updateRoom(updateRoomDto: UpdateRoomDto, user: UserDto, id: string): Promise<Room>;
    removeRoom(id: string, user: UserDto): Promise<string>;
    restoreRoom(id: string, user: UserDto): Promise<string>;
    deleteRoom(id: string, user: UserDto): Promise<string>;
}
