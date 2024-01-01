import * as TYPE from '@entities/Types/core';
export declare class CreatePaymentDto {
    accountId: string;
    amount: number;
    description: string;
    option: TYPE.PAYMENT_OPTION;
    type: TYPE.ACCOUNT_TYPE;
    expiredAt: Date;
}
declare const UpdatePaymentDto_base: import("@nestjs/common").Type<Partial<CreatePaymentDto>>;
export declare class UpdatePaymentDto extends UpdatePaymentDto_base {
}
export declare class CreatePaymentOptionDto {
    option: TYPE.PAYMENT_OPTION;
    type: TYPE.ACCOUNT_TYPE;
}
export {};
