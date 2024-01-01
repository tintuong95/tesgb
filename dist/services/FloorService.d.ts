import { Floor } from '../entities/core';
import { Repository } from 'typeorm';
import { CreateFloorDto, UpdateFloorDto } from '../Entities/Dto/core';
import { UserDto } from 'Shared/user.dto';
import { IFloorService } from './Interfaces/IFloorService';
import { Request } from 'express';
export declare class FloorService implements IFloorService {
    private floorRepository;
    constructor(floorRepository: Repository<Floor>);
    findAllAsync(request: Request, user: UserDto): Promise<any>;
    findOneAsync(id: string, user: UserDto): Promise<Floor>;
    createAsync(createFloorDto: CreateFloorDto, user: UserDto): Promise<Floor>;
    updateAsync(id: string, updateFloorDto: UpdateFloorDto, user: UserDto): Promise<Floor>;
    removeAsync(id: string, user: UserDto): Promise<string>;
    restoreAsync(id: string, user: UserDto): Promise<string>;
    deleteAsync(id: string, user: UserDto): Promise<string>;
}
