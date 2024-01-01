import { Employee } from '@entities/Employees';
import { CreateEmployeeDto, UpdateEmployeeDto } from 'Entities/Dto/Employees';
import { UserDto } from 'Shared/user.dto';
import { Request } from 'express';
export interface IEmployeesController {
    getAllEmployees(request: Request, user: UserDto): Promise<Employee[]>;
    getEmployeeDetails(id: string, user: UserDto): Promise<Employee>;
    createEmployee(createEmployeeDto: CreateEmployeeDto, user: UserDto): Promise<Employee>;
    updateEmployee(updateEmployeeDto: UpdateEmployeeDto, user: UserDto, id: string): Promise<Employee>;
    removeEmployee(id: string, user: UserDto): Promise<string>;
    restoreEmployee(id: string, user: UserDto): Promise<string>;
    deleteEmployee(id: string, user: UserDto): Promise<string>;
}
