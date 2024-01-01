import { EmployeesService } from '../services/core';
import { CreateEmployeeDto, UpdateEmployeeDto } from '../Entities/Dto/core';
import { Employee } from '../entities/core';
import { Request } from 'express';
import { IEmployeesController } from './Interfaces/IEmployeesController';
import { UserDto } from 'Shared/user.dto';
export declare class EmployeeController implements IEmployeesController {
    private employeeService;
    constructor(employeeService: EmployeesService);
    getAllEmployees(request: Request, user: UserDto): Promise<Employee[]>;
    getEmployeeDetails(id: string, user: UserDto): Promise<Employee>;
    createEmployee(createEmployeeDto: CreateEmployeeDto, user: UserDto): Promise<Employee>;
    updateEmployee(updateEmployeeDto: UpdateEmployeeDto, user: UserDto, id: string): Promise<Employee>;
    removeEmployee(id: string, user: UserDto): Promise<string>;
    restoreEmployee(id: string, user: UserDto): Promise<string>;
    deleteEmployee(id: string, user: UserDto): Promise<string>;
    countEmployeeByStatus(user: UserDto, request: Request): Promise<string>;
}
