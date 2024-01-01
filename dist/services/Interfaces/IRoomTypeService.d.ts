import { RoomType } from '@entities/RoomType';
import { CreateRoomTypeDto, UpdateRoomTypeDto } from 'Entities/Dto/RoomType';
import { UserDto } from 'Shared/user.dto';
import { Request } from 'express';
export interface IRoomTypeService {
    findAllAsync(request: Request, user: UserDto): Promise<any>;
    findOneAsync(id: string, user: UserDto): Promise<RoomType | any>;
    createAsync(createRoomTypeDto: CreateRoomTypeDto, user: UserDto): Promise<RoomType>;
    updateAsync(id: string, updateRoomTypeDto: UpdateRoomTypeDto, user: UserDto): Promise<RoomType>;
    removeAsync(id: string, user: UserDto): Promise<string>;
    restoreAsync(id: string, user: UserDto): Promise<string>;
    deleteAsync(id: string, user: UserDto): Promise<string>;
}
