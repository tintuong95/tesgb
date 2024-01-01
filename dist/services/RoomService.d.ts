import { HttpException } from '@nestjs/common';
import { Room } from '../entities/core';
import { Repository } from 'typeorm';
import { CreateRoomDto, UpdateRoomDto } from '../Entities/Dto/core';
import { UserDto } from 'Shared/user.dto';
import { IRoomService } from './Interfaces/IRoomService';
import { Request } from 'express';
import * as TYPE from '../Entities/Types/core';
export declare class RoomService implements IRoomService {
    private roomRepository;
    constructor(roomRepository: Repository<Room>);
    findAllAsync(request: Request, user: UserDto): Promise<{
        rooms: Room[];
        count: number;
    } | HttpException | any>;
    findPriceRoomAllAsync(idList: string[], user: UserDto): Promise<any>;
    findOneAsync(id: string, user: UserDto): Promise<Room | any>;
    createAsync(createRoomDto: CreateRoomDto[], user: UserDto): Promise<Room[]>;
    updateAsync(id: string, updateRoomDto: UpdateRoomDto, user: UserDto): Promise<Room>;
    updateStatusAsync(idList: string[], status: TYPE.RoomStatus): Promise<any>;
    removeAsync(id: string, user: UserDto): Promise<string>;
    restoreAsync(id: string, user: UserDto): Promise<string>;
    deleteAsync(id: string, user: UserDto): Promise<string>;
    countRoomStatusAsync(user: UserDto): Promise<any>;
}
