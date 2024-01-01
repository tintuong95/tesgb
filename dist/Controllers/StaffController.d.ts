import { StaffService } from '../services/core';
import { CreateStaffDto, UpdateStaffDto } from '../Entities/Dto/core';
import { Staff } from '../entities/Staff';
import { IStaffController } from './Interfaces/IStaffController';
import { UserDto } from 'Shared/user.dto';
import { Request } from 'express';
export declare class StaffController implements IStaffController {
    private staffService;
    constructor(staffService: StaffService);
    getAllStaffs(request: Request, user: UserDto): Promise<Staff[]>;
    getStaffDetails(id: string, user: UserDto): Promise<Staff>;
    createStaff(createStaffDto: CreateStaffDto, user: UserDto): Promise<Staff>;
    updateStaff(updateStaffDto: UpdateStaffDto, user: UserDto, id: string): Promise<Staff>;
    removeStaff(id: string, user: UserDto): Promise<string>;
    restoreStaff(id: string, user: UserDto): Promise<string>;
    deleteStaff(id: string, user: UserDto): Promise<string>;
}
