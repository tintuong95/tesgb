import { Floor } from '@entities/Floor';
import { CreateFloorDto, UpdateFloorDto } from 'Entities/Dto/Floor';
import { UserDto } from 'Shared/user.dto';
import { Request } from 'express';
export interface IFloorController {
    getAllFloors(request: Request, user: UserDto): Promise<Floor[]>;
    getFloorDetails(id: string, user: UserDto): Promise<Floor>;
    createFloor(createFloorDto: CreateFloorDto, user: UserDto): Promise<Floor>;
    updateFloor(updateFloorDto: UpdateFloorDto, user: UserDto, id: string): Promise<Floor>;
    removeFloor(id: string, user: UserDto): Promise<string>;
    restoreFloor(id: string, user: UserDto): Promise<string>;
    deleteFloor(id: string, user: UserDto): Promise<string>;
}
