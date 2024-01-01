export declare class CreatedServiceOrderDto {
    orderId: string;
    serviceId: string;
    quanlity: number;
    accountId: string;
}
declare const UpdatedServiceOrderDto_base: import("@nestjs/common").Type<Partial<CreatedServiceOrderDto>>;
export declare class UpdatedServiceOrderDto extends UpdatedServiceOrderDto_base {
}
export {};
