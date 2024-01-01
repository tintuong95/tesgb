export declare class CreatedOtherOrderDto {
    orderId: string;
    accountId: string;
    title: string;
    description: string;
    price: number;
}
declare const UpdatedOtherOrderDto_base: import("@nestjs/common").Type<Partial<CreatedOtherOrderDto>>;
export declare class UpdatedOtherOrderDto extends UpdatedOtherOrderDto_base {
}
export {};
