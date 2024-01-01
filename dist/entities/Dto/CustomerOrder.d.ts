export declare class CreatedCustomerOrderDto {
    orderId: string;
    customerId: string;
    accountId: string;
}
declare const UpdatedCustomerOrderDto_base: import("@nestjs/common").Type<Partial<CreatedCustomerOrderDto>>;
export declare class UpdatedCustomerOrderDto extends UpdatedCustomerOrderDto_base {
}
export {};
