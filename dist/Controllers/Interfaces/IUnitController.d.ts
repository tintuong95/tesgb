import { Unit } from '@entities/Unit';
import { CreateUnitDto, UpdateUnitDto } from 'Entities/Dto/Unit';
import { UserDto } from 'Shared/user.dto';
import { Request } from 'express';
export interface IUnitController {
    getAllUnits(request: Request, user: UserDto): Promise<Unit[]>;
    getUnitDetails(id: string, user: UserDto): Promise<Unit>;
    createUnit(createUnitDto: CreateUnitDto[], user: UserDto): Promise<Unit[]>;
    updateUnit(updateUnitDto: UpdateUnitDto, user: UserDto, id: string): Promise<Unit>;
    removeUnit(id: string, user: UserDto): Promise<string>;
    restoreUnit(id: string, user: UserDto): Promise<string>;
    deleteUnit(id: string, user: UserDto): Promise<string>;
}
