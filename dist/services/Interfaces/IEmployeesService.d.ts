import { Employee } from '@entities/Employees';
import { CreateEmployeeDto, UpdateEmployeeDto } from 'Entities/Dto/Employees';
import { UserDto } from 'Shared/user.dto';
import { Request } from 'express';
export interface IEmployeesService {
    findAllAsync(request: Request, user: UserDto): Promise<any>;
    findOneAsync(id: string, user: UserDto): Promise<Employee | any>;
    createAsync(createEmployeeDto: CreateEmployeeDto, user: UserDto): Promise<Employee>;
    updateAsync(id: string, updateEmployeeDto: UpdateEmployeeDto, user: UserDto): Promise<Employee>;
    removeAsync(id: string, user: UserDto): Promise<string>;
    restoreAsync(id: string, user: UserDto): Promise<string>;
    deleteAsync(id: string, user: UserDto): Promise<string>;
}
