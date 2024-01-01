import { PayrollsService, RevenueService } from '../services/core';
import { CreatePayrollDto, UpdatePayrollDto } from '../Entities/Dto/core';
import { Payroll } from '../entities/core';
import { Request } from 'express';
import { IPayrollsController } from './Interfaces/IPayrollsController';
import { UserDto } from 'Shared/user.dto';
export declare class PayrollController implements IPayrollsController {
    private payrollService;
    private revenueService;
    constructor(payrollService: PayrollsService, revenueService: RevenueService);
    getAllPayrolls(request: Request, user: UserDto): Promise<Payroll[]>;
    getPayrollDetails(id: string, user: UserDto): Promise<Payroll>;
    createPayroll(createPayrollDto: CreatePayrollDto, user: UserDto): Promise<Payroll>;
    updatePayroll(updatePayrollDto: UpdatePayrollDto, user: UserDto, id: string): Promise<Payroll>;
    removePayroll(id: string, user: UserDto): Promise<string>;
    restorePayroll(id: string, user: UserDto): Promise<string>;
    deletePayroll(id: string, user: UserDto): Promise<string>;
}
