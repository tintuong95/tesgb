import { Payroll } from '@entities/Payrolls';
import { CreatePayrollDto, UpdatePayrollDto } from 'Entities/Dto/Payrolls';
import { UserDto } from 'Shared/user.dto';
import { Request } from 'express';
export interface IPayrollsController {
    getAllPayrolls(request: Request, user: UserDto): Promise<Payroll[]>;
    getPayrollDetails(id: string, user: UserDto): Promise<Payroll>;
    createPayroll(createPayrollDto: CreatePayrollDto, user: UserDto): Promise<Payroll>;
    updatePayroll(updatePayrollDto: UpdatePayrollDto, user: UserDto, id: string): Promise<Payroll>;
    removePayroll(id: string, user: UserDto): Promise<string>;
    restorePayroll(id: string, user: UserDto): Promise<string>;
    deletePayroll(id: string, user: UserDto): Promise<string>;
}
