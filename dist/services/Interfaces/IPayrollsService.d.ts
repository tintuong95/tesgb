import { Payroll } from '@entities/Payrolls';
import { CreatePayrollDto, UpdatePayrollDto } from 'Entities/Dto/Payrolls';
import { UserDto } from 'Shared/user.dto';
import { Request } from 'express';
export interface IPayrollsService {
    findAllAsync(request: Request, user: UserDto): Promise<any>;
    findOneAsync(id: string, user: UserDto): Promise<Payroll | any>;
    createAsync(createPayrollDto: CreatePayrollDto, user: UserDto): Promise<Payroll>;
    updateAsync(id: string, updatePayrollDto: UpdatePayrollDto, user: UserDto): Promise<Payroll>;
    removeAsync(id: string, user: UserDto): Promise<string>;
    restoreAsync(id: string, user: UserDto): Promise<string>;
    deleteAsync(id: string, user: UserDto): Promise<string>;
}
