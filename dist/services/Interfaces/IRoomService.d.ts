import { Room } from '@entities/Room';
import { CreateRoomDto, UpdateRoomDto } from 'Entities/Dto/Room';
import { UserDto } from 'Shared/user.dto';
import { Request } from 'express';
import * as TYPE from '../../Entities/Types/core';
export interface IRoomService {
    findAllAsync(request: Request, user: UserDto): Promise<any>;
    findOneAsync(id: string, user: UserDto): Promise<Room | any>;
    createAsync(createRoomDto: CreateRoomDto[], user: UserDto): Promise<Room[]>;
    updateAsync(id: string, updateRoomDto: UpdateRoomDto, user: UserDto): Promise<Room>;
    updateStatusAsync(idList: string[], status: TYPE.RoomStatus): Promise<Room>;
    removeAsync(id: string, user: UserDto): Promise<string>;
    restoreAsync(id: string, user: UserDto): Promise<string>;
    deleteAsync(id: string, user: UserDto): Promise<string>;
}
