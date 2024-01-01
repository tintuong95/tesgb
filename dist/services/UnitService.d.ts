import { UserDto } from 'Shared/user.dto';
import { Request } from 'express';
import { Repository } from 'typeorm';
import { CreateUnitDto, UpdateUnitDto } from '../Entities/Dto/core';
import { Unit } from '../entities/core';
import { IUnitService } from './Interfaces/core';
export declare class UnitService implements IUnitService {
    private unitRepository;
    constructor(unitRepository: Repository<Unit>);
    findAllAsync(request: Request, user: UserDto): Promise<any>;
    findOneAsync(id: string, user: UserDto): Promise<Unit | any>;
    createAsync(createUnitDto: CreateUnitDto[], user: UserDto): Promise<Unit[]>;
    updateAsync(id: string, updateUnitDto: UpdateUnitDto, user: UserDto): Promise<Unit>;
    removeAsync(id: string, user: UserDto): Promise<string>;
    removeListAsync(ids: string[], user: UserDto): Promise<string>;
    restoreAsync(id: string, user: UserDto): Promise<string>;
    deleteAsync(id: string, user: UserDto): Promise<string>;
}
