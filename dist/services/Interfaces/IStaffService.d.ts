import { Staff } from '@entities/Staff';
import { CreateStaffDto, UpdateStaffDto } from 'Entities/Dto/Staff';
import { UserDto } from 'Shared/user.dto';
import { Request } from 'express';
export interface IStaffService {
    findAllAsync(request: Request, user: UserDto): Promise<any>;
    findOneAsync(id: string, user: UserDto): Promise<Staff | any>;
    createAsync(createStaffDto: CreateStaffDto, user: UserDto): Promise<Staff>;
    updateAsync(id: string, updateStaffDto: UpdateStaffDto, user: UserDto): Promise<Staff>;
    removeAsync(id: string, user: UserDto): Promise<string>;
    restoreAsync(id: string, user: UserDto): Promise<string>;
    deleteAsync(id: string, user: UserDto): Promise<string>;
}
