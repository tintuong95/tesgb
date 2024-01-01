import { Unit } from '@entities/Unit';
import { CreateUnitDto, UpdateUnitDto } from 'Entities/Dto/Unit';
import { UserDto } from 'Shared/user.dto';
import { Request } from 'express';
export interface IUnitService {
    findAllAsync(request: Request, user: UserDto): Promise<any>;
    findOneAsync(id: string, user: UserDto): Promise<Unit | any>;
    createAsync(createUnitDto: CreateUnitDto[], user: UserDto): Promise<Unit[]>;
    updateAsync(id: string, updateUnitDto: UpdateUnitDto, user: UserDto): Promise<Unit>;
    removeAsync(id: string, user: UserDto): Promise<string>;
    restoreAsync(id: string, user: UserDto): Promise<string>;
    deleteAsync(id: string, user: UserDto): Promise<string>;
}
