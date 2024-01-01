import { Repository } from 'typeorm';
import { RoomType } from '@entities/RoomType';
import { CreateRoomTypeDto, UpdateRoomTypeDto } from 'Entities/Dto/RoomType';
import { UserDto } from 'Shared/user.dto';
import { IRoomTypeService } from './Interfaces/IRoomTypeService';
import { Request } from 'express';
export declare class RoomTypeService implements IRoomTypeService {
    private roomTypesRepository;
    constructor(roomTypesRepository: Repository<RoomType>);
    findAllAsync(request: Request, user: UserDto): Promise<any>;
    findOneAsync(id: string, user: UserDto): Promise<RoomType | any>;
    createAsync(createRoomDto: CreateRoomTypeDto, user: UserDto): Promise<RoomType>;
    updateAsync(id: string, updateRoomTypeDto: UpdateRoomTypeDto, user: UserDto): Promise<RoomType>;
    removeAsync(id: string, user: UserDto): Promise<string>;
    restoreAsync(id: string, user: UserDto): Promise<string>;
    deleteAsync(id: string, user: UserDto): Promise<string>;
}
