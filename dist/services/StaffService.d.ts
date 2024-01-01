import { Staff } from '../entities/core';
import { Repository } from 'typeorm';
import { CreateStaffDto, UpdateStaffDto } from '../Entities/Dto/core';
import { UserDto } from 'Shared/user.dto';
import { IStaffService } from './Interfaces/IStaffService';
import { Request } from 'express';
export declare class StaffService implements IStaffService {
    private staffRepository;
    constructor(staffRepository: Repository<Staff>);
    findAllAsync(request: Request, user: UserDto): Promise<any>;
    findOneAsync(id: string, user: UserDto): Promise<Staff | any>;
    createAsync(createStaffDto: CreateStaffDto, user: UserDto): Promise<Staff>;
    updateAsync(id: string, updateStaffDto: UpdateStaffDto, user: UserDto): Promise<Staff>;
    removeAsync(id: string, user: UserDto): Promise<string>;
    restoreAsync(id: string, user: UserDto): Promise<string>;
    deleteAsync(id: string, user: UserDto): Promise<string>;
}
