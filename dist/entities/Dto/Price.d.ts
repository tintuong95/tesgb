import * as TYPE from '@entities/Types/core';
export declare class CreatePriceDto {
    name: string;
    status: TYPE.PriceStatus;
    accountId: string;
}
declare const UpdatePriceDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreatePriceDto>>;
export declare class UpdatePriceDto extends UpdatePriceDto_base {
}
export declare class CreatePriceAllDto {
    name: string;
    priceHour: number;
    priceMore: number;
    priceNight: number;
    priceDay: number;
    checkInNight: string;
    checkOutNight: string;
    checkInDay: string;
    checkOutDay: string;
    status: TYPE.PriceStatus;
    accountId: string;
}
declare const UpdatePriceAllDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreatePriceAllDto>>;
export declare class UpdatePriceAllDto extends UpdatePriceAllDto_base {
}
export {};
