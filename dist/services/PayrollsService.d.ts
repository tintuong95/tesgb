import { Payroll } from '../entities/core';
import { Repository } from 'typeorm';
import { CreatePayrollDto, UpdatePayrollDto } from '../Entities/Dto/core';
import { Request } from 'express';
import { UserDto } from 'Shared/user.dto';
import { IPayrollsService } from './Interfaces/IPayrollsService';
export declare class PayrollsService implements IPayrollsService {
    private payrollRepository;
    constructor(payrollRepository: Repository<Payroll>);
    findAllAsync(request: Request, user: UserDto): Promise<any>;
    findOneAsync(id: string, user: UserDto): Promise<Payroll | any>;
    createAsync(createPayrollDto: CreatePayrollDto, user: UserDto): Promise<Payroll>;
    updateAsync(id: string, updatePayrollDto: UpdatePayrollDto, user: UserDto): Promise<Payroll>;
    removeAsync(id: string, user: UserDto): Promise<string>;
    restoreAsync(id: string, user: UserDto): Promise<string>;
    deleteAsync(id: string, user: UserDto): Promise<string>;
}
