import { Employee } from '../entities/core';
import { Repository } from 'typeorm';
import { CreateEmployeeDto, UpdateEmployeeDto } from 'Entities/Dto/core';
import { Request } from 'express';
import { IEmployeesService } from './Interfaces/IEmployeesService';
import { UserDto } from 'Shared/user.dto';
export declare class EmployeesService implements IEmployeesService {
    private employeeRepository;
    constructor(employeeRepository: Repository<Employee>);
    findAllAsync(request: Request, user: UserDto): Promise<any>;
    findOneAsync(id: string, user: UserDto): Promise<Employee | any>;
    createAsync(createEmployeeDto: CreateEmployeeDto, user: UserDto): Promise<Employee>;
    updateAsync(id: string, updateEmployeeDto: UpdateEmployeeDto, user: UserDto): Promise<Employee>;
    removeAsync(id: string, user: UserDto): Promise<string>;
    restoreAsync(id: string, user: UserDto): Promise<string>;
    deleteAsync(id: string, user: UserDto): Promise<string>;
    countEmployeeStatusCurrent(user: UserDto, request: Request): Promise<any>;
}
