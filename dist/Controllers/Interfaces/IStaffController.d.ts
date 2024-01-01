import { Staff } from '@entities/Staff';
import { CreateStaffDto, UpdateStaffDto } from 'Entities/Dto/Staff';
import { UserDto } from 'Shared/user.dto';
import { Request } from 'express';
export interface IStaffController {
    getAllStaffs(request: Request, user: UserDto): Promise<Staff[]>;
    getStaffDetails(id: string, user: UserDto): Promise<Staff>;
    createStaff(createStaffDto: CreateStaffDto, user: UserDto): Promise<Staff>;
    updateStaff(updateStaffDto: UpdateStaffDto, user: UserDto, id: string): Promise<Staff>;
    removeStaff(id: string, user: UserDto): Promise<string>;
    restoreStaff(id: string, user: UserDto): Promise<string>;
    deleteStaff(id: string, user: UserDto): Promise<string>;
}
