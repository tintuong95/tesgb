import { Floor } from '@entities/Floor';
import { CreateFloorDto, UpdateFloorDto } from 'Entities/Dto/Floor';
import { UserDto } from 'Shared/user.dto';
import { Request } from 'express';
export interface IFloorService {
    findAllAsync(request: Request, user: UserDto): Promise<any>;
    findOneAsync(id: string, user: UserDto): Promise<Floor>;
    createAsync(createFloorDto: CreateFloorDto, user: UserDto): Promise<Floor>;
    updateAsync(id: string, updateFloorDto: UpdateFloorDto, user: UserDto): Promise<Floor>;
    removeAsync(id: string, user: UserDto): Promise<string>;
    restoreAsync(id: string, user: UserDto): Promise<string>;
    deleteAsync(id: string, user: UserDto): Promise<string>;
}
