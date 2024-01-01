import * as TYPE from '@entities/Types/core';
export declare class CreateCustomerDto {
    firstName: string;
    lastName: string;
    address: string;
    phone: string;
    email: string;
    birthday: string;
    idCard: string;
    note: string;
    accountId: string;
    gender: TYPE.GENDER;
}
declare const UpdateCustomerDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateCustomerDto>>;
export declare class UpdateCustomerDto extends UpdateCustomerDto_base {
}
export {};
