import { UnitService } from '../services/core';
import { CreateUnitDto, UpdateUnitDto } from '../Entities/Dto/core';
import { Unit } from '../entities/Unit';
import { Request } from 'express';
import { IUnitController } from './Interfaces/IUnitController';
import { UserDto } from 'Shared/user.dto';
export declare class UnitController implements IUnitController {
    private unitService;
    constructor(unitService: UnitService);
    getAllUnits(request: Request, user: UserDto): Promise<Unit[]>;
    getUnitDetails(id: string, user: UserDto): Promise<Unit>;
    createUnit(createUnitDto: CreateUnitDto[], user: UserDto): Promise<Unit[]>;
    updateUnit(updateUnitDto: UpdateUnitDto, user: UserDto, id: string): Promise<Unit>;
    removeUnit(id: string, user: UserDto): Promise<string>;
    removeListUnit(id: string[], user: UserDto): Promise<string>;
    restoreUnit(id: string, user: UserDto): Promise<string>;
    deleteUnit(id: string, user: UserDto): Promise<string>;
}
