import * as TYPE from '../Types/core';
export declare class CreateServiceDto {
    name: string;
    serviceTypeId: string;
    unitId: string;
    price: number;
    inventory: number;
    accountId: string;
    status: TYPE.ServiceStatus;
}
declare const UpdateServiceDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateServiceDto>>;
export declare class UpdateServiceDto extends UpdateServiceDto_base {
}
export {};
