import * as TYPE from '@entities/Types/core';
export declare class CreatePayrollDto {
    accountId: string;
    employeeId: string;
    type: TYPE.PAYROLL_TYPE;
    amount: number;
    note: string;
}
declare const UpdatePayrollDto_base: import("@nestjs/common").Type<Partial<CreatePayrollDto>>;
export declare class UpdatePayrollDto extends UpdatePayrollDto_base {
}
export {};
