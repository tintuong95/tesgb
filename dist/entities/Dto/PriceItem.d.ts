import * as TYPE from '@entities/Types/core';
export declare class CreatePriceItemDto {
    accountId: string;
    priceId: string;
    priceRoom: number;
    checkOutAt: string;
    checkInAt: string;
    type: TYPE.PriceItemType;
}
declare const UpdatePriceItemDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreatePriceItemDto>>;
export declare class UpdatePriceItemDto extends UpdatePriceItemDto_base {
}
export {};
