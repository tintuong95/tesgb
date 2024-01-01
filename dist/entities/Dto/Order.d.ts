import * as TYPE from '@entities/Types/core';
export declare class CreateOrderDto {
    code: string;
    accountId: string;
    status: TYPE.OrderStatus;
    checkInDate: Date;
    checkOutDate: Date;
    numDays: number;
    numNights: number;
    numHours: number;
    numMoreHours: number;
}
declare const UpdateOrderDto_base: import("@nestjs/common").Type<Partial<CreateOrderDto>>;
export declare class UpdateOrderDto extends UpdateOrderDto_base {
}
export {};
