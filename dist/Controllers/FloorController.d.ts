import { CreateFloorDto, UpdateFloorDto } from '../Entities/Dto/core';
import { Floor } from '../entities/Floor';
import { FloorService } from '../services/core';
import { UserDto } from 'Shared/user.dto';
import { Request } from 'express';
import { IFloorController } from './Interfaces/IFloorController';
export declare class FloorController implements IFloorController {
    private floorService;
    constructor(floorService: FloorService);
    getAllFloors(request: Request, user: UserDto): Promise<Floor[]>;
    getFloorDetails(id: string, user: UserDto): Promise<Floor>;
    createFloor(createFloorDto: CreateFloorDto, user: UserDto): Promise<Floor>;
    updateFloor(updateFloorDto: UpdateFloorDto, user: UserDto, id: string): Promise<Floor>;
    removeFloor(id: string, user: UserDto): Promise<string>;
    restoreFloor(id: string, user: UserDto): Promise<string>;
    deleteFloor(id: string, user: UserDto): Promise<string>;
}
