import * as TYPE from '../Types/core';
export declare class CreateRevenueDto {
    referenceId: string;
    referenceType: TYPE.REVENUE_TYPE;
    accountId: string;
    memberId: string;
    type: TYPE.REVENUE_STATE;
    note: string;
    amount: number;
}
declare const UpdateRevenueDto_base: import("@nestjs/common").Type<Partial<CreateRevenueDto>>;
export declare class UpdateRevenueDto extends UpdateRevenueDto_base {
}
export {};
