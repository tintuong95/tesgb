import { RoomTypeService } from '../services/core';
import { CreateRoomTypeDto, UpdateRoomTypeDto } from '../Entities/Dto/core';
import { RoomType } from '../entities/RoomType';
import { IRoomTypeController } from './Interfaces/IRoomTypeController';
import { UserDto } from 'Shared/user.dto';
import { Request } from 'express';
export declare class RoomTypeController implements IRoomTypeController {
    private roomService;
    constructor(roomService: RoomTypeService);
    getAllRoomTypes(request: Request, user: UserDto): Promise<RoomType[]>;
    getRoomTypeDetails(id: string, user: UserDto): Promise<RoomType>;
    createRoomType(createRoomTypeDto: CreateRoomTypeDto, user: UserDto): Promise<RoomType>;
    updateRoomType(updateRoomTypeDto: UpdateRoomTypeDto, user: UserDto, id: string): Promise<RoomType>;
    removeRoomType(id: string, user: UserDto): Promise<string>;
    restoreRoomType(id: string, user: UserDto): Promise<string>;
    deleteRoomType(id: string, user: UserDto): Promise<string>;
}
