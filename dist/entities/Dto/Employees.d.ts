import * as TYPE from '@entities/Types/core';
export declare class CreateEmployeeDto {
    firstName: string;
    lastName: string;
    idCard: string;
    phone: string;
    email: string;
    gender: TYPE.GENDER_TYPE;
    address: string;
    salary: number;
    position: string;
    hireDate: string;
    accountId: string;
}
declare const UpdateEmployeeDto_base: import("@nestjs/common").Type<Partial<CreateEmployeeDto>>;
export declare class UpdateEmployeeDto extends UpdateEmployeeDto_base {
}
export {};
